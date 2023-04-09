import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', isTextArea = false, className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (!isTextArea ?
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    'border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />
        </div> :
        <textarea
            {...props}
            className={
                'border-gray-300 focus:border-primary-primary shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
