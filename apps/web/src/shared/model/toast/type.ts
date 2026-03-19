export type ToastType = 'default' | 'success' | 'error' | 'loading';

export interface ToastClassNames {
  viewport?: string;
}

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  createdAt: number;
  icon?: React.ReactNode;
  classNames?: ToastClassNames;
}

export interface ToastOptions {
  duration?: number;
  icon?: React.ReactNode;
  classNames?: ToastClassNames;
}
