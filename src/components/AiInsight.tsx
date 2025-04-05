import { useState } from 'react';

import { Button } from '@/components/ui/button';

const AiInsight = () => {
  const [insight, setInsight] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInsight = () => {
    setIsGenerating(true);

    const insights = [
      'AI models like GPT-4 are trained on trillions of parameters, allowing them to generate human-like text.',
      'Computer vision can now identify objects in images with greater accuracy than humans in many cases.',
      'Generative adversarial networks (GANs) consist of two neural networks competing against each other to create realistic content.',
      'Transformer architecture revolutionized NLP by enabling models to process words in relation to all other words in a sentence.',
      'Reinforcement learning from human feedback (RLHF) helps align AI systems with human values and preferences.',
      'Multi-modal AI can process and generate content across different formats like text, images, and audio simultaneously.',
      'Foundation models are trained on broad data and can be fine-tuned for specific applications, reducing the need for task-specific training.',
      'AI systems still struggle with common sense reasoning and understanding causality compared to humans.',
    ];

    setTimeout(() => {
      setInsight(insights[Math.floor(Math.random() * insights.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-gray-800'>
          AI Insight Generator
        </h2>
        <Button
          onClick={generateInsight}
          disabled={isGenerating}
          variant='outline'
        >
          {isGenerating ? (
            <>
              <span className='animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full'></span>
              Generating...
            </>
          ) : (
            'Generate Insight'
          )}
        </Button>
      </div>

      {insight ? (
        <div className='p-4 bg-purple-50 border border-purple-100 rounded-md animate-fadeIn'>
          <p className='text-gray-700'>
            <span className='text-2xl mr-2'>💡</span>
            {insight}
          </p>
        </div>
      ) : (
        <div className='p-4 bg-gray-50 border border-gray-100 rounded-md text-center text-gray-500'>
          Click the button to generate an AI insight
        </div>
      )}
    </div>
  );
};

export default AiInsight;
