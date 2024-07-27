import { Todo } from "@/domain/models/Meeting";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";

interface focusProps {
    focusOnRender: boolean;
    stopFocusOnRender: () => void;
    cursorPosition: "START" | "END";
}

interface Props {
    todo: Todo;
    setTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
    splitTodo: (oldTodoId: string, oldTodo: string, newTodo: string ) => void;
    focusProps: focusProps;
}

export default function TodoComponent({
    todo,
    setTodo,
    deleteTodo,
    splitTodo,
    focusProps: { focusOnRender, stopFocusOnRender, cursorPosition: cursorStartPosition },
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const cursorPosition = useRef<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (focusOnRender && ref.current) {
            const input = ref.current;
            input.focus();

            if (cursorStartPosition === "START") setCaretPosition(input, 0);
            if (cursorStartPosition === "END") setCaretPosition(input, input.textContent?.length || 0);

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
        if (e.key === "Enter") {
            if (ref.current) {
                cursorPosition.current = getCaretPosition(ref.current);
            }
            // Separate the text in 2 by cursor position and create a new todo with the second part
            const newContent = e.currentTarget.textContent || "";
            const oldTodo = newContent.slice(0, cursorPosition.current || 0);
            const newTodo = newContent.slice(cursorPosition.current || 0, newContent.length);
            e.preventDefault();
            splitTodo(todo.id, oldTodo, newTodo);
        }

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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                suppressContentEditableWarning={true}
            >
                {todo.todo}
            </div>
            {/* Icono de cerrar, visible solo cuando el div está enfocado */}
            <SmallCloseIcon
                onClick={() => deleteTodo(todo.id)}
                className={`hover:cursor-pointer transition-opacity duration-300 ${isFocused ? "opacity-100" : "opacity-0"
                    }`}
            />
        </div>
    );
}
