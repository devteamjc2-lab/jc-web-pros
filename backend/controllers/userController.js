const getDbPool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getConversationDetails = async (pool, conversationId) => {
  const [conversationRows] = await pool.execute(
    "SELECT id, name, type, created_by, created_at FROM jc_web_pros_conversations WHERE id = ?",
    [conversationId]
  );

  if (!conversationRows.length) {
    return null;
  }

  const conversation = conversationRows[0];
  const [memberRows] = await pool.execute(
    `SELECT u.id, u.name, u.email, u.role
     FROM jc_web_pros_conversation_members cm
     JOIN jc_web_pros_users u ON cm.user_id = u.id
     WHERE cm.conversation_id = ?`,
    [conversationId]
  );

  return {
    ...conversation,
    members: memberRows,
  };
};

const isConversationMember = async (pool, conversationId, userId) => {
  const [rows] = await pool.execute(
    "SELECT 1 FROM jc_web_pros_conversation_members WHERE conversation_id = ? AND user_id = ?",
    [conversationId, userId]
  );
  return rows.length > 0;
};

const isGroupAdmin = async (pool, conversationId, userId) => {
  const conversation = await getConversationDetails(pool, conversationId);
  if (!conversation || conversation.type !== "group") {
    return false;
  }

  if (conversation.created_by === Number(userId)) {
    return true;
  }

  const [userRows] = await pool.execute(
    "SELECT role FROM jc_web_pros_users WHERE id = ?",
    [userId]
  );

  return userRows[0]?.role?.toLowerCase() === "admin";
};

