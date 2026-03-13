"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function DashboardPage() {
  const { messages, sendMessage, status } = useChat({ api: "/api/chat" });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    // Only auto-scroll if user is already near the bottom
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const getMessageText = (msg: (typeof messages)[0]) => {
    const textParts = msg.parts?.filter((p) => p.type === "text");
    if (textParts && textParts.length > 0) {
      return textParts.map((p) => p.text).join("");
    }
    return "";
  };

  return (
    <div className="px-4 py-6 flex flex-col" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-barn">Dashboard</h1>
        <p className="text-sm text-earth-dark">
          Talk to your Farm Sitter assistant — manage inquiries, operators,
          training, credentials, and more.
        </p>
      </div>

      {/* Chat messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-white rounded-xl border border-wheat shadow-sm p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🐴</div>
            <h2 className="text-xl font-bold text-barn mb-2">
              Farm Sitter Assistant
            </h2>
            <p className="text-earth-dark text-sm max-w-md mx-auto mb-6">
              I can help you manage your farm-sitting platform. Try asking me
              something:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Show me all pending inquiries",
                "List credentialed operators in Illinois",
                "What workshops are coming up?",
                "Help me match an inquiry to a sitter",
                "How many operators do we have?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="px-3 py-1.5 text-xs bg-cream-dark border border-wheat rounded-full text-earth-dark hover:bg-wheat-light hover:border-earth-light transition-colors"
                  onClick={() => {
                    sendMessage({ text: suggestion });
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const text = getMessageText(msg);
          if (!text) return null;

          return (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-xl px-5 py-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "max-w-[60%] bg-barn text-cream rounded-br-sm"
                    : "max-w-full bg-cream-dark text-barn-dark border border-wheat rounded-bl-sm"
                }`}
              >
                {msg.role === "user" ? (
                  text
                ) : (
                  <div className="prose prose-sm max-w-none prose-headings:text-barn prose-strong:text-barn prose-td:text-earth-dark prose-th:text-barn prose-th:font-semibold">
                    <ReactMarkdown>{text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-cream-dark border border-wheat rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-earth rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-earth rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2 h-2 bg-earth rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your assistant anything..."
          className="flex-1 px-4 py-3 rounded-xl border border-wheat bg-white text-barn-dark placeholder-earth-light focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-rust text-white font-semibold rounded-xl hover:bg-rust-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
