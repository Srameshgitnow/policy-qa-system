export type { Question, Source, Policy, Answer };

interface Source {
  title: string;
  url: string;
  excerpt: string;
}

interface Question {
  id?: number;
  query: string;
  answer: string;
  confidence: number;
  sources: Source[];
  relatedPolicies: string[];
  createdAt?: string;
}

interface Answer {
  answer: string;
  confidence: number;
  sources: Source[];
  relatedPolicies: string[];
}

interface Policy {
  id: number;
  title: string;
  category: string;
  source: string;
  url: string;
  sourceDate?: string;
}