const login = async (req, res) => {
  try {
    console.log("Login API called");
    const { email, password } = req.body;
    const pool = await getDbPool();

    const [rows] = await pool.execute("SELECT * FROM jc_web_pros_users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const pool = await getDbPool();
    const [rows] = await pool.execute("SELECT id, name, email, role FROM jc_web_pros_users");
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createOrGetConversation = async (req, res) => {
  try {
    const { type, name, createdBy, participants = [] } = req.body;
    const pool = await getDbPool();

    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: "Creator is required",
      });
    }

    if (type === "group") {
      const [creatorRows] = await pool.execute("SELECT role FROM jc_web_pros_users WHERE id = ?", [createdBy]);
      const creatorRole = creatorRows[0]?.role?.toLowerCase();
      if (creatorRole !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Only admins can create a group",
        });
      }

      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Group name is required",
        });
      }
    }

    if (type === "private") {
      const targetUserId = participants[0];
      const [existingRows] = await pool.execute(
        `SELECT c.id
         FROM jc_web_pros_conversations c
         JOIN jc_web_pros_conversation_members m1 ON c.id = m1.conversation_id
         JOIN jc_web_pros_conversation_members m2 ON c.id = m2.conversation_id
         WHERE c.type = 'private' AND m1.user_id = ? AND m2.user_id = ?
         GROUP BY c.id LIMIT 1`,
        [createdBy, targetUserId]
      );

      if (existingRows.length > 0) {
        const existingConversation = await getConversationDetails(pool, existingRows[0].id);
        const title = existingConversation.members.find((member) => member.id !== createdBy)?.name || "Private Chat";
        return res.status(200).json({
          success: true,
          conversation: { ...existingConversation, title },
          message: "Conversation already exists",
        });
      }
    }

    const [result] = await pool.execute(
      "INSERT INTO jc_web_pros_conversations (name, type, created_by) VALUES (?, ?, ?)",
      [type === "group" ? name.trim() : null, type, createdBy]
    );

    const conversationId = result.insertId;
    const memberIds = [...new Set([createdBy, ...participants.filter(Boolean)])];

    for (const userId of memberIds) {
      await pool.execute(
        "INSERT INTO jc_web_pros_conversation_members (conversation_id, user_id) VALUES (?, ?)",
        [conversationId, userId]
      );
    }

    const conversation = await getConversationDetails(pool, conversationId);
    const title = type === "private"
      ? conversation.members.find((member) => member.id !== createdBy)?.name || "Private Chat"
      : conversation.name;

    return res.status(201).json({
      success: true,
      conversation: { ...conversation, title },
      message: "Conversation created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const pool = await getDbPool();

    const [rows] = await pool.execute(
      `SELECT DISTINCT c.id, c.name, c.type, c.created_by, c.created_at
       FROM jc_web_pros_conversations c
       JOIN jc_web_pros_conversation_members cm ON c.id = cm.conversation_id
       WHERE cm.user_id = ?
       ORDER BY c.created_at DESC`,
      [userId]
    );

    const conversations = [];
    for (const conversation of rows) {
      const details = await getConversationDetails(pool, conversation.id);
      const [messageRows] = await pool.execute(
        `SELECT m.message, m.created_at, u.name AS sender_name
         FROM jc_web_pros_messages m
         JOIN jc_web_pros_users u ON m.sender_id = u.id
         WHERE m.conversation_id = ?
         ORDER BY m.created_at DESC LIMIT 1`,
        [conversation.id]
      );

      const title = conversation.type === "private"
        ? details.members.find((member) => member.id !== Number(userId))?.name || "Private Chat"
        : conversation.name || "Group Chat";

      conversations.push({
        ...conversation,
        ...details,
        title,
        lastMessage: messageRows[0] || null,
      });
    }

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.query;
    const pool = await getDbPool();

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const isMember = await isConversationMember(pool, conversationId, userId);
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this conversation",
      });
    }

    const [rows] = await pool.execute(
      `SELECT m.id, m.conversation_id AS conversationId, m.sender_id AS senderId, m.message, m.created_at AS createdAt, u.name AS senderName
       FROM jc_web_pros_messages m
       JOIN jc_web_pros_users u ON m.sender_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [conversationId]
    );

    return res.status(200).json({
      success: true,
      messages: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.query;
    const pool = await getDbPool();

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const isMember = await isConversationMember(pool, conversationId, userId);
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this conversation",
      });
    }

    const conversation = await getConversationDetails(pool, conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addGroupMembers = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { adminId, members = [] } = req.body;
    const pool = await getDbPool();

    if (!adminId || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Admin ID and member list are required",
      });
    }

    const conversation = await getConversationDetails(pool, conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (conversation.type !== "group") {
      return res.status(400).json({
        success: false,
        message: "Only groups can add members",
      });
    }

    const canManage = await isGroupAdmin(pool, conversationId, adminId);
    if (!canManage) {
      return res.status(403).json({
        success: false,
        message: "Only group admin can manage members",
      });
    }

    const existingMemberIds = conversation.members.map((member) => member.id);
    const uniqueMemberIds = [...new Set(members.map((id) => Number(id)))].filter((id) => id && !existingMemberIds.includes(id));

    for (const userId of uniqueMemberIds) {
      await pool.execute(
        "INSERT INTO jc_web_pros_conversation_members (conversation_id, user_id) VALUES (?, ?)",
        [conversationId, userId]
      );
    }

    const updatedConversation = await getConversationDetails(pool, conversationId);
    return res.status(200).json({
      success: true,
      conversation: updatedConversation,
      message: "Members added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeGroupMember = async (req, res) => {
  try {
    const { conversationId, memberId } = req.params;
    const { adminId } = req.body;
    const pool = await getDbPool();

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    const conversation = await getConversationDetails(pool, conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (conversation.type !== "group") {
      return res.status(400).json({
        success: false,
        message: "Only groups can remove members",
      });
    }

    const canManage = await isGroupAdmin(pool, conversationId, adminId);
    if (!canManage) {
      return res.status(403).json({
        success: false,
        message: "Only group admin can manage members",
      });
    }

    if (Number(memberId) === conversation.created_by) {
      return res.status(400).json({
        success: false,
        message: "Cannot remove the group creator",
      });
    }

    await pool.execute(
      "DELETE FROM jc_web_pros_conversation_members WHERE conversation_id = ? AND user_id = ?",
      [conversationId, memberId]
    );

    const updatedConversation = await getConversationDetails(pool, conversationId);
    return res.status(200).json({
      success: true,
      conversation: updatedConversation,
      message: "Member removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateGroupName = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { adminId, name } = req.body;
    const pool = await getDbPool();

    if (!adminId || !name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Admin ID and group name are required",
      });
    }

    const conversation = await getConversationDetails(pool, conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (conversation.type !== "group") {
      return res.status(400).json({
        success: false,
        message: "Only group names can be updated with this endpoint",
      });
    }

    const canManage = await isGroupAdmin(pool, conversationId, adminId);
    if (!canManage) {
      return res.status(403).json({
        success: false,
        message: "Only group admin can rename the group",
      });
    }

    await pool.execute(
      "UPDATE jc_web_pros_conversations SET name = ? WHERE id = ?",
      [name.trim(), conversationId]
    );

    const updatedConversation = await getConversationDetails(pool, conversationId);
    return res.status(200).json({
      success: true,
      conversation: updatedConversation,
      message: "Group name updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteGroupConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { adminId } = req.body;
    const pool = await getDbPool();

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    const conversation = await getConversationDetails(pool, conversationId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (conversation.type !== "group") {
      return res.status(400).json({
        success: false,
        message: "Only groups can be deleted with this endpoint",
      });
    }

    const canManage = await isGroupAdmin(pool, conversationId, adminId);
    if (!canManage) {
      return res.status(403).json({
        success: false,
        message: "Only group admin can delete the group",
      });
    }

    await pool.execute("DELETE FROM jc_web_pros_conversations WHERE id = ?", [conversationId]);

    return res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const pool = await getDbPool();

    if (!conversationId || !senderId || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid message",
      });
    }

    const [membershipRows] = await pool.execute(
      "SELECT 1 FROM jc_web_pros_conversation_members WHERE conversation_id = ? AND user_id = ?",
      [conversationId, senderId]
    );

    if (!membershipRows.length) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this conversation",
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO jc_web_pros_messages (conversation_id, sender_id, message) VALUES (?, ?, ?)",
      [conversationId, senderId, message.trim()]
    );

    const [messageRows] = await pool.execute(
      `SELECT m.id, m.conversation_id AS conversationId, m.sender_id AS senderId, m.message, m.created_at AS createdAt, u.name AS senderName
       FROM jc_web_pros_messages m
       JOIN jc_web_pros_users u ON m.sender_id = u.id
       WHERE m.id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: messageRows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  getAllUsers,
  createOrGetConversation,
  getUserConversations,
  getConversationById,
  addGroupMembers,
  removeGroupMember,
  updateGroupName,
  deleteGroupConversation,
  getConversationMessages,
  createMessage,
};