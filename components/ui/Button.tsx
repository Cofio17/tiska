import { ButtonPropsType } from "@/types/ui";
export default function Button({ type, className, onClick, ariaHidden, children }: ButtonPropsType) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-1 py-1 standard-transition-300 ${className}`}
            aria-hidden={ariaHidden}
        >
            {children}
        </button>
    );
}
