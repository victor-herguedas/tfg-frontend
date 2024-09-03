import { Meeting, Todo, TodosState } from "@/domain/models/Meeting";
import { Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TodosComponent from "./Todos";
import TranscriptionComponent from "./Transcription";
import { useRef, useState } from "react";
import { useUpdateTodos } from "@/adapters/repositorys/todosRepository";

interface Props {
    setMeeting: (meeting: Meeting) => void
    meeting: Meeting
}

export default function MeetingInfo({ meeting, setMeeting }: Props) {
    const { transcription, transcriptionState, todos } = meeting
    const { saveTodos, areSaved: areTodosSaved, loading: areTodosLoading, error: todosError } = useUpdateTodos()

    const setTodos = (todos: Todo[]) => {
        setMeeting({
            ...meeting,
            todos: todos
        })
        saveTodos(todos, meeting.id)
    }


    let todosState: any = ""

    if (meeting.todosState === TodosState.COMPLETED) {
        if (todosError == null) {
            if (areTodosSaved && !areTodosLoading) {
                todosState = "✅"
            } else {
                todosState = <div className="ml-2"><Spinner width={4} height={4}></Spinner></div>
            }
        } else {
            todosState = "❌"
        }
    } else if (meeting.todosState === TodosState.IN_PROGRESS || meeting.todosState === TodosState.WAITING) {
        todosState = <div className="ml-2"><Spinner width={4} height={4}></Spinner></div>
    } else if (meeting.todosState === TodosState.FAILED) {
        todosState = "❌"
    }

    return (
        <>
            <Tabs colorScheme="blue">
                <TabList>
                    <Tab>Transcription</Tab>
                    <Tab>To-do List {todosState} </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <TranscriptionComponent transcription={transcription} transcriptionState={transcriptionState} />
                    </TabPanel>
                    <TabPanel>
                        {
                            meeting.todosState === TodosState.COMPLETED &&
                            <TodosComponent todos={todos} setTodos={setTodos} />
                        }
                        {
                            (meeting.todosState === TodosState.IN_PROGRESS || meeting.todosState === TodosState.WAITING) &&
                            <div className="flex flex-row">
                                <div className="text-white">Loading todos...</div>
                                <div className="ml-2"><Spinner width={4} height={4}></Spinner></div>
                            </div>
                        }
                        {
                            meeting.todosState === TodosState.FAILED &&
                            <div className="text-white">Failed to load todos "❌"</div>
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
