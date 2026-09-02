# Architecture

This document describes the system structure, data flow, and responsibilities of the major components in the Policy Q&A System.

## Overview

The application is a full-stack retrieval-augmented generation (RAG) system designed to answer questions about public policy information using grounded source material. It combines a TypeScript backend, a React frontend, and a PostgreSQL database with vector capabilities.

The core design goal is transparency: answers should be derived from retrieved policy documents, with references to source material shown to the user.

## High-level architecture

```text
User Browser
    |
    v
React Frontend
    |
    | HTTP API calls
    v
Express Backend
    |
    +--> Policy retrieval layer
    +--> Embedding generation
    +--> LLM answer generation
    +--> PostgreSQL database
    +--> Policy indexing / ingestion
```

## Components

### 1. Frontend

Location: frontend/

Responsibilities:
- render the search interface
- collect user questions
- send requests to the backend API
- display answers, source references, and policy cards
- provide a clean user-facing experience for policy lookup

Technology:
- React
- TypeScript
- Vite
- Tailwind CSS

### 2. Backend API

Location: backend/src/

Responsibilities:
- expose REST endpoints for search and policy data
- accept questions from the frontend
- retrieve the most relevant policy chunks from the database
- orchestrate LLM generation with grounded context
- return answers and references to the client

Main modules:
- api/routes/ - request handlers
- rag/retriever/ - retrieval and embedding logic
- rag/generator/ - answer synthesis and prompting
- rag/ingestion/ - document chunking and ingestion
- db/ - PostgreSQL connection and migration code

### 3. Database layer

Location: backend/src/db/

Responsibilities:
- store policy metadata and source information
- store content chunks for semantic retrieval
- support similarity search using vector embeddings
- manage schema migrations and seed data

The current design assumes PostgreSQL with pgvector for vector similarity search.

### 4. Retrieval and generation flow

The application follows a standard RAG flow:

1. A user submits a policy question in the frontend.
2. The backend receives the query and sends it to the retrieval layer.
3. The system compares the question to indexed policy chunks using vector similarity.
4. The most relevant chunks are selected as context.
5. The LLM is prompted with the question and retrieved evidence.
6. The model provides a concise answer grounded in the retrieved material.
7. Source references are attached and returned to the frontend.

This keeps the answer anchored to official or public source material rather than allowing pure model improvisation.

## Request lifecycle

### Example: user asks a question

```text
Frontend -> POST /api/questions
Backend -> validate input
Backend -> fetch relevant policy chunks
Backend -> create grounded prompt
Backend -> call LLM using OpenAI model
Backend -> format answer + citations
Frontend -> render answer and sources
```

## Data model assumptions

The project currently models policy records around:

- policy metadata
- source identifiers
- title and summary
- URL or source reference
- document content
- chunked text segments
- embedding vectors

This allows ranking by semantic similarity while preserving source traceability.

## Operational considerations

### Security
- keep API keys in local environment files
- never commit production secrets
- validate and sanitize inputs before processing

### Reliability
- use PostgreSQL-backed metadata for retrieval consistency
- keep ingestion and embedding generation deterministic where possible
- add logs and monitoring as the project scales

### Extensibility
- add more sources by creating ingestion adapters
- add more frontend tabs or search modes
- support broader policy categories with additional metadata filters

## Recommended future improvements

- Add a clean deployment pipeline for production hosting
- Add automatic health checks for database and model connectivity
- Add caching for frequent policy searches
- Add evaluation prompts for answer quality and citation accuracy
- Add a proper admin panel for source management and ingestion

## Summary

The architecture is intentionally modular, with a clear separation between:

- frontend UX
- backend API
- source retrieval and ingestion
- LLM generation
- persistent storage

This separation makes the project easier to maintain, extend, and present as a professional open-source initiative.
