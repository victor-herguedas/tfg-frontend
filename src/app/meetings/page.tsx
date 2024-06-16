'use client'
import CreateMeetingCard from "./components/CreateMeetingCard";
import MeetingCard from "./components/MeetingCard";
import LoadingMeetingPlaceholderCard from "./components/LoadingMeetingPlaceHolderCard";
import { useGetMeetingsRepository } from "@/adapters/repositorys/meetingsRepository";


export default function Home() {
    const { meetingsSumarized, loading, error } = useGetMeetingsRepository()
    return (
        <div className="text-white">
            <div className="flex justify-center flex-wrap">
                {
                    loading ? <LoadingMeetingPlaceholderCard/> :
                    meetingsSumarized.map((meetingSumarized) => {
                        return (
                            <MeetingCard key={meetingSumarized.id}
                                id={meetingSumarized.id}
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