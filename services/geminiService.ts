import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { CyberTool, NewsArticle } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCybersecurityTools = async (): Promise<CyberTool[]> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "List top 20 most important cybersecurity tools. For each tool, provide its name, its primary category (e.g., 'Network Security', 'Endpoint Protection', 'SIEM'), and a brief one-sentence description of its function.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the cybersecurity tool." },
                  category: { type: Type.STRING, description: "The primary category of the tool." },
                  description: { type: Type.STRING, description: "A brief one-sentence description of the tool's function." },
                },
                required: ["name", "category", "description"],
              },
            },
          },
        },
      },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse.tools || [];
  } catch (error) {
    console.error("Error fetching cybersecurity tools:", error);
    return [];
  }
};

export const getTrendingNews = async (topic: 'Cybersecurity' | 'AI' | 'DevOps' | 'AWS'): Promise<{articles: NewsArticle[], sources: any[]}> => {
  try {
    const prompt = `What are the top 5 trending news headlines and summaries about ${topic} right now? For each, provide a title, a brief summary, and the source.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks.map(chunk => chunk.web).filter(Boolean);

    const textResponse = response.text;
    
    // This is a simplistic parser. A more robust solution might need another AI call to structure the text.
    const articles: NewsArticle[] = textResponse.split('\n\n')
      .map(block => {
        const titleMatch = block.match(/^(?:Title: |\*\*Title:\*\*)\s*(.*)/m);
        const summaryMatch = block.match(/^(?:Summary: |\*\*Summary:\*\*)\s*(.*)/m);
        const sourceMatch = block.match(/^(?:Source: |\*\*Source:\*\*)\s*(.*)/m);

        if (titleMatch && summaryMatch) {
          return {
            title: titleMatch[1].trim(),
            summary: summaryMatch[1].trim(),
            source: sourceMatch ? sourceMatch[1].trim() : 'N/A'
          };
        }
        return null;
      }).filter((article): article is NewsArticle => article !== null);
    
    if (articles.length > 0) {
        return { articles, sources };
    }
    
    // Fallback if structured parsing fails
    const fallbackArticles: NewsArticle[] = [{
        title: "Content Generated",
        summary: textResponse,
        source: "Gemini AI"
    }];

    return { articles: fallbackArticles, sources };

  } catch (error) {
    console.error(`Error fetching ${topic} news:`, error);
    return { articles: [], sources: [] };
  }
};

export const createChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are Aegis AI, a helpful assistant integrated into a cybersecurity and infrastructure dashboard. Be concise and helpful.',
        },
    });
};
