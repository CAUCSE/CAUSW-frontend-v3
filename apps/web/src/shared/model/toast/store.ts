import { type ToastData, type ToastOptions, type ToastType } from './type';

const MAX_TOAST = 3;
const DEFAULT_DURATION = 3000;
const DEFAULT_LOADING_DURATION = 100000;

let memoryState: ToastData[] = [];
let listeners: Array<() => void> = [];

let count = 0;
const genId = () => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
};

const notify = () => listeners.forEach((l) => l());

const subscribe = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getSnapshot = () => memoryState;

const dispatch = (message: string, type: ToastType, options?: ToastOptions) => {
  const id = genId();

  const duration =
    options?.duration ??
    (type === 'loading' ? DEFAULT_LOADING_DURATION : DEFAULT_DURATION);

  const newToast: ToastData = {
    id,
    message,
    type,
    duration,
    createdAt: Date.now(),
    icon: options?.icon,
  };

  memoryState = [...memoryState, newToast].slice(-MAX_TOAST);

  notify();
  return id;
};

const dismiss = (id: string) => {
  memoryState = memoryState.filter((t) => t.id !== id);
  notify();
};

export const toastStore = {
  subscribe,
  getSnapshot,
  dispatch,
  dismiss,
};
