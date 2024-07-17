'use client'
import CreateMeetingCard from "./components/CreateMeetingCard";
import MeetingCard from "./components/MeetingCard";
import LoadingMeetingPlaceholderCard from "./components/LoadingMeetingPlaceHolderCard";
import { useGetMeetingsRepository } from "@/adapters/repositorys/meetingsRepository";
import SearchBar from "./components/SearchBar";
import { useState } from "react";


export default function Home() {
    const [name, setName] = useState<string>("")
    const { meetings, loading, error } = useGetMeetingsRepository({name})

    return (
        <div className="text-white">
            <div className="py-5">
                <SearchBar name={name} setName={setName}/>
            </div>
            <div className="flex justify-center flex-wrap">
                {
                    error !== null ? <div className="text-white">Error: {error.message}</div> : null
                }
                {
                    loading ? <LoadingMeetingPlaceholderCard /> :
                        meetings.map((meetings) => {
                            return (
                                <MeetingCard key={meetings.id}
                                    id={meetings.id}
                                    title={meetings.name}
                                    meetingDate={new Date(meetings.meetingDate)}
                                    summary={meetings.summary ?? "No description"}
                                    imageUrl={meetings.imageUrl}
                                />
                            )
                        })
                }
                <CreateMeetingCard />
            </div>
        </div>
    )
}