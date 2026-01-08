'use client';
import { useRegisterActions } from 'kbar';

// Hook to register an action for opening the AI chat
const useAIChat = () => {
  // Function to trigger the AI chat button click
  const openAIChat = () => {
    // Find the button with aria-label="Open Chat"
    const button = document.querySelector('button[aria-label="Open Chat"]');
    if (button instanceof HTMLButtonElement) {
      button.click(); // Safe to call click() on HTMLButtonElement
    } else {
      console.warn('AI Chat button not found or is not a button element');
    }
  };

  // Define the KBar action for opening the AI chat
  const chatAction = [
    {
      id: 'openAIChat',
      name: 'Open AI Chat',
      shortcut: ['c', 'c'],
      section: 'AI Chat',
      perform: openAIChat
    }
  ];

  useRegisterActions(chatAction);
};

export default useAIChat;
