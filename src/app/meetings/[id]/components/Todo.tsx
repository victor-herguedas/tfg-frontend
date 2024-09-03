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
    splitTodo: (oldTodoId: string, oldTodo: string, newTodo: string) => void;
    focusProps: focusProps;
    joinTodo: (id: string) => void;
    moveKeyUpDown: (id: string, direction: "UP" | "DOWN") => void;
}

export default function TodoComponent({
    todo,
    setTodo,
    deleteTodo,
    splitTodo,
    joinTodo,
    moveKeyUpDown,
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.textContent || "";

        // Guardar la posición del cursor antes de actualizar el estado
        if (ref.current) {
            cursorPosition.current = getCaretPosition(ref.current);
        }

        // Si se presiona Enter
        if (e.key === "Enter") {
            const oldTodo = newContent.slice(0, cursorPosition.current || 0);
            const newTodo = newContent.slice(cursorPosition.current || 0, newContent.length);
            e.preventDefault();
            splitTodo(todo.id, oldTodo, newTodo);
        }
        // Si se presiona Backspace y el todo está vacío
        else if (e.key === "Backspace") {
            if (cursorPosition.current === 0 && todo.todo != "") {
                e.preventDefault();
                joinTodo(todo.id);
            } else if (todo.todo === "") {
                e.preventDefault();
                deleteTodo(todo.id);
            } else {
                setTodo({
                    ...todo,
                    todo: ref.current?.textContent || "",
                });
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveKeyUpDown(todo.id, "UP");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            moveKeyUpDown(todo.id, "DOWN");
        }
        // Para cualquier otra tecla, actualiza el estado del todo
        else {
            setTodo({
                ...todo,
                todo: ref.current?.textContent || "",
            });
        }
    };

    useEffect(() => {
        if (ref.current && cursorPosition.current !== null) {
            // Restaurar la posición del cursor después de actualizar el estado
            setCaretPosition(ref.current, cursorPosition.current);
        }
    }, [todo.todo]);

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
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                suppressContentEditableWarning={true}
            >
                {todo.todo}
            </div>
            <SmallCloseIcon
                onClick={() => deleteTodo(todo.id)}
                className={`hover:cursor-pointer transition-opacity duration-300 ${isFocused ? "opacity-100" : "opacity-0"
                    }`}
            />
        </div>
    );
}
