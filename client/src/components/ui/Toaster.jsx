import { toast } from 'sonner';

export const toastWithTime = (type, message) => {
    const timestamp = new Date().toLocaleTimeString();
    const options = {
        description: timestamp,
    };
    toast[type](message, options);
};
