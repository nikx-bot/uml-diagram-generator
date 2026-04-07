import { useEffect, useRef, useState } from "react";

let mermaidReady = false;
let mermaidQueue = [];

async function ensureMermaid() {
  if (mermaidReady) return window.mermaid;
  return new Promise((resolve) => {
    mermaidQueue.push(resolve);
  });
}

// Dynamically load mermaid from CDN
(function loadMermaid() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
  script.onload = () => {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    window.mermaid.initialize({
      startOnLoad: false,
      theme: dark ? "dark" : "default",
      fontFamily: "inherit",
      securityLevel: "loose",
    });
    mermaidReady = true;
    mermaidQueue.forEach((r) => r(window.mermaid));
    mermaidQueue = [];
  };
  document.head.appendChild(script);
})();

export default function DiagramCanvas({ mermaidCode, isLoading }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);
  const [renderError, setRenderError] = useState(null);
  const idRef = useRef(`mmd-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!mermaidCode || !containerRef.current) return;
    setRenderError(null);

    let cancelled = false;
    ensureMermaid().then(async (m) => {
      if (cancelled) return;
      try {
        const { svg } = await m.render(idRef.current, mermaidCode);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          // Make SVG responsive
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";
            svgEl.style.maxWidth = "100%";
          }
        }
      } catch (err) {
        if (!cancelled) setRenderError("Diagram syntax error. Try regenerating.");
      }
      // Rotate id to avoid mermaid cache issues
      idRef.current = `mmd-${Math.random().toString(36).slice(2)}`;
    });
    return () => { cancelled = true; };
  }, [mermaidCode]);

  const copyCode = () => {
    if (!mermaidCode) return;
    navigator.clipboard.writeText(mermaidCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadSVG = () => {
    const svgEl = containerRef.current?.querySelector("svg");
    if (!svgEl) return;
    const blob = new Blob([svgEl.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uml-diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="diagram-canvas">
      <div className="canvas-toolbar">
        <span className="canvas-label">Diagram Preview</span>
        {mermaidCode && (
          <div className="canvas-actions">
            <button className="canvas-btn" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>−</button>
            <span className="zoom-label">{Math.round(zoom * 100)}%</span>
            <button className="canvas-btn" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}>+</button>
            <button className="canvas-btn" onClick={() => setZoom(1)}>Reset</button>
            <button className="canvas-btn" onClick={copyCode}>{copied ? "Copied!" : "Copy code"}</button>
            <button className="canvas-btn primary" onClick={downloadSVG}>Download SVG</button>
          </div>
        )}
      </div>

      <div className="canvas-body">
        {isLoading && (
          <div className="canvas-placeholder">
            <div className="loading-spinner" />
            <p>Generating diagram…</p>
          </div>
        )}

        {!isLoading && !mermaidCode && !renderError && (
          <div className="canvas-placeholder">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.3">
              <rect x="4" y="14" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="28" y="4" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="28" y="34" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="20" y1="19" x2="28" y2="9" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="20" y1="19" x2="28" y2="39" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <p>Your diagram will appear here</p>
            <p className="hint">Describe a system or paste code, then click Generate</p>
          </div>
        )}

        {renderError && (
          <div className="canvas-placeholder">
            <p className="error-text">{renderError}</p>
          </div>
        )}

        <div
          className="diagram-render-wrap"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center", display: mermaidCode && !isLoading ? "block" : "none" }}
        >
          <div ref={containerRef} className="diagram-render" />
        </div>
      </div>

      {mermaidCode && !isLoading && (
        <details className="code-panel">
          <summary>View Mermaid source</summary>
          <pre><code>{mermaidCode}</code></pre>
        </details>
      )}
    </div>
  );
}
