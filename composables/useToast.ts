export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
  timeoutId?: NodeJS.Timeout;
}

const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 4000, // 4 seconds default
      ...toast,
    };

    toasts.value.push(newToast);

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, newToast.duration);

      // Store the timeout ID for potential cancellation
      const toastIndex = toasts.value.findIndex((t) => t.id === id);
      if (toastIndex > -1) {
        toasts.value[toastIndex].timeoutId = timeoutId;
      }
    }

    return id;
  };

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index > -1) {
      // Clear the timeout if it exists
      if (toasts.value[index].timeoutId) {
        clearTimeout(toasts.value[index].timeoutId);
      }
      toasts.value.splice(index, 1);
    }
  };

  const pauseToast = (id: string) => {
    const toast = toasts.value.find((t) => t.id === id);
    if (toast && toast.timeoutId) {
      clearTimeout(toast.timeoutId);
      toast.timeoutId = undefined;
    }
  };

  const resumeToast = (id: string) => {
    const toast = toasts.value.find((t) => t.id === id);
    if (toast && toast.duration && !toast.timeoutId) {
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, toast.duration);
      toast.timeoutId = timeoutId;
    }
  };

  const success = (message: string, duration?: number) => {
    return addToast({ type: "success", message, duration });
  };

  const error = (message: string, duration?: number) => {
    return addToast({ type: "error", message, duration });
  };

  const info = (message: string, duration?: number) => {
    return addToast({ type: "info", message, duration });
  };

  const warning = (message: string, duration?: number) => {
    return addToast({ type: "warning", message, duration });
  };

  return {
    toasts,
    addToast,
    removeToast,
    pauseToast,
    resumeToast,
    success,
    error,
    info,
    warning,
  };
};
