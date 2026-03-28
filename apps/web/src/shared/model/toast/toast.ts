import { toastStore } from './store';
import { ToastOptions } from './type';

export const toastRoot = (message: string, options?: ToastOptions) =>
  toastStore.dispatch(message, 'default', options);

export const toast = Object.assign(toastRoot, {
  success: (message: string, options?: ToastOptions) =>
    toastStore.dispatch(message, 'success', options),

  error: (message: string, options?: ToastOptions) =>
    toastStore.dispatch(message, 'error', options),

  loading: (message: string, options?: ToastOptions) =>
    toastStore.dispatch(message, 'loading', options),

  dismiss: toastStore.dismiss,
});
