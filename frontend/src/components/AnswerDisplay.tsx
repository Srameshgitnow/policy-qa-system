import React from 'react';
import { Question, Source } from '../types';

interface AnswerDisplayProps {
  question: Question | null;
  isLoading?: boolean;
}

export const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ question, isLoading = false }) => {
  if (!question && !isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Ask a question to get started</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {question && (
        <>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Question</h2>
            <p className="text-gray-700">{question.query}</p>
          </div>

          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Answer</h2>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Confidence</p>
                  <p className="text-2xl font-bold text-blue-600">{question.confidence}%</p>
                </div>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{question.answer}</p>
          </div>

          {question.sources && question.sources.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Sources</h3>
              <div className="space-y-3">
                {question.sources.map((source: Source, idx: number) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-blue-600">
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.title} →
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{source.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.relatedPolicies && question.relatedPolicies.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-2">
                {question.relatedPolicies.map((policy: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {policy}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">Was this answer helpful?</p>
            <div className="flex gap-2">
              <button className="button-secondary">👍 Yes</button>
              <button className="button-secondary">👎 No</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
