import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const toastWithTime = (type: ToastType, message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const options = {
        description: timestamp,
    };
    toast[type](message, options);
};
