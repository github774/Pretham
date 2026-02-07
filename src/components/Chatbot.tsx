import React, { useState, useRef, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const exampleBotReply = (question: string) => {
  // Simple mock logic for demonstration
  if (question.toLowerCase().includes("college")) {
    return "Colleges love to see commitment to causes you care about! Try volunteering in areas that match your interests, like environmental work, tutoring, or community service.";
  }
  if (question.toLowerCase().includes("volunteer")) {
    return "There are many types of volunteering: environmental cleanups, food banks, tutoring, event support, and more. What are you passionate about?";
  }
  return "That's a great question! Think about what excites you or what skills you'd like to develop. I can suggest some volunteering options if you tell me more about your interests.";
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm your volunteer advisor bot. Ask me anything about volunteering or what looks best for college.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botReply: Message = {
        sender: "bot",
        text: exampleBotReply(input),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg flex flex-col h-[500px] border border-gray-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
