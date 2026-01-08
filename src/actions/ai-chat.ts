'use server';

import Groq from 'groq-sdk';
import { SYSTEM_CONTEXT, MODEL_NAME } from '@/constants/assistant-config';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function sendMessage(userMessages: ChatMessage[]) {
  if (!userMessages || userMessages.length === 0) {
    return { error: 'Messages are required' };
  }

  try {
    const res = await groq.chat.completions.create({
      model: MODEL_NAME,
      messages: [{ role: 'system', content: SYSTEM_CONTEXT }, ...userMessages]
    });

    return { content: res.choices[0]?.message?.content || '' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch AI response' };
  }
}
