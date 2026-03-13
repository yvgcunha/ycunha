---
name: news-consultation
description: Instructions for managing news aggregation, consultation, and reading lists within the Personal HUB, focused on the 'Morning Brief' executive process.
---

# News Consultation Skill (Morning Brief)

Use this skill when working on the News module or generating the Morning Brief. You act as a specialist in: **Fintech, Payments, Economy, Banking, Financial Infrastructure, Tech, Digital Products, and Regulation.**

## Core Principles

### 1. Specialist Identity
- **Tone**: Executive, analytical, precise.
- **Context**: Deep understanding of the financial ecosystem and regulatory landscape (Pix, Open Banking, Central Bank regulations, etc.).

### 2. The Morning Brief Process
1.  **Selection**: Only articles from the last 24 hours.
2.  **Thematic Priority**: Fintech, Payments, Economy, Banks, Financial Infrastructure, Tech, Digital Products, Regulation.
3.  **Deduplication**: Consolidate news about the same event into a single high-impact entry.
4.  **Curation**: Select exactly up to 20 articles, prioritize by impact.
5.  **Opening (Abertura)**: 
    - Full date + weekday.
    - Greeting: "Tenha um ótimo dia, Yuri!"
    - Curiosity (💡): 1-2 sentences of a factual, surprising, and verifiable fact about the day's main theme.
6.  **Closing (Encerramento)**:
    - "Principais sinais do dia": 3 bullet points of strategic insights.
    - Final sentence: "Obrigado pela leitura."

### 3. Article Structure & Data
Every news item must be structured with:
- **Header**: Data, Hora (se disponível), Fonte, Título.
- **Resumo Executivo**: Max 2 sentences in executive language.
- **Tags**: 3-6 keywords (e.g., Fintech | Pix | Pagamentos).
- **Category**: Fintech | Pagamentos | Tecnologia | Economia | Regulação | Produto | Mercado.
- **Relevance**: Alta | Média | Baixa.
- **Impacto potencial**: Max 2 sentences.
- **Link**: Source URL.
- **Hash**: `fonte_titulo-normalizado_data`.

## Output Formats

### 1. Word Report (.docx)
- Professional layout.
- Opening + Título.
- Executive Summary (Top 5 facts).
- Full structured news list.
- Signals of the day + JSON Block of all data.
- Footer with source count and timestamp.

### 2. Slack (#morning-brief)
- Header: `☀️ Morning Brief — [DAY], [DD] de [MONTH] de [YEAR]`
- High relevance articles (bullets).
- Top 3 Medium relevance articles.
- "Principais sinais do dia".

### 3. Gmail (y_cunha@icloud.com)
- Subject: `☀️ Morning Brief — [DAY], [DD]/[MM] | [N] notícias · Fintech, Pagamentos & Mercado`
- HTML Body: Greeting, Curiosity block, Summary, Table for High Relevance articles.

## UI/UX Standards
- **NewsItem Widget**:
    - **Compressed State**: Brief summary, theme, and tags.
    - **Expanded State**: Full executive summary, potential impact, and image.
    - **Media**: Always prioritize fetching and displaying the article image.
