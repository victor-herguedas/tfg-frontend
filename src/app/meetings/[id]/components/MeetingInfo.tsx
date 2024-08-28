import { Meeting, Todo } from "@/domain/models/Meeting";
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

    const todosState = todosError == null ?
        (areTodosSaved && !areTodosLoading ?
            "✅"
            :
            <div className="ml-2"><Spinner width={4} height={4}></Spinner></div>)
        :
        "❌"

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
                        <TodosComponent todos={todos} setTodos={setTodos} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
