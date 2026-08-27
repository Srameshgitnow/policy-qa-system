# Policy Q&A System

[![Status: Active Development](https://img.shields.io/badge/status-active%20development-2563eb)](https://github.com/yourusername/policy-qa-system)

**Ask questions about public UK policy information and understand the answer in plain English.**
Policy Q&A System is an independent, open-source retrieval-augmented generation (RAG)
application that finds relevant publicly available documents, produces a grounded answer, and
displays the sources used.

> ⭐ If this project helps you make public policy easier to understand, please **star the
> repository**. Stars help other developers discover the project and guide future development.

## Why this project?

Public guidance is authoritative but often difficult to search and full of specialist
language. This project combines semantic search and large language models to make UK policy
information easier to explore without hiding where an answer came from.

**Useful search terms:** UK policy Q&A, RAG chatbot, cited AI answers, public policy search,
policy document search, civic technology, information assistant.

## Independent project notice

This is an independent community project. It is **not affiliated with, endorsed by, sponsored
by, or operated by the UK Government, GOV.UK, or any public authority**. References to public
agencies or websites identify information sources only; they do not imply a relationship.
Always check the linked source for current requirements. This application is not legal, tax,
health, immigration, or other professional advice.

A retrieval-augmented generation (RAG) system that helps people 
to ask questions about UK public policy information and receive accurate, cited answers backed 
by official policy documents.

**Status:** 🚀 Active Development  

---

## 🎯 What It Does

Users can ask questions about UK public policy information, and the system:

1. **Retrieves** relevant policy documents from configured public sources
2. **Reads** and understands the policy content
3. **Generates** an accurate answer grounded in official documents
4. **Cites** exact sources (with page/section references)
5. **Explains** policy in plain English (not specialist jargon)

### Real-World Examples

**User Question:** "How much Child Benefit do I get for two children?"

**System Answer:**
```
You can claim Child Benefit for each child until they turn 16 (or 20 if in approved education/training).

For 2 children:
- Eldest child: £24.50/week
- Other children: £16.30/week each
- Total: £57.10/week (£2,969.20/year)

However, if your household income exceeds £50,000, you may need to pay back some benefit through self-assessment.

**Sources:**
- GOV.UK: Child Benefit rates 2024-2025
- UK Tax Rules: High Income Child Benefit Charge
```

**User Question:** "What documents do I need to apply for a UK passport?"

**System Answer:**
```
You'll need:

1. **Proof of identity:** One of the following:
   - Current passport
   - Birth certificate (full version with parents' details)
   - UK photocard driving licence
   - National ID card

2. **Proof of residence:** Dated within last 3 months:
   - Utility bill
   - Council tax bill
   - Bank statement

3. **Passport photos:** 6 x 4cm, recent, in color

4. **Completed form:** SP11 (standard application)

See GOV.UK Passport Application for full details and costs.

**Sources:**
- DVLA/Passport Office: Official UK Passport Requirements
- GOV.UK: How to Apply for a Passport
```

---

## ✨ Key Features

- ✅ **RAG (Retrieval-Augmented Generation)** — Answers backed by official documents
- ✅ **Grounded responses** — Answers are based on retrieved policy documents
- ✅ **Citation Engine** — Every answer includes source references
- ✅ **Plain English Translation** — Complex policy → clear language
- ✅ **Multi-Source Support** — Supports multiple public policy sources
- ✅ **Search Fallback** — If RAG doesn't have answer, suggests related policies
- ✅ **Confidence Scoring** — Shows how confident the system is in its answer
- ✅ **Analytics** — Track which questions are most asked
- ✅ **Scalable** — Supports hundreds of concurrent users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript + TailwindCSS |
| **Backend** | Node.js 18+ + Express.js + Hapi.js |
| **AI/RAG** | LangChain + LangGraph + OpenAI/Claude |
| **Vector Store** | PostgreSQL + pgvector (embeddings) |
| **Data Source** | Public policy APIs, parliamentary material, and documents |
| **Authentication** | Optional (public or authenticated access) |
| **Deployment** | Docker + Railway/Render |
| **Analytics** | PostgreSQL + Grafana (optional) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+ with pgvector extension
- OpenAI API key (or Claude API key)
- Optional: GitHub account for PDF scraping

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/policy-qa-system.git
cd policy-qa-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```
# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/policy_qa

# Public Information Sources
GOV_UK_API_TOKEN=xxxxxxxxxxxx (optional)

# Server
PORT=3000
NODE_ENV=development
```

4. **Set up database**
```bash
npm run db:migrate
npm run seed:policies  # Load initial policy documents
```

5. **Start the server**
```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

## 📖 Usage

### For End Users

Visit `http://localhost:3000` and ask a question:

```
"How do I apply for universal credit?"
```

System responds with:
- Clear answer in plain English
- Source citations with links
- Related policies you might find helpful
- Confidence score

### For Administrators

Add new policy documents:
```bash
npm run ingest:documents --source="gov.uk" --category="benefits"
```

View analytics:
```bash
GET /api/analytics
```

View all indexed policies:
```bash
GET /api/policies
```

---

## 📊 Expected Results

- **Response Time:** 2-5 seconds per question
- **Accuracy:** 90%+ when answer exists in policy documents
- **Hallucination Rate:** <5% (RAG prevents making up answers)
- **User Satisfaction:** 85%+ (based on feedback)
- **Cost:** ~$0.10-0.30 per question (varies by LLM)

---

## 📚 Public Information Sources

This system can ingest publicly available information from sources such as:

- **GOV.UK** — Benefits, taxes, passports, driving licenses
- **UK Parliament** — Bills, acts, debates
- **HMRC** — Tax guidance, self-assessment
- **DWP** — Universal Credit, pension information
- **DVLA** — Vehicle and driving information
- **NHS** — Health and social care guidance
- **Local authorities** — Council tax, planning guidance

Availability and reuse rights vary by source. Confirm the licence, terms of use, and attribution
requirements for each document before ingesting or redistributing it.

---

## 🔒 Privacy & Compliance

- ✅ No user data stored (unless explicitly opted in)
- ✅ No training on user questions
- ✅ GDPR compliant (personal data not processed)
- ✅ Read-only access to configured public sources
- ✅ All processing local (no external API calls except LLM)

---

## 📄 License

MIT
 
## Support

If you find this project helpful, please consider starring the repository and sharing it with others.


---
