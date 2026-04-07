/**
 * Calls the Anthropic API to convert user input to Mermaid UML syntax.
 * @param {string} input - Natural language description or code snippet
 * @param {string} diagramType - class | sequence | usecase | activity | er | component
 * @param {string} mode - 'text' | 'code'
 * @returns {Promise<string>} Mermaid diagram code
 */
export async function generateUML(input, diagramType, mode = "text") {
  const systemPrompt = buildSystemPrompt(diagramType, mode);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: input }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  return extractMermaidCode(raw, diagramType);
}

function buildSystemPrompt(diagramType, mode) {
  const modeInstruction =
    mode === "code"
      ? "The user will provide source code. Analyze it and generate a UML diagram from it."
      : "The user will describe a system in natural language. Generate a UML diagram from their description.";

  const diagramGuide = {
    class: `Generate a Mermaid classDiagram. Include:
- Classes with attributes (type name) and methods (returnType methodName(params))
- Relationships: inheritance (--|>), composition (--*), aggregation (--o), association (-->), dependency (..>)
- Multiplicities where appropriate (1, *, 0..1, 1..*)
- <<interface>> and <<abstract>> stereotypes where relevant`,

    sequence: `Generate a Mermaid sequenceDiagram. Include:
- Participants (actor or participant keywords)
- Synchronous (->>), async (->), return messages (--)
- Activation boxes (activate/deactivate or +/-)
- Notes (note over / note left of / note right of)
- alt/opt/loop/par blocks where appropriate`,

    usecase: `Generate a Mermaid flowchart (direction LR) that represents a use case diagram. Include:
- Actors as rounded rectangles at the edges (actor names)
- Use cases as ovals in the system boundary
- Associations with arrows
- Include/extend relationships labeled accordingly
- System boundary as a subgraph`,

    activity: `Generate a Mermaid flowchart (direction TD) that represents an activity diagram. Include:
- Start ([*]) and end nodes
- Actions as rectangles
- Decisions as diamond shapes with labeled branches
- Fork/join for parallel flows using subgraphs
- Clear flow from start to end`,

    er: `Generate a Mermaid erDiagram. Include:
- Entities in UPPER_CASE
- Attributes with type and name
- Relationships with cardinality (||--||, ||--o{, }o--o{, etc.)
- Relationship labels describing the association`,

    component: `Generate a Mermaid flowchart (direction TB) representing a component diagram. Include:
- Components as rectangles
- Interfaces as small circles or labeled connectors
- Dependencies as dashed arrows
- Packages/subsystems as subgraphs
- Required/provided interfaces`,
  };

  return `You are an expert UML diagram teacher and software architect. Your mission supports SDG 4 (Quality Education) by making software design accessible to learners of all levels.

${modeInstruction}

${diagramGuide[diagramType] || diagramGuide.class}

STRICT RULES:
1. Output ONLY valid Mermaid.js syntax — no explanation, no markdown fences, no extra text
2. Start directly with the diagram type keyword (classDiagram, sequenceDiagram, flowchart, erDiagram, etc.)
3. Make the diagram educational and complete — include at least 3-5 meaningful elements
4. Use realistic, descriptive names that help learners understand the pattern
5. If the input is vague, infer a reasonable real-world scenario
6. Ensure valid Mermaid syntax — test mentally before outputting`;
}

function extractMermaidCode(raw, diagramType) {
  // Strip markdown fences if present
  const fenceMatch = raw.match(/```(?:mermaid)?\s*([\s\S]+?)```/);
  if (fenceMatch) return fenceMatch[1].trim();

  // Strip any leading explanation text
  const keywords = [
    "classDiagram",
    "sequenceDiagram",
    "flowchart",
    "erDiagram",
    "stateDiagram",
    "graph",
    "gantt",
    "pie",
  ];
  for (const kw of keywords) {
    const idx = raw.indexOf(kw);
    if (idx !== -1) return raw.slice(idx).trim();
  }

  return raw.trim();
}
