import Image from "next/image";
import { getRelativeDateService } from "@/utilities/relativeDateService";
import styles from "./MeetingCard.module.css"
import { useRouter } from "next/navigation";
import { MEETING_ROUTE } from "@/utilities/localRoutes";
import ImageWithLoader from "@/components/ImageWithLoader";
import { ImageState, SummaryState } from "@/domain/models/Meeting";
import { Skeleton, Spinner, Stack } from "@chakra-ui/react";

interface Props {
    id: string
    title: string
    summary: string
    summaryState: SummaryState
    meetingDate: Date
    imageUrl: string | undefined | null
    imageState: ImageState
}

export default function MeetingCard({ id, title, summary, summaryState, meetingDate, imageUrl = "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", imageState }: Props) {
    const router = useRouter()
    const relativeMeetingDate = getRelativeDateService(meetingDate)
    const width = "375px"
    const height = "500px"
    const imageWidth = 350
    const imageHeight = imageWidth * (9 / 16)

    return (
        <div
            onClick={() => router.push(MEETING_ROUTE(id))}
            style={{ maxWidth: width, width: width, height: height, maxHeight: height }}
            className={`flex flex-col bg-secondaryBackground my-4 mx-2 rounded-lg border-white border-2 ${styles.meetingCard} hover:cursor-pointer hover:bg-neutral-800 px-4`}>
            <div
                style={{maxHeight: "90px", minHeight: "90px" }}
                className="text-xl mx-auto mt-2 overflow-hidden text-center flex items-center uppercase w-full justify-center"
            >
                <h2 className="">{title}</h2>
            </div>
            <div
                style={{ maxHeight: "200px", minHeight: "200px" }}
                className="mx-auto mt-2 block flex justify-center items-center w-full">
                {
                    imageState === ImageState.COMPLETED ?
                        <ImageWithLoader
                            imageUrl={imageUrl}
                            imageWidth={imageWidth}
                            imageHeight={imageHeight}
                            alt={""}
                        /> :
                        <>
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                                className="absolute"
                            />
                        </>

                }
            </div>
            <div
                style={{ maxHeight: "144px", minHeight: "144px" }}
                className="overflow-hidden my-3 text-sm w-full">
                {
                    summaryState === SummaryState.COMPLETED ?
                        <>
                            <p className="">{summary} this is so good
                                notice for you men
                            </p>
                        </> :
                        <>
                            <Stack>
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                            </Stack>
                        </>
                }
            </div>
            <div
                style={{ width: "100%", height: "20px" }}
                className="mx-auto flex justify-end items-end text-primary-200"
            >
                <p> {relativeMeetingDate}</p>
            </div>
        </div>
    )
}