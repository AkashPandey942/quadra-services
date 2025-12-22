declare module "openai" {
  export interface OpenAIConfig {
    apiKey?: string;
    [key: string]: unknown;
  }

  export class OpenAI {
    constructor(config?: OpenAIConfig);
    chat: {
      completions: {
        create: (opts: {
          model: string;
          messages: Array<{ role: string; content: string }>;
          [key: string]: unknown;
        }) => Promise<{
          choices: Array<{ message: { content: string } }>;
          [key: string]: unknown;
        }>;
      };
    };
  }

  export default OpenAI;
}
