export function formatMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return { type: "h2", content: line.slice(3), key: i };
    }
    if (line.startsWith("# ")) {
      return { type: "h1", content: line.slice(2), key: i };
    }
    if (line.startsWith("- ") || line.startsWith("• ")) {
      return { type: "li", content: line.slice(2), key: i };
    }
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return { type: "bold", content: line.slice(2, -2), key: i };
    }
    if (line.trim() === "") {
      return { type: "br", content: "", key: i };
    }
    return { type: "p", content: line, key: i };
  });
}