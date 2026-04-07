import { useState } from "react";
import DiagramGenerator from "./components/DiagramGenerator";
import DiagramCanvas from "./components/DiagramCanvas";
import CodeInput from "./components/CodeInput";
import Toolbar from "./components/Toolbar";
import ExamplePanel from "./components/ExamplePanel";
import { generateUML } from "./utils/umlGenerator";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("text"); // 'text' | 'code'
  const [userInput, setUserInput] = useState("");
  const [diagramType, setDiagramType] = useState("class");
  const [mermaidCode, setMermaidCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const code = await generateUML(userInput, diagramType, activeTab);
      setMermaidCode(code);
      setHistory((prev) => [
        { input: userInput, code, type: diagramType, tab: activeTab, ts: Date.now() },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      setError(err.message || "Failed to generate diagram. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistoryItem = (item) => {
    setUserInput(item.input);
    setDiagramType(item.type);
    setActiveTab(item.tab);
    setMermaidCode(item.code);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-group">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="8" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="16" y="2" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="16" y="19" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="11.5" x2="16" y2="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="11.5" x2="16" y2="22.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <div>
              <h1>UML Diagram Generator</h1>
              <span className="sdg-badge">SDG 4 · Quality Education</span>
            </div>
          </div>
          <p className="header-subtitle">
            Generate professional UML diagrams from plain text or code — learn software design visually.
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <Toolbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            diagramType={diagramType}
            setDiagramType={setDiagramType}
          />

          {activeTab === "text" ? (
            <DiagramGenerator
              value={userInput}
              onChange={setUserInput}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              diagramType={diagramType}
            />
          ) : (
            <CodeInput
              value={userInput}
              onChange={setUserInput}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          )}

          {error && <div className="error-banner">{error}</div>}

          <ExamplePanel
            diagramType={diagramType}
            onSelect={(example) => {
              setUserInput(example.input);
              setActiveTab(example.tab || "text");
            }}
          />

          {history.length > 0 && (
            <div className="history-section">
              <h3>Recent diagrams</h3>
              {history.map((item) => (
                <button
                  key={item.ts}
                  className="history-item"
                  onClick={() => loadHistoryItem(item)}
                >
                  <span className="history-type">{item.type}</span>
                  <span className="history-input">{item.input.slice(0, 60)}…</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="right-panel">
          <DiagramCanvas mermaidCode={mermaidCode} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
