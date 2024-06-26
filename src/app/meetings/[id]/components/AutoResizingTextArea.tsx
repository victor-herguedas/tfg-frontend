import React, { useLayoutEffect, useRef } from "react";

interface Props {
    className: string;
    styles: React.CSSProperties | undefined
    value: string;
    setValue: (value: string) => void;
}

export default function AutoResizingTextArea({ className, value, setValue, styles }: Props) {
    const textbox = useRef<HTMLTextAreaElement | null>(null);

    function adjustHeight() {
        if (textbox.current === null) return;

        if (textbox.current.scrollHeight <= 40) {
            textbox.current.style.height = "30px";
            return;
        }
        textbox.current.style.height = "inherit";
        textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }

    useLayoutEffect(adjustHeight, []);

    function handleKeyDown(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
        adjustHeight();
    }

    return (
        <textarea
            className={`${className}`}
            ref={textbox}
            onChange={handleKeyDown}
            value={value}
            style={{
                ...styles,
                resize: "none"
            }}
        />
    );
}
