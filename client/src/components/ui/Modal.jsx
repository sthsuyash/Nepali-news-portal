import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.classList.contains("modal-overlay")) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent body scroll when modal is open
            window.addEventListener("click", handleClickOutside);
        } else {
            document.body.style.overflow = "auto"; // Restore body scroll when modal is closed
            window.removeEventListener("click", handleClickOutside);
        }

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-xl">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600"><X/></button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
