import { Todo } from "@/domain/models/Meeting";
import { KeyboardEvent, RefObject, useEffect, useRef, useState } from "react";

interface Props {
    addTodo: (todo: string) => void
    setFocus: boolean,
    moveKeyUpDown: (id: string, direction: "UP" | "DOWN") => void;
}

export default function CreateTodo({ addTodo, setFocus, moveKeyUpDown }: Props) {
    const [value, setValue] = useState<string>("")
    const handleCreateTodo = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            moveKeyUpDown("CREATE_TODO", "UP");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            moveKeyUpDown("CREATE_TODO", "DOWN");
        } else {
            const value = e.currentTarget.value
            addTodo(value)
            setValue("")
        }

    }

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (setFocus && ref.current) {
            const input = ref.current;
            input.focus();
        }
    }, [setFocus, ref]);

    return (
        <div className="flex justify-start items-center gap-4">
            <label htmlFor="create-todo" className="hover:cursor-pointer">
                +
            </label>
            <input
                ref={ref}
                id="create-todo"
                className="bg-black text-white w-full block p-2 text-wrap resize-none"
                type="text"
                placeholder="List element"
                value={value}
                onKeyDown={(e) => { handleCreateTodo(e) }}
            >
            </input>
        </div>
    )
}