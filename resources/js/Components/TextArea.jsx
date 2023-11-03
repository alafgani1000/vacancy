export default function TextArea({
    readonly = false,
    type = "text",
    className = "",
    isFocused = false,
    ...props
}) {
    return (
        <textarea
            {...props}
            type={type}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            readOnly={readonly}
        ></textarea>
    );
}
