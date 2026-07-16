import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBox } from './components/SearchBox';
import { AnswerDisplay } from './components/AnswerDisplay';
import { PolicyBrowser } from './components/PolicyBrowser';
import { Tabs } from './components/Tabs';
import { Question } from './types';
import './index.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ask');

  const handleSearch = (result: Question) => {
    setCurrentQuestion(result);
    setIsLoading(false);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
  };

  const tabs = [
    { label: 'Ask a Question', id: 'ask' },
    { label: 'Browse Policies', id: 'browse' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-8">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'ask' && (
            <div className="space-y-6">
              <div className="card">
                <SearchBox 
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </div>
              <AnswerDisplay question={currentQuestion} isLoading={isLoading} />
            </div>
          )}

          {activeTab === 'browse' && (
            <PolicyBrowser />
          )}
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container py-6">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Policy Q&A System. Information sourced from official UK government websites.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
