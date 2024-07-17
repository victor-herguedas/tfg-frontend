import { SummaryState, TranscriptionState } from "@/domain/models/Meeting";
import { Button, Skeleton, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

interface Props {
    transcription: string | null
    transcriptionState: TranscriptionState
    summary: string | null
    summaryState: SummaryState
}

export default function MeetingInfo({ transcription, transcriptionState, summary, summaryState }: Props) {
    return (
        <>
            <Tabs colorScheme="blue">
                <TabList>
                    <Tab>Transcription</Tab>
                    <Tab>Summary</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <TranscriptionComponent transcription={transcription} transcriptionState={transcriptionState} />
                    </TabPanel>
                    <TabPanel>
                        <SummaryComponent summary={summary} summaryState={summaryState} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

interface SummaryComponentProps {
    summary: string | null
    summaryState: SummaryState
}

const SummaryComponent = ({ summary, summaryState }: SummaryComponentProps) => {
    if (summaryState === SummaryState.FAILED) {
        return <p>Failed to create a summary for this meeting</p>
    } else if (summaryState === SummaryState.COMPLETED) {
        return <p>{summary}</p>
    } else if (summaryState === SummaryState.IN_PROGRESS) {
        return <div className="w-full flex justify-center mt-6">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size={"xl"}
                className={"w-12 h-12"}
            />
        </div>
    } else if (summaryState === SummaryState.WAITING) {
        return <Button
            className="w-full mt-6"
        >Generate a summmary</Button>
    }
}

interface TranscriptionComponentProps {
    transcription: string | null
    transcriptionState: TranscriptionState
}

const TranscriptionComponent = ({ transcription, transcriptionState }: TranscriptionComponentProps) => {
    if (transcriptionState === TranscriptionState.FAILED) {
        return <p>Failed to create a summary for this meeting</p>
    } else if (transcriptionState === TranscriptionState.COMPLETED) {
        return <p>{transcription}</p>
    } else if (transcriptionState === TranscriptionState.IN_PROGRESS) {
        return <div className="w-full">
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        </div>
    }
}
