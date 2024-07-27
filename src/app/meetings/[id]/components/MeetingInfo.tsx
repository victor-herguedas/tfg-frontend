import { Meeting, Todo, TodosState, TranscriptionState } from "@/domain/models/Meeting";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TodosComponent from "./Todos";
import TranscriptionComponent from "./Transcription";

interface Props {
    setMeeting: (meeting: Meeting) => void
    meeting: Meeting
}

export default function MeetingInfo({ meeting, setMeeting }: Props) {

    const { transcription, transcriptionState, todos } = meeting
    const setTodos = (todos: Todo[]) => {
        setMeeting({
            ...meeting,
            todos: todos
        })
    }

    return (
        <>
            <Tabs colorScheme="blue">
                <TabList>
                    <Tab>Transcription</Tab>
                    <Tab>To-do List</Tab>
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
