type ButtonPropsType = {
 type: 'submit' | 'reset' | 'button';
 className?: string;
 onClick: () => void;
 ariaHidden: boolean;
 children: React.ReactNode;
};

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
 