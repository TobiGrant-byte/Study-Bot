import { useState } from "react";

const SYSTEM_PROMPT = `You are Scholar, an AI research assistant helping students study.
Your responses should:
- Be clear, structured and academic in tone
- Use ## headings to break up sections
- Use bullet points (- ) for lists
- Summarise key concepts concisely
- Suggest related topics at the end when relevant
- Be encouraging and supportive`;

export function useGemini(apiKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (messages, onSuccess) => {
    if (!apiKey) {
      setError("Please enter your Groq API key first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const history = messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history,
            ],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message || "API error. Check your key.");
      } else {
        const reply = data.choices?.[0]?.message?.content || "No response received.";
        onSuccess(reply);
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendMessage };
}