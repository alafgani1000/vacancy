export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `class="class="px-5 py-2 text-sm font-medium text-white inline-flex items-center bg-sky-950 hover:bg-sky-950 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-center dark:bg-sky-600 dark:hover:bg-sky-950 dark:focus:ring-blue-950" ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
