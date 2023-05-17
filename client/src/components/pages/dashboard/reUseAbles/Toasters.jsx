import { toast } from "react-toastify";



export const Toaster = (type, msg) => {

    switch (type) {
        case 'loading':
            toast.loading(`${msg}`, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true
            });
            break;
        case 'success':
            toast.dismiss();
            toast.success(`${msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true
            });
            break;
        case 'error':
            toast.dismiss();
            toast.error(`${msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true
            });
            break;
        case 'warn':
            toast.dismiss();
            toast.error(`${msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true
            });
            break;

        default:
            break;
    }








}