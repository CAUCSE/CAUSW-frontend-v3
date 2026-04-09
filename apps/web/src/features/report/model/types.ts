import { type REPORT_OPTIONS } from '../config/constants';

export type ReportReason = keyof typeof REPORT_OPTIONS;

export type ReportStep = 'select' | 'confirm' | null;
