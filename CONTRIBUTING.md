# Contributing to UML Diagram Generator

Thank you for helping make software design education more accessible! 🎓

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/uml-diagram-generator`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and add your Anthropic API key
5. Run: `npm run dev`

## How to Contribute

### Reporting bugs
Open a GitHub Issue with:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS version

### Adding diagram types
1. Add the type to `DIAGRAM_TYPES` in `src/components/Toolbar.jsx`
2. Add a prompt guide to `buildSystemPrompt()` in `src/utils/umlGenerator.js`
3. Add at least one example to `EXAMPLES` in `src/components/ExamplePanel.jsx`

### Improving AI prompts
The prompts live in `src/utils/umlGenerator.js`. Good prompts:
- Specify Mermaid syntax rules precisely
- Include real-world naming guidance
- Handle edge cases gracefully

### Code style
- Use functional React components with hooks
- CSS variables for all colors (dark mode must work)
- No external UI libraries — the project is intentionally minimal

## Pull Request Checklist
- [ ] Works in both light and dark mode
- [ ] No API keys committed
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] README updated if adding features

## SDG 4 Mission

Every contribution should make software design more learnable. Ask yourself:
> *Does this help a student, self-taught developer, or educator understand software architecture better?*

If yes — we'd love your contribution!
