import OpenAI from 'openai';

class AIService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateTaskSuggestions(context: string): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Given this context: ${context}, suggest 3 household tasks:` }],
        max_tokens: 100
      });
      
      return response.choices[0].message.content?.split('\n').filter(Boolean) || [];
    } catch (error) {
      console.error('Error generating tasks:', error);
      return [];
    }
  }

  async suggestGroceryItems(meals: string[]): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `For these meals: ${meals.join(', ')}, suggest grocery items:` }],
        max_tokens: 100
      });
      
      return response.choices[0].message?.content?.split('\n').filter(Boolean) || [];
    } catch (error) {
      console.error('Error suggesting groceries:', error);
      return [];
    }
  }

  async optimizeBudget(expenses: any[]): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Given these expenses: ${JSON.stringify(expenses)}, suggest budget optimizations:` }],
        max_tokens: 150
      });
      
      return response.choices[0].message?.content || 'No suggestions available';
    } catch (error) {
      console.error('Error optimizing budget:', error);
      return 'Error generating budget suggestions';
    }
  }
}

export const aiService = new AIService(process.env.OPENAI_API_KEY || ''); 