import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ApiKeyModal from "./components/ApiKeyModal";
import { useGemini } from "./hooks/useGemini";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [apiKeySet, setApiKeySet] = useState(false);
  const [messages, setMessages] = useState([]);
  const { loading, error, sendMessage } = useGemini(apiKey);

  const handleApiKey = (key) => {
    setApiKey(key);
    setApiKeySet(true);
  };

  const handleSend = (text) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    sendMessage(newMessages, (reply) => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    });
  };

  return (
    <div className="h-screen bg-[#080f1a] flex flex-col">
      {!apiKeySet && <ApiKeyModal onSubmit={handleApiKey} />}
      <div className="flex-1 overflow-hidden max-w-4xl w-full mx-auto">
        <ChatWindow
          messages={messages}
          loading={loading}
          error={error}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}