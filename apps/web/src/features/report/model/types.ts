import { REPORT_OPTIONS } from './constants';

export type ReportReason = keyof typeof REPORT_OPTIONS;

export type ReportStep = 'select' | 'confirm' | null;
