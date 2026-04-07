const LANG_HINTS = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "Java", value: "java" },
  { label: "TypeScript", value: "typescript" },
  { label: "C++", value: "cpp" },
  { label: "Go", value: "go" },
];

export default function CodeInput({ value, onChange, onGenerate, isLoading }) {
  const handleKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onGenerate();
  };

  return (
    <div className="input-section">
      <label className="input-label">
        Paste source code
        <span className="input-hint">Classes, interfaces, or data models</span>
      </label>
      <div className="lang-chips">
        {LANG_HINTS.map((l) => (
          <span key={l.value} className="lang-chip">{l.label}</span>
        ))}
      </div>
      <textarea
        className="main-textarea code-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={`class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
    
    def send_message(self, content: str) -> None:
        ...`}
        rows={8}
        disabled={isLoading}
        spellCheck={false}
      />
      <button
        className="generate-btn"
        onClick={onGenerate}
        disabled={isLoading || !value.trim()}
      >
        {isLoading ? (
          <>
            <span className="btn-spinner" />
            Analyzing code…
          </>
        ) : (
          <>Analyze & generate →</>
        )}
      </button>
    </div>
  );
}
