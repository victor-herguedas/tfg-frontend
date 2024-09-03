import { Todo } from "@/domain/models/Meeting"
import TodoComponent from "./Todo"
import CreateTodo from "./CreateTodo"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export interface Props {
    todos: Todo[]
    setTodos: (todos: Todo[]) => void
}

interface FocusConfigInterface {
    todoFocusId: string
    cursorPosition: "START" | "END"
}

export default function TodosComponent({ todos, setTodos }: Props) {
    const [focusConfig, setFocusConfig] = useState<FocusConfigInterface>({
        todoFocusId: "CREATE_TODO",
        cursorPosition: "END"
    })

    const resetNewTodoId = () => {
        setFocusConfig({
            todoFocusId: "",
            cursorPosition: "END"
        })
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

    const addTodo = (todo: string, focusBegining?: boolean) => {
        const newTodo: Todo = {
            id: uuidv4(),
            todo,
            done: false
        }
        setFocusConfig({
            todoFocusId: newTodo.id,
            cursorPosition: focusBegining ? "START" : "END"
        })
        setTodos([...todos, newTodo])
    }

    const splitTodo = (oldTodoId: string, oldTodo: string, newTodo: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === oldTodoId) {
                return {
                    ...todo,
                    todo: oldTodo
                }
            }
            return todo
        }
        )
        const index = todos.findIndex(todo => todo.id === oldTodoId)
        // Añadimos el nuevo todo en la posición siguiente al todo original
        const newTodoId = uuidv4()
        newTodos.splice(index + 1, 0, {
            id: newTodoId,
            todo: newTodo,
            done: false
        })
        setTodos(newTodos)
        setFocusConfig({
            todoFocusId: newTodoId,
            cursorPosition: "START"
        })
    }

    const deleteTodo = (id: string) => {
        const index = todos.findIndex(todo => todo.id === id)
        if (index === -1) return
        const newTodos = todos.filter(todo => todo.id !== id)
        if (index === 0) {
            setFocusConfig(
                {
                    todoFocusId: newTodos[index].id,
                    cursorPosition: "END"
                }
            )
        } else {
            setFocusConfig(
                {
                    todoFocusId: newTodos[index - 1].id,
                    cursorPosition: "END"
                }
            )
        }
        setTodos(newTodos)
    }

    const joinTodo = (id: string) => {
        const index = todos.findIndex(todo => todo.id === id)
        if (index === 0) return
        const value = todos[index].todo
        const newTodos = todos.map((todo, i) => {
            if (i === index - 1) {
                return {
                    ...todo,
                    todo: todo.todo + value
                }
            }
            if (i === index) {
                return null
            }
            return todo
        }).filter(todo => todo !== null) as Todo[]
        setFocusConfig(
            {
                todoFocusId: newTodos[index - 1].id,
                cursorPosition: "END"
            }
        )
        setTodos(newTodos)
    }

    // moveKeyUpDown: (id: string, direction: "UP" | "DOWN") => void;

    // Should move the focused todo up or down
    const moveKeyUpDown = (id: string, direction: "UP" | "DOWN") => {
        if (id === "CREATE_TODO") {
            if (direction === "UP") {
                setFocusConfig(
                    {
                        todoFocusId: todos[todos.length - 1].id,
                        cursorPosition: "END"
                    }
                )
            } else if (direction === "DOWN") {
                setFocusConfig(
                    {
                        todoFocusId: todos[0].id,
                        cursorPosition: "END"
                    }
                )
            }
            return
        }
        const index = todos.findIndex(todo => todo.id === id)
        if (index === -1 ) return
        if (direction === "UP") {
            if (index === 0) {
                setFocusConfig(
                    {
                        todoFocusId: "CREATE_TODO",
                        cursorPosition: "END"
                    }
                )
            } else {
                setFocusConfig(
                    {
                        todoFocusId: todos[index - 1].id,
                        cursorPosition: "END"
                    }
                )
            }
        } else if (direction === "DOWN") {
            if (index === todos.length - 1) {
                setFocusConfig(
                    {
                        todoFocusId: "CREATE_TODO",
                        cursorPosition: "END"
                    }
                )
                return
            } else {
                setFocusConfig(
                    {
                        todoFocusId: todos[index + 1].id,
                        cursorPosition: "END"
                    }
                )
            }
        }

    }

    return (
        <>
            <div>
                {todos.map(todo => (
                    <div key={todo.id}>
                        <TodoComponent
                            moveKeyUpDown={moveKeyUpDown}
                            todo={todo}
                            setTodo={setTodo}
                            deleteTodo={deleteTodo}
                            focusProps={{
                                focusOnRender: focusConfig.todoFocusId === todo.id,
                                stopFocusOnRender: resetNewTodoId,
                                cursorPosition: focusConfig.cursorPosition
                            }}
                            joinTodo={joinTodo}
                            splitTodo={splitTodo} />
                    </div>
                ))}
                {/* <TodoComponent todo={todo} setTodo={setTodo} deleteTodo={deleteTodo} focusOnRender={newTodoId === todo.id} stopFocusOnRender={resetNewTodoId}/> */}
            </div>
            <div>
                <CreateTodo
                    moveKeyUpDown={moveKeyUpDown}
                    addTodo={addTodo} setFocus={focusConfig.todoFocusId == "CREATE_TODO"} />
            </div>
        </>
    )
}
