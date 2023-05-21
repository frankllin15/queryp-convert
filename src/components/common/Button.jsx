export const Button = ({ children, onClick, className, type="", variant="primary", title="" }) => {
    const variants = {
        primary: {
            bg: "bg-blue-500 hover:bg-blue-700",
            text: "text-white",
        },
        danger: {
            bg: "bg-red-500 hover:bg-red-700",
            text: "text-white",
        }
    }
    
    return (
        <button
            title={title}
            type={type}
            onClick={onClick}
            className={`border rounded-md py-1 px-2 text-sm ${variants[variant].bg} ${variants[variant].text} transition-colors duration-300 ease-in-out ${className}`}
            >
            {children}
        </button>
    );
}