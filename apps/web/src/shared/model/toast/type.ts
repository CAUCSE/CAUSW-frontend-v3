export type ToastType = 'default' | 'success' | 'error' | 'loading';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  createdAt: number;
  icon?: React.ReactNode;
}

export interface ToastOptions {
  duration?: number;
  icon?: React.ReactNode;
}
