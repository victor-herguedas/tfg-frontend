'use client'
import CreateMeetingCard from "./components/CreateMeetingCard";
import MeetingCard from "./components/MeetingCard";
import LoadingMeetingPlaceholderCard from "./components/LoadingMeetingPlaceHolderCard";
import { useGetMeetingsRepository } from "@/adapters/repositorys/meetingsRepository";
import SearchBar from "./components/SearchBar";
import { useState } from "react";


export default function Home() {
    const [name, setName] = useState<string>("")
    const { meetingsSumarized, loading, error } = useGetMeetingsRepository({name})

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