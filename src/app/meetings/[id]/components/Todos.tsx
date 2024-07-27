import { Todo } from "@/domain/models/Meeting"
import TodoComponent from "./Todo"
import CreateTodo from "./CreateTodo"
import { useEffect, useRef, useState } from "react"

export interface Props {
    todos: Todo[]
    setTodos: (todos: Todo[]) => void
}

export default function TodosComponent({ todos, setTodos }: Props) {
    const [newTodoId, setNewTodoId] = useState<string>("")
    // const [todo, setTodo] = useState<Todo>({
    //     id: "1",
    //     todo: "Test",
    //     done: false
    // })

    const resetNewTodoId = () => {
        setNewTodoId("")
    }

    const setTodo = (todo: Todo) => {
        const newTodos = todos.map(t => {
            if (t.id === todo.id) {
                return todo
            }
            return t
        })
        setTodos(newTodos)
    }

    const addTodo = (todo: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            todo,
            done: false
        }
        setNewTodoId(newTodo.id)
        setTodos([...todos, newTodo])
    }

    const deleteTodo = (id: string) => {
        const index = todos.findIndex(todo => todo.id === id)
        if (index === -1) return
        const newTodos = todos.filter(todo => todo.id !== id)
        if (index === 0) {
            setNewTodoId(newTodos[index].id)
        } else {
            setNewTodoId(newTodos[index-1].id)
        }
        setTodos(newTodos)
    }

    return (
        <>
            <button></button>
            <div>
                {todos.map(todo => (
                    <div key={todo.id}>
                        <TodoComponent todo={todo} setTodo={setTodo} deleteTodo={deleteTodo} focusOnRender={newTodoId === todo.id} stopFocusOnRender={resetNewTodoId}/>
                    </div>
                ))}
                {/* <TodoComponent todo={todo} setTodo={setTodo} deleteTodo={deleteTodo} focusOnRender={newTodoId === todo.id} stopFocusOnRender={resetNewTodoId}/> */}
            </div>
            <div>
                <CreateTodo addTodo={addTodo} />
            </div>
        </>
    )
}
