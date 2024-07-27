import { Todo } from "@/domain/models/Meeting";
import { useEffect, useRef } from "react";

interface Props {
    todo: Todo;
    setTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
    focusOnRender?: boolean;
    stopFocusOnRender?: () => void;
}

export default function TodoComponent({
    todo,
    setTodo,
    deleteTodo,
    focusOnRender,
    stopFocusOnRender,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const cursorPosition = useRef<number | null>(null);

    useEffect(() => {
        if (focusOnRender && ref.current) {
            const input = ref.current;
            input.focus();

            // Move cursor to the end of the text when the component is first rendered
            setCaretPosition(input, input.textContent?.length || 0);

            if (stopFocusOnRender) stopFocusOnRender();
        }
    }, [focusOnRender, ref]);

    const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            done: !todo.done,
        });
    }

    const setCaretPosition = (element: HTMLDivElement, position: number) => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.setStart(element.firstChild || element, position);
        range.collapse(true);

        selection?.removeAllRanges();
        selection?.addRange(range);
    };

    const getCaretPosition = (element: HTMLDivElement) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return 0;

        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);

        return preCaretRange.toString().length;
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.textContent || "";

        // Store the cursor position before updating the state
        if (ref.current) {
            cursorPosition.current = getCaretPosition(ref.current);
        }

        setTodo({
            ...todo,
            todo: newContent,
        });
    };

    useEffect(() => {
        if (ref.current && cursorPosition.current !== null) {
            // Restore the cursor position after the state updates
            setCaretPosition(ref.current, cursorPosition.current);
        }
    }, [todo.todo]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Backspace" && todo.todo === "") {
            e.preventDefault();
            deleteTodo(todo.id);
        }
    };

    return (
        <div className="flex justify-start items-start gap-4">
            <div className="">
                <input
                    className="hover:cursor-pointer"
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleChangeState}
                />
            </div>
            <div
                ref={ref}
                className="bg-black text-white w-full block p-0 text-wrap focus:outline-none"
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning={true}
            >
                {todo.todo}
            </div>
        </div>
    );
}
