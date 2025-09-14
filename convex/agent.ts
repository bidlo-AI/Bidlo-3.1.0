import { components } from './_generated/api';
import { Agent, createThread } from '@convex-dev/agent';
import { openai } from '@ai-sdk/openai';
import { action } from './_generated/server';
import { v } from 'convex/values';

//! AGENTS
// Onboarding Agent - (limited orchistration agent)
// Orchestration Agent - (responsible for coordinating the work of other agents)
// UI Agent - (responsible for interacting with the UI)

export const agent = new Agent(components.agent, {
  name: 'My test Agent',
  languageModel: openai.chat('gpt-4o-mini'),
});

export const helloWorld = action({
  args: { prompt: v.string() },
  handler: async (ctx, { prompt }) => {
    const user = await ctx.auth.getUserIdentity();
    const userId = user?.subject;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const threadId = await createThread(ctx, components.agent, {
      userId,
      title: 'My first thread',
      summary: 'This is a summary of the first thread',
    });
    const result = await agent.generateText(ctx, { threadId }, { prompt });
    return result.text;
  },
});

export const generateReplyToPrompt = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    //! TODO: await authorizeThreadAccess(ctx, threadId);
    const result = await agent.generateText(ctx, { threadId }, { prompt });
    return result.text;
  },
});
