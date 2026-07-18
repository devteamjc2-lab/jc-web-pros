import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/login";
import Dashboard from "../pages/admin/dashboard";

import AuthMiddleware from "../middleware/AuthMiddleware";
import PublicMiddleware from "../middleware/PublicMiddleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("Guest");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Loading messages...");
  const [isSending, setIsSending] = useState(false);

  const canSend = useMemo(() => user.trim() && text.trim() && !isSending, [user, text, isSending]);

  async function loadMessages() {
    try {
      const response = await fetch(`${API_URL}/api/messages`);
      if (!response.ok) {
        throw new Error("Could not load messages");
      }

      const data = await response.json();
      setMessages(data);
      setStatus("");
    } catch (error) {
      setStatus("");
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSend) return;

    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.trim(), text: text.trim() }),
      });

      if (!response.ok) {
        throw new Error("Could not send message");
      }

      const message = await response.json();
      setMessages((currentMessages) => [...currentMessages, message]);
      setText("");
    } catch (error) {
      setStatus("");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="chat-panel" aria-label="Chat application">
      <header className="chat-header">
        <div>
          <p className="eyebrow">React + Node</p>
          <h1>JC Web Pro Chat</h1>
        </div>
        <span className="live-pill">Live API</span>
      </header>

      <div className="message-list" aria-live="polite">
        {messages.map((message) => (
          <article
            className={`message ${message.user === user.trim() ? "message-own" : ""}`}
            key={message.id}
          >
            <div className="avatar" aria-hidden="true">
              {message.user.slice(0, 1).toUpperCase()}
            </div>
            <div className="message-body">
              <strong>{message.user}</strong>
              <p>{message.text}</p>
            </div>
          </article>
        ))}

        {!messages.length && !status && (
          <p className="empty-state">Abhi koi message nahi hai. Pehla message bhejo.</p>
        )}
      </div>

      {status && <p className="status-message">{status}</p>}

      <form className="composer" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="Your name"
            maxLength={24}
          />
        </label>

        <label className="message-input">
          <span>Message</span>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type your message"
            maxLength={160}
          />
        </label>

        <button type="submit" disabled={!canSend}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/login"
        element={
          <PublicMiddleware>
            <Login />
          </PublicMiddleware>
        }
      />
      <Route
        path="/chat"
        element={
          <AuthMiddleware>
            <ChatPage />
          </AuthMiddleware>
        }
      />
   
      <Route
        path="/dashboard"
        element={
          <AuthMiddleware>
            <Dashboard />
          </AuthMiddleware>
        }
      />
    </Routes>
  );
};

export default AppRoutes;