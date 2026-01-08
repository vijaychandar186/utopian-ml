# Utopian ML 

**Utopian ML** is a collection of interactive educational pages and demos that explain machine learning concepts. Built with Next.js and TypeScript, the repo includes interactive visualizations, guides, and an AI chat feature for exploration.

---

## Tech Stack

- Next.js (app router)
- TypeScript
- Tailwind CSS / PostCSS
- pnpm

---

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
pnpm preview
```

> Note: This project is set up to run in a development container. If you're using VS Code Remote - Containers, the environment will be preconfigured.

---

## Project Structure

Important folders:

- `src/app/` – Next.js application entry, routing and top-level layout
- `src/components/` – Reusable UI components
- `src/features/` – Feature-specific UI and logic (AI chat, theme, scheme, etc.)
- `src/pages-content/` – Educational content and interactive demos (transformer, RNN)
- `public/` – Static assets

---

## Development Notes

- Uses `pnpm` for package management.
- It follows a component-driven structure with hooks and small, testable utilities in `src/lib`.

---

## Contributing

Contributions are welcome! Please open issues for bugs or feature requests, and send PRs against `main`.

- Follow the existing code style (TypeScript & React patterns)
- Keep changes small and focused
- Add tests or visual verification steps when applicable

---

## License

This repository is provided under the MIT License. See `LICENSE` for details.

---

## Contact

If you have questions or suggestions, open an issue or reach out to the repository owner.

---

**Happy learning!**
