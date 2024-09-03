import { Todo } from "@/domain/models/Meeting";
import { useState } from "react";

interface Props {
    addTodo: (todo: string) => void
}

export default function CreateTodo({ addTodo }: Props) {
    const [value, setValue] = useState<string>("")

    const handleCreateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("")
        addTodo(e.target.value)
    }

    return (
        <div className="flex justify-start items-center gap-4">
            <label htmlFor="create-todo" className="hover:cursor-pointer">
                +
            </label>
            <input
                id="create-todo"
                className="bg-black text-white w-full block p-2 text-wrap resize-none"
                type="text"
                placeholder="List element"
                value={value}
                onChange={(e) => handleCreateTodo(e)}
            >
            </input>
        </div>
    )
}