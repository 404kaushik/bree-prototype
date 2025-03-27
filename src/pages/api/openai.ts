import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize OpenAI client
// Note: In production, use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Secure your API key with environment variables
  dangerouslyAllowBrowser: false, // Ensure API key is not exposed to the browser
});

// Validate API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is missing. Please check your environment variables.');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { financialData, timelineData, selectedScenario } = req.body;

    if (!financialData || !timelineData || !selectedScenario) {
      return res.status(400).json({ error: 'Missing required financial data' });
    }

    // Format the data for the OpenAI API
    const prompt = `
      As a financial advisor, analyze the following financial scenario and provide personalized advice:
      
      Current Financial Situation:
      - Monthly Income: $${financialData.currentIncome}
      - Monthly Expenses: $${financialData.currentExpenses}
      - Current Savings: $${financialData.currentSavings}
      - Current Debt: $${financialData.currentDebt}
      - Selected Strategy: ${selectedScenario}
      - Projection Period: ${financialData.yearsToProject} years
      
      Projected Outcome (after ${financialData.yearsToProject} years):
      - Final Savings: $${timelineData[timelineData.length - 1].savings.toFixed(2)}
      - Final Debt: $${timelineData[timelineData.length - 1].debt.toFixed(2)}
      - Net Worth Change: $${(timelineData[timelineData.length - 1].netWorth - timelineData[0].netWorth).toFixed(2)}
      
      Based on this information, provide:
      1. A brief assessment of this financial plan
      2. Three specific, actionable recommendations to improve financial outcomes
      3. One potential risk or challenge to be aware of
      4. One opportunity that might be overlooked
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using gpt-3.5-turbo which is more widely available
      messages: [
        { role: "system", content: "You are an expert financial advisor who provides clear, concise, and personalized financial advice. Your recommendations should be specific, actionable, and tailored to the individual's financial situation." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Return the AI-generated advice
    return res.status(200).json({ advice: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Provide more detailed error information for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Check for common API key issues
    if (errorMessage.includes('authentication') || errorMessage.includes('API key')) {
      console.error('This appears to be an API key issue. Please verify your OPENAI_API_KEY environment variable.');
      return res.status(500).json({ error: 'API key configuration issue. Please check server logs.' });
    }
    
    // Check for model access issues
    if (errorMessage.includes('model') && errorMessage.includes('does not exist')) {
      console.error('This appears to be a model access issue. The specified model is not available with your API key.');
      return res.status(500).json({ error: 'The AI model is not available. Please check server logs for details.' });
    }
    
    return res.status(500).json({ error: 'Failed to generate financial advice: ' + errorMessage })
  }
}