import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import { logger } from '../../utils/logger.js';
import { RetrievedChunk } from '../retriever/index.js';

dotenv.config();

interface GeneratedAnswer {
  answer: string;
  confidence: number;
  sources: Array<{ title: string; url: string; excerpt: string }>;
  relatedPolicies: string[];
}

export async function generateAnswer(
  query: string,
  retrievedChunks: RetrievedChunk[]
): Promise<GeneratedAnswer> {
  try {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      temperature: 0.7
    });

    const sourcesContext = retrievedChunks
      .map((chunk, index) => `[Source ${index + 1}]\n${chunk.content}`)
      .join('\n\n');

    const prompt = `You are a helpful assistant that answers questions about UK public policy information.

User Question: ${query}

Retrieved Policy Documents:
${sourcesContext}

Please answer the question based on the policy documents provided. 
- Provide a clear, accurate answer in plain English (avoid jargon)
- Include specific figures, dates, or requirements mentioned in the documents
- At the end, list which sources you used
- Rate your confidence in this answer (0-100) based on how directly the documents answer the question
- Suggest 1-3 related policies that might be helpful

Format your response as JSON with this structure:
{
  "answer": "Your detailed answer here",
  "confidence": 85,
  "sources": [{"title": "Source Title", "excerpt": "Relevant quote"}],
  "relatedPolicies": ["Policy 1", "Policy 2"]
}`;

    const message = await llm.invoke(prompt);
    
    // Parse the response
    const content = message.content as string;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse LLM response');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    // Enrich sources with URLs
    const enrichedSources = retrievedChunks
      .slice(0, parsedResponse.sources?.length || 3)
      .map((chunk, index) => ({
        title: chunk.title,
        url: chunk.url,
        excerpt: parsedResponse.sources?.[index]?.excerpt || chunk.content.substring(0, 150)
      }));

    return {
      answer: parsedResponse.answer,
      confidence: Math.min(100, Math.max(0, parsedResponse.confidence || 75)),
      sources: enrichedSources,
      relatedPolicies: parsedResponse.relatedPolicies || []
    };
  } catch (error) {
    logger.error('Error generating answer:', error);
    throw error;
  }
}

export async function generateSummary(text: string, maxLength: number = 150): Promise<string> {
  try {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      temperature: 0.5
    });

    const prompt = `Summarize this text in plain English in approximately ${maxLength} characters:\n\n${text}`;
    
    const message = await llm.invoke(prompt);
    return message.content as string;
  } catch (error) {
    logger.error('Error generating summary:', error);
    return text.substring(0, maxLength);
  }
}
