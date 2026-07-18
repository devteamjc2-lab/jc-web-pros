import { useEffect, useState } from "react";
import socket from "../socket";
import "/src/assets/css/chat.css";

const Chat = () => {
  const currentUser = "Keshav Official";
  const currentUserStatus = "Active now";

  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [errors, setErrors] = useState({});

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/get-all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Response:", data);
      if (data.success) {
        console.log("Users:", data.users);
        setUsers(data.users);
        if (!selectedContact && data.users.length > 0) {
          setSelectedContact(data.users[0]);
        }
      } else {
        setErrors({
          apiError: data.message,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrors({
        apiError: "Something went wrong",
      });
    }
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { user: "Priyanka JC Official", message: "Hi, Going to start my day", time: "08:52" },
    { user: currentUser, message: "Hi, Going to start my day", time: "08:53" },
  ]);


  useEffect(() => {
    getAllUsers();
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });


    socket.on("receive_message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          user: data.user || "Friend",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    });

    return () => {
      socket.disconnect();
      socket.off("receive_message");
    };

  }, []);



  const sendMessage = () => {
    if (!message.trim()) return;

    const outgoing = {
      user: currentUser,
      message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("send_message", outgoing);
    setMessages((prev) => [...prev, outgoing]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-card">
        <aside className="chat-sidebar">
          <div className="sidebar-top">
            <div>
              <h2>Chat</h2>
            </div>
            <div className="sidebar-actions">
              <button className="sidebar-icon">🔍</button>
              <button className="sidebar-icon">💬</button>
              <button className="sidebar-icon">➕</button>
            </div>
          </div>

          <div className="sidebar-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="contact-list">
            {users.map((contact) => (
              <div
                key={contact.id || contact.email}
                className={`contact-item ${selectedContact?.name === contact.name ? "active" : ""}`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="contact-avatar">
                  {contact.name
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="contact-details">
                  <p className="contact-name">{contact.name}</p>
                  <p className="contact-status">{contact.role || "Online"}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="chat-main">
          <div className="chat-header">
            <div className="header-left">
              <div className="header-badge">DA</div>
              <div>
                <h2>Daily Attendance - Official</h2>
                <p>Welcome to your team chat</p>
              </div>
            </div>
            <div className="header-right">
              <div className="profile-block">
                <div className="profile-avatar">K</div>
                <div className="profile-info">
                  <p className="profile-name">{currentUser}</p>
                  <p className="profile-status">{currentUserStatus}</p>
                </div>
              </div>
              <div className="header-actions">
                       
              </div>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => {
              const isOutgoing = msg.user === currentUser;
              return (
                <div key={index} className={`message-row ${isOutgoing ? "outgoing" : "incoming"}`}>
                  <div className={`message-bubble ${isOutgoing ? "outgoing" : "incoming"}`}>
                    {msg.message}
                    <div className="message-meta">
                      {isOutgoing ? "You" : msg.user} • {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="chat-input-wrapper">
            <div className="chat-input-inner">
              <input
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
              />
              <button className="send-btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


export default Chat;