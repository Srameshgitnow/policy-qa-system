# Policy Q&A System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status: Active](https://img.shields.io/badge/Status-Active%20Development-blue.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933.svg)]()
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)]()

A public-facing, open-source RAG application for finding and understanding UK public policy information in plain English.

> ⭐ If this project helps make public information easier to understand, please star it. Public visibility and community feedback are important for growth, credibility, and future improvements.

## Why this project matters

Public policy and official guidance are often difficult to navigate because they are written for specialists and scattered across many sources. This project demonstrates how AI-assisted retrieval can help people:

- search public policy information faster
- see the exact sources behind each answer
- understand complex guidance in simpler language
- explore linked documents without losing context

This project is intentionally designed as a transparent, source-grounded assistant rather than a black-box answer generator.

## Independent project notice

This is an independent community project and is not affiliated with, endorsed by, sponsored by, or operated by the UK Government, GOV.UK, or any public authority. References to public agencies or websites are only to identify information sources. Always verify the current rules, deadlines, and official guidance before making a real-world decision.

## What it does

Users can ask questions about areas such as benefits, immigration procedures, public services, healthcare guidance, and general policy questions. The system:

1. retrieves relevant documents from configured public sources
2. ranks the most relevant passages
3. uses grounded prompting to answer based on those documents
4. shows source references and supporting context
5. presents the answer in plain English

## Example use cases

- "How do I apply for Child Benefit?"
- "What documents are required for a UK passport application?"
- "What are the key rules around Universal Credit?"
- "What is the difference between various public service eligibility rules?"

## Public repository checklist

This repository is set up to be more credible and publication-ready for a public GitHub audience:

- [x] README is complete and professionally structured
- [x] Project architecture is documented in [ARCHITECTURE.md](ARCHITECTURE.md)
- [x] Repo hygiene and environment safety are configured in [.gitignore](.gitignore)
- [x] License is included in [LICENSE](LICENSE)
- [x] Clear setup and usage instructions are included below
- [x] No hard-coded secrets or API keys are exposed in the project files
- [ ] Live demo and screenshots can be added later when the project is ready for public showcase

## Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React + TypeScript + Vite + Tailwind CSS |
| Backend | Node.js + Express + TypeScript |
| AI / RAG | LangChain + OpenAI embeddings and chat models |
| Database | PostgreSQL + pgvector |
| Infrastructure | Docker + Docker Compose |

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the system design, request flow, and module layout.

## Project structure

```text
policy-qa-system/
├── README.md
├── ARCHITECTURE.md
├── LICENSE
├── .gitignore
├── docker-compose.yml
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── SEO.md
```

## Quick start

### Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL with pgvector support
- An OpenAI API key for embeddings/chat generation

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/policy-qa-system.git
cd policy-qa-system
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Copy the backend sample environment file:

```bash
cp backend/.env.example backend/.env
```

Then update the values in backend/.env with your own local configuration.

Example:

```env
NODE_ENV=development
PORT=3000
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/policy_qa
```

### 4) Start local services

```bash
docker compose up -d postgres
npm run dev
```

The frontend and backend should start in local development mode.

### 5) Seed or ingest content

```bash
npm run seed:policies
```

If you want to ingest data into the retrieval layer:

```bash
npm run ingest:documents
```

## Usage

Open the frontend in your browser and ask questions such as:

```text
How do I apply for Universal Credit?
What documents do I need for a passport?
What support is available for families?
```

The app should return a grounded answer with citations and related source references.

## Open-source quality and public visibility

To make the repository stronger for public viewing and GitHub discovery:

- keep the README focused, concise, and readable
- document the architecture clearly
- use a proper MIT license
- avoid secrets and environment files in the repo
- maintain a low-friction setup experience
- add a roadmap and future improvements section over time
- publish a clean, well-structured issue and PR flow

## Contributing

Contributions are welcome. Whether you are improving the retrieval flow, frontend UX, documentation, or ingestion pipeline, please keep the changes focused and clearly explained.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Security

Do not commit real API keys, database credentials, or private tokens. Use local environment files only and keep them out of version control. If you discover a security issue, please report it privately before opening a public issue.

## Star this project

This repository is built to be a professional, public-facing project that can be shown to recruiters, collaborators, and visa reviewers. A clean README, architecture docs, and open-source hygiene all help signal seriousness.

If this project is useful, a GitHub star is a small but meaningful signal of support.


If you find this project helpful, please consider starring the repository and sharing it with others.


---
