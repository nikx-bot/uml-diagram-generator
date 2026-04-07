# 📐 UML Diagram Generator

> **SDG 4 — Quality Education** · AI-powered UML diagrams from natural language or source code

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev)
[![Mermaid](https://img.shields.io/badge/Mermaid-11-ff3570.svg)](https://mermaid.js.org)
[![Claude API](https://img.shields.io/badge/Claude-Sonnet_4-8b5cf6.svg)](https://docs.anthropic.com)

---

## ✨ Overview

The **UML Diagram Generator** is an educational web application that automatically generates professional UML diagrams from either:

- 📝 **Plain English descriptions** — describe a system in natural language
- 💻 **Source code** — paste Python, Java, JavaScript, TypeScript, Go, or C++ code

Powered by **Claude Sonnet 4**, the tool teaches software design patterns by making diagrams instantly accessible — supporting the UN's **Sustainable Development Goal 4: Quality Education** by lowering the barrier to learning software architecture.

---

## 🎯 Supported Diagram Types

| Type | Best For |
|------|----------|
| **Class diagram** | Object-oriented design, inheritance hierarchies |
| **Sequence diagram** | API interactions, login flows, protocols |
| **Use case diagram** | Requirements, actor-system relationships |
| **Activity diagram** | Workflows, business processes, algorithms |
| **ER diagram** | Database schemas, data modeling |
| **Component diagram** | Microservices, system architecture |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/uml-diagram-generator.git
cd uml-diagram-generator
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

> ⚠️ **Important**: This key is used in the browser via the Anthropic direct browser access mode. For production, route requests through a backend proxy to keep your key secure.

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
uml-diagram-generator/
├── src/
│   ├── components/
│   │   ├── DiagramGenerator.jsx   # Text-to-UML input panel
│   │   ├── DiagramCanvas.jsx      # Mermaid rendering + export
│   │   ├── CodeInput.jsx          # Code-to-UML input panel
│   │   ├── Toolbar.jsx            # Mode + diagram type selector
│   │   └── ExamplePanel.jsx       # One-click educational examples
│   ├── utils/
│   │   └── umlGenerator.js        # Claude API integration + prompt engineering
│   ├── App.jsx                    # Root component + state management
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Design system + dark mode
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🏗️ Architecture

```
User Input (text / code)
        ↓
   Toolbar (mode + diagram type)
        ↓
   umlGenerator.js
   ├── buildSystemPrompt()   → type-specific UML instructions
   ├── Claude Sonnet 4 API   → generates Mermaid syntax
   └── extractMermaidCode()  → parse + clean output
        ↓
   DiagramCanvas.jsx
   ├── Mermaid.js v11        → renders SVG
   ├── Zoom controls
   └── SVG export
```

---

## 🌍 SDG 4 — Quality Education Alignment

This project directly supports SDG 4 targets:

- **4.4** — Increase learners with relevant technical skills for software development
- **4.6** — Promote digital literacy through accessible learning tools
- **4.a** — Build inclusive educational content with AI-powered tools

By making UML diagrams instantly generatable from plain English, the tool helps:
- Computer science students visualize and understand system design
- Self-taught developers learn industry-standard notation
- Educators generate examples and teaching materials instantly
- Non-native English speakers describe systems in simple language

---

## 🛠️ Built With

- **[React 18](https://react.dev)** — UI framework
- **[Vite 5](https://vitejs.dev)** — Build tool
- **[Mermaid.js 11](https://mermaid.js.org)** — Diagram rendering
- **[Claude Sonnet 4](https://docs.anthropic.com)** — AI diagram generation

---

## 📖 Usage Examples

### From natural language

> "Design a class diagram for an online banking system with accounts, transactions, and customers"

### From Python code

```python
class Order:
    def __init__(self, customer: Customer, items: list[Item]):
        self.customer = customer
        self.items = items
        self.status = "pending"

    def calculate_total(self) -> float:
        return sum(item.price for item in self.items)
```

→ Generates a class diagram with `Order`, `Customer`, `Item` classes and relationships.

---

## 🔧 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 🚀 Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set `VITE_ANTHROPIC_API_KEY` in your Vercel environment variables.

### Netlify

```bash
npm run build
# Deploy the dist/ folder
```

> **Security note**: For production deployments, move the Claude API calls to a server-side function to protect your API key.

---

## 🤝 Contributing

Contributions welcome! Areas to improve:

- [ ] Add more diagram types (state, timing, collaboration)
- [ ] Support more programming languages for code parsing
- [ ] Add diagram templates library
- [ ] Export to PNG, PDF
- [ ] Share diagrams via URL
- [ ] Accessibility improvements (ARIA, keyboard navigation)

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

---

## 📄 License

MIT © 2025 — See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) for Claude API
- [Mermaid.js](https://mermaid.js.org) for the incredible open-source diagramming library
- The UN's [Sustainable Development Goals](https://sdgs.un.org/goals/goal4) framework for inspiring purposeful software
