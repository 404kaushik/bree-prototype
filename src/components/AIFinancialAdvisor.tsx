import { useState } from 'react';
import { motion } from 'framer-motion';

type FinancialData = {
  currentIncome: number;
  currentExpenses: number;
  currentSavings: number;
  currentDebt: number;
  yearsToProject: number;
};

type TimelinePoint = {
  year: number;
  savings: number;
  debt: number;
  netWorth: number;
};

type AIFinancialAdvisorProps = {
  financialData: FinancialData;
  timelineData: TimelinePoint[];
  selectedScenario: string;
};

export default function AIFinancialAdvisor({
  financialData,
  timelineData,
  selectedScenario,
}: AIFinancialAdvisorProps) {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  const getAIAdvice = async () => {
    if (timelineData.length === 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          financialData,
          timelineData,
          selectedScenario,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI advice');
      }
      
      setAdvice(data.advice);
      setExpanded(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const formatAdvice = (text: string) => {
    if (!text) return [];
    
    // Split by numbered points and paragraphs
    return text.split(/\n+/).map((paragraph, index) => {
      // Check if paragraph starts with a number followed by period or colon
      const isNumbered = /^\d+[.:]/.test(paragraph.trim());
      
      return (
        <p 
          key={index} 
          className={`mb-3 ${isNumbered ? 'pl-4' : ''}`}
        >
          {paragraph}
        </p>
      );
    });
  };

  return (
    <motion.div 
      className="mt-8 border-t border-gray-200 pt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">AI Financial Advisor</h3>
        {!advice && !loading && (
          <button 
            onClick={getAIAdvice}
            className="btn-secondary text-sm px-4 py-2 flex items-center"
            disabled={loading || timelineData.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get AI Insights
          </button>
        )}
        {advice && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-primary-600 text-sm flex items-center"
          >
            {expanded ? 'Collapse' : 'Expand'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {loading && (
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mr-3"></div>
          <p className="text-gray-600">Analyzing your financial data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 rounded-lg p-4 text-red-700">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
          <p className="text-sm mt-2">Please try again later or check your API configuration.</p>
        </div>
      )}
      
      {advice && expanded && (
        <motion.div 
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-100"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start mb-4">
            <div className="bg-primary-100 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="text-gray-700">
              {formatAdvice(advice)}
            </div>
          </div>
          <div className="text-xs text-gray-500 italic">
            Powered by AI - This advice is generated based on the information you provided and should not be considered professional financial advice.
          </div>
        </motion.div>
      )}
      
      {advice && !expanded && (
        <div className="bg-gray-50 rounded-lg p-4 text-gray-600 cursor-pointer" onClick={() => setExpanded(true)}>
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Click to view AI-powered financial insights and recommendations
          </p>
        </div>
      )}
    </motion.div>
  );
}