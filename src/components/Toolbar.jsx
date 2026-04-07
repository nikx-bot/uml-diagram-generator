const TABS = [
  { id: "text", label: "Text description" },
  { id: "code", label: "From code" },
];

const DIAGRAM_TYPES = [
  { id: "class", label: "Class", icon: "⬜" },
  { id: "sequence", label: "Sequence", icon: "↔" },
  { id: "usecase", label: "Use case", icon: "◎" },
  { id: "activity", label: "Activity", icon: "◈" },
  { id: "er", label: "ER diagram", icon: "⊞" },
  { id: "component", label: "Component", icon: "⬡" },
];

export default function Toolbar({ activeTab, setActiveTab, diagramType, setDiagramType }) {
  return (
    <div className="toolbar">
      <div className="tab-row">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="type-row">
        <span className="type-label">Diagram type</span>
        <div className="type-chips">
          {DIAGRAM_TYPES.map((dt) => (
            <button
              key={dt.id}
              className={`type-chip ${diagramType === dt.id ? "active" : ""}`}
              onClick={() => setDiagramType(dt.id)}
              title={dt.label}
            >
              {dt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
