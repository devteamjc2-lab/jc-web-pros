import { useEffect, useMemo, useState } from "react";
import socket from "../socket";
import "/src/assets/css/chat.css";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const currentUserStatus = currentUser?.role === "Admin" ? "Admin online" : "Active now";

  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/get-all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        const activeUserId = currentUser?.id || getStoredUser()?.id;
        setUsers(data.users.filter((user) => user.id !== activeUserId));
      } else {
        setErrors({ apiError: data.message });
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrors({ apiError: "Something went wrong" });
    }
  };

  const getConversations = async () => {
    if (!currentUser?.id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/chats/conversations/${currentUser.id}`);
      const data = await response.json();

      if (data.success) {
        setConversations(data.conversations || []);
        if (!selectedConversation && (data.conversations || []).length > 0) {
          setSelectedConversation(data.conversations[0]);
        }
      }
    } catch (error) {
      console.error("Conversation Error:", error);
    }
  };

  useEffect(() => {
    if (!currentUser?.id) return;

    getAllUsers();
    getConversations();
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser?.id]);

  useEffect(() => {
    if (!selectedConversation?.id || !currentUser?.id) return;

    const loadMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/messages/${selectedConversation.id}`);
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Message fetch error:", error);
      }
    };

    loadMessages();
    socket.emit("join_conversation", { conversationId: selectedConversation.id, userId: currentUser.id });

    return () => {
      socket.emit("leave_conversation", selectedConversation.id);
    };
  }, [selectedConversation?.id, currentUser?.id]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (!selectedConversation || data.conversationId !== selectedConversation.id) return;
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [selectedConversation?.id]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, users]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) =>
      (conversation.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, conversations]);

  const getInitials = (name) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const startPrivateChat = async (contact) => {
    const activeUser = currentUser || getStoredUser();
    if (!activeUser?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/chats/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "private",
          createdBy: activeUser.id,
          participants: [contact.id],
        }),
      });

      const data = await response.json();
      if (data.success) {
        const conversation = data.conversation;
        setSelectedConversation(conversation);
        setConversations((prev) => {
          const exists = prev.some((item) => item.id === conversation.id);
          return exists ? prev.map((item) => (item.id === conversation.id ? conversation : item)) : [conversation, ...prev];
        });
      }
    } catch (error) {
      console.error("Create private chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroup = async (event) => {
    event.preventDefault();
    const activeUser = currentUser || getStoredUser();
    if (!activeUser?.id || !groupName.trim() || selectedGroupMembers.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/chats/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "group",
          name: groupName.trim(),
          createdBy: activeUser.id,
          participants: selectedGroupMembers,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const conversation = data.conversation;
        setSelectedConversation(conversation);
        setConversations((prev) => [conversation, ...prev]);
        setIsGroupModalOpen(false);
        setGroupName("");
        setSelectedGroupMembers([]);
      } else {
        setErrors({ apiError: data.message });
      }
    } catch (error) {
      console.error("Create group error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    const activeUser = currentUser || getStoredUser();
    if (!message.trim() || !selectedConversation?.id || !activeUser?.id) return;

    const outgoing = {
      conversationId: selectedConversation.id,
      senderId: activeUser.id,
      senderName: activeUser.name,
      message: message.trim(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/chats/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outgoing),
      });

      const data = await response.json();
      if (data.success) {
        socket.emit("send_message", {
          conversationId: selectedConversation.id,
          senderId: activeUser.id,
          senderName: activeUser.name,
          message: message.trim(),
        });
      }
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const toggleMemberSelection = (userId) => {
    setSelectedGroupMembers((prev) =>
      prev.includes(userId) ? prev.filter((memberId) => memberId !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="chat-page">
      <div className="chat-card">
        <aside className="chat-sidebar">
          <div className="sidebar-top">
            <div>
              <h2>Chats</h2>
            </div>
            <div className="sidebar-actions">
              <button className="sidebar-icon">🔍</button>
              {currentUser?.role?.toLowerCase() === "admin" && (
                <button className="sidebar-icon" onClick={() => setIsGroupModalOpen(true)}>
                  ➕
                </button>
              )}
            </div>
          </div>

          <div className="sidebar-search">
            <input
              type="text"
              placeholder="Search contacts or chats"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className="section-title">Contacts</div>
          <div className="contact-list">
            {filteredUsers.map((contact) => (
              <div
                key={contact.id || contact.email}
                className="contact-item"
                onClick={() => startPrivateChat(contact)}
              >
                <div className="contact-avatar">{getInitials(contact.name)}</div>
                <div className="contact-details">
                  <p className="contact-name">{contact.name}</p>
                  <p className="contact-status">{contact.role || "Online"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="section-title">Conversations</div>
          <div className="contact-list">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`contact-item ${selectedConversation?.id === conversation.id ? "active" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="contact-avatar">{getInitials(conversation.title)}</div>
                <div className="contact-details">
                  <p className="contact-name">{conversation.title}</p>
                  <p className="contact-status">
                    {conversation.type === "group" ? "Group" : "Private"}
                    {conversation.lastMessage?.message ? ` • ${conversation.lastMessage.message}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="chat-main">
          <div className="chat-header">
            <div className="header-left">
              <div className="header-badge">
                {selectedConversation ? getInitials(selectedConversation.title) : "C"}
              </div>
              <div>
                <h2>{selectedConversation?.title || "Select a conversation"}</h2>
                <p>
                  {selectedConversation?.type === "group"
                    ? "Group chat • admin can manage members"
                    : "Private chat • one-to-one conversation"}
                </p>
              </div>
            </div>
            <div className="header-right">
              <div className="profile-block">
                <div className="profile-avatar">{currentUser ? getInitials(currentUser.name) : "U"}</div>
                <div className="profile-info">
                  <p className="profile-name">{currentUser?.name || "User"}</p>
                  <p className="profile-status">{currentUserStatus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-body">
            {errors.apiError && <div className="chat-error">{errors.apiError}</div>}
            {!selectedConversation ? (
              <div className="empty-state">Choose a contact or start a group chat.</div>
            ) : messages.length === 0 ? (
              <div className="empty-state">No messages yet. Start the conversation.</div>
            ) : (
              messages.map((msg, index) => {
                const isOutgoing = Number(msg.senderId) === Number(currentUser?.id);
                return (
                  <div key={msg.id || index} className={`message-row ${isOutgoing ? "outgoing" : "incoming"}`}>
                    <div className={`message-bubble ${isOutgoing ? "outgoing" : "incoming"}`}>
                      {msg.message}
                      <div className="message-meta">
                        {isOutgoing ? "You" : msg.senderName || "Friend"} • {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Now"}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="chat-input-wrapper">
            <div className="chat-input-inner">
              <input
                className="chat-input"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={selectedConversation ? "Type your message..." : "Select a conversation first"}
                disabled={!selectedConversation}
              />
              <button className="send-btn" onClick={sendMessage} disabled={!selectedConversation || isLoading}>
                Send
              </button>
            </div>
          </div>
        </section>
      </div>

      {isGroupModalOpen && (
        <div className="modal-overlay" onClick={() => setIsGroupModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h3>Create Group</h3>
            <p>Only admins can create a new group chat.</p>
            <form onSubmit={createGroup}>
              <input
                className="modal-input"
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
              />
              <div className="member-list">
                {users.map((user) => (
                  <label key={user.id} className="member-item">
                    <input
                      type="checkbox"
                      checked={selectedGroupMembers.includes(user.id)}
                      onChange={() => toggleMemberSelection(user.id)}
                    />
                    <span>{user.name}</span>
                  </label>
                ))}
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setIsGroupModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="send-btn" disabled={isLoading}>
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;