export enum TranscriptionState {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export class MeetingSummarized {
    constructor(
        public id: string,
        public createdAt: Date,
        public meetingDate: Date,
        public name: string,
        public transcriptionState: string,
    ) { }
}