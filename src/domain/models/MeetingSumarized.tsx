import { ImageState, ShortDescriptionState, TranscriptionState } from "./Meeting";

export class MeetingSummarized {
    constructor(
        public id: string,
        public createdAt: Date,
        public meetingDate: Date,
        public name: string,
        public transcriptionState: TranscriptionState,
        public shortDescription: string | null,
        public shortDescriptionState: ShortDescriptionState,
        public imageUrl: string | null,
        public imageState: ImageState
    ) { }
}