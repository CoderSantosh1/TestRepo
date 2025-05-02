export interface Result {
  _id: string;
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  downloadLink: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  attachments?: string[];
}