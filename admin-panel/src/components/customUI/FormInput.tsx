import { Input } from "@/components/ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const FormInput: React.FC<FormInputProps> = ({ icon: Icon, placeholder, ...props }) => {
    return (
        <div className="relative mb-6 ring-2 ring-red-300 rounded-md focus:ring-red-500 focus-within:ring-red-500">
            {/* Icon container */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                {/* Render the passed icon */}
                <Icon className="w-5 h-5 text-red-500" />
            </div>
            {/* Input field */}
            <Input
                {...props}
                placeholder={placeholder} // Ensure placeholder is passed correctly
                className="pl-12" // Add padding to the left to avoid overlap with the icon
            />
        </div>
    );
};

export default FormInput;
