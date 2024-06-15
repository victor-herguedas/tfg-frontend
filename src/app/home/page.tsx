'use client'
import { useMeetingsRepository } from "@/adapters/repositorys/meetingsSummarizedRepository";
import CreateMeetingCard from "./components/CreateMeetingCard";
import MeetingCard from "./components/MeetingCard";
import CreateMeetingPopUp from "./components/CreateMeetingPopUp";

export default function Home() {
    const { meetingsSumarized, loading, error } = useMeetingsRepository()
    return (
        <div>
            <div className="flex justify-around flex-wrap">
                {
                    meetingsSumarized.map((meetingSumarized, index) => {
                        return (
                                <MeetingCard key={index}
                                    title={meetingSumarized.name}
                                    meetingDate={new Date(meetingSumarized.meetingDate)}
                                    shortDescription={"meetingSumarized.shortDescription"}
                                />
                        )
                    })
                    }
                <CreateMeetingCard />
            </div>
        </div>
    )
}