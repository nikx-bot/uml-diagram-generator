const PLACEHOLDERS = {
  class: "e.g. Design a class diagram for an online library system with books, members, and borrowing records...",
  sequence: "e.g. Show the sequence of events when a user logs in — browser, auth server, database...",
  usecase: "e.g. Model use cases for a hospital management system with doctors, patients, and admins...",
  activity: "e.g. Describe the workflow for processing an e-commerce order from cart to delivery...",
  er: "e.g. Design a database for a school with students, courses, teachers, and enrollments...",
  component: "e.g. Show the components of a microservices architecture for a food delivery app...",
};

export default function DiagramGenerator({ value, onChange, onGenerate, isLoading, diagramType }) {
  const handleKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onGenerate();
  };

  return (
    <div className="input-section">
      <label className="input-label">
        Describe your system
        <span className="input-hint">Ctrl+Enter to generate</span>
      </label>
      <textarea
        className="main-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={PLACEHOLDERS[diagramType] || PLACEHOLDERS.class}
        rows={6}
        disabled={isLoading}
      />
      <button
        className="generate-btn"
        onClick={onGenerate}
        disabled={isLoading || !value.trim()}
      >
        {isLoading ? (
          <>
            <span className="btn-spinner" />
            Generating…
          </>
        ) : (
          <>Generate diagram →</>
        )}
      </button>
    </div>
  );
}
