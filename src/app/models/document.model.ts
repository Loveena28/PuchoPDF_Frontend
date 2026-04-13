export interface DocumentModel {
  id: string;
  name: string;
  page_count: number;
  chunk_count: number;
}

export interface Source {
  page: number;
  excerpt: string;
}

export interface AnswerResponse {
  question: string;
  answer: string;
  sources: Source[];
}
