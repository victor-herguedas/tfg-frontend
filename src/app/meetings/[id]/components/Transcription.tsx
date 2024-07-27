import { TranscriptionState } from "@/domain/models/Meeting"
import { Skeleton, Stack } from "@chakra-ui/react"

interface Props {
    transcription: string | null
    transcriptionState: TranscriptionState
}

export default function TranscriptionComponent({ transcription, transcriptionState }: Props) {
    if (transcriptionState === TranscriptionState.FAILED) {
        return <p>Failed to create a summary for this meeting</p>
    } else if (transcriptionState === TranscriptionState.COMPLETED) {
        return <p>{transcription}</p>
    } else if (transcriptionState === TranscriptionState.IN_PROGRESS) {
        return <div 
        style={{height: "200px"}}
        className="w-full">
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        </div>
    }
}