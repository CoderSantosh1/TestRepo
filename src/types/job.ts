export interface Job {
    _id: string;
    title: string;
    description: string;
    applyJob: string;
    organization: string;
    location: string;
    category: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    salary: string;
    totalVacancy: string;
    requirements: string;
    applicationDeadline: string;
  applicationBeginDate?: string;
  lastDateApplyOnline?: string;
  formCompleteLastDate?: string;
  correctionDate?: string;
  examDate?: string;
  admitCardDate?: string;
  applicationFeeGeneral?: string;
  applicationFeeSCST?: string;
  paymentMethod?: string;
  }