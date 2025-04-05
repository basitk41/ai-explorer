import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

import Dashboard from '@/components/Dashboard';
import AiInsight from '@/components/AiInsight';

const ApplicationPage = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        'https://n8n.rest/webhook/78f1134c-f527-4114-9ae6-dd32f434df19/chat',
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'My name is Basit. How can I assist you today?',
      ],
      i18n: {
        // @ts-expect-error setting english language
        en: {
          title: '',
          subtitle: "Start a chat. I'm here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      },
    });
  }, []);

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl font-bold text-gray-900 mb-3'>
          Welcome to the Application
        </h1>
        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
          Explore the fascinating world of Artificial Intelligence, Generative
          AI, and Large Language Models
        </p>
      </div>

      <AiInsight />
      <Dashboard />

      <div className='mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-2/3 mb-6 md:mb-0 md:pr-6'>
            <h2 className='text-2xl font-bold mb-3'>The Future of AI</h2>
            <p className='mb-4'>
              Artificial Intelligence is rapidly evolving with new breakthroughs
              happening every day. From healthcare to creative industries, AI is
              transforming how we work and live.
            </p>
            <ul className='list-disc list-inside space-y-1 mb-4'>
              <li>Increasingly multimodal AI systems</li>
              <li>Enhanced human-AI collaboration</li>
              <li>More ethical and responsible AI development</li>
              <li>Specialized AI for industry-specific applications</li>
            </ul>
          </div>
          <div className='md:w-1/3 flex justify-center'>
            <div className='w-40 h-40 bg-white/10 rounded-full flex items-center justify-center border border-white/20 relative'>
              <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-indigo-400/20 animate-pulse'></div>
              <div className='text-6xl'>🤖</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApplicationPage;
