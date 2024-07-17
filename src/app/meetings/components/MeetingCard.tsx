import Image from "next/image";
import { getRelativeDateService } from "@/utilities/relativeDateService";
import styles from "./MeetingCard.module.css"
import { useRouter } from "next/navigation";
import { MEETING_ROUTE } from "@/utilities/localRoutes";
import ImageWithLoader from "@/components/ImageWithLoader";

interface Props {
    id: string
    title: string
    summary: string
    meetingDate: Date
    imageUrl: string | undefined | null
}

export default function MeetingCard({ id ,title, summary, meetingDate, imageUrl = "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" }: Props) {
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
            className={`flex flex-col bg-secondaryBackground my-4 mx-2 rounded-lg border-white border-2 ${styles.meetingCard} hover:cursor-pointer hover:bg-neutral-800`}>
            <div
                style={{ maxWidth: imageWidth, maxHeight: "90px", minHeight: "90px" }}
                className="text-xl mx-auto mt-2 overflow-hidden text-center flex items-center uppercase"
            >
                <h2 className="">{title}</h2>
            </div>
            <div className="mx-auto mt-2">
                <ImageWithLoader
                    imageUrl={imageUrl}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    alt={summary}
                />
            </div>
            <div
                style={{ width: imageWidth, maxHeight: "144px", minHeight: "144px" }}
                className="overflow-hidden m-3 text-sm">
                <p className="">{summary} this is so good
                    notice for you men
                </p>
                <p className="">{summary} This is so good for you guys letsd  nasdjasdja dsd. Me gusta mucho salir de la empresa y ver todas las cosas que he hecho en el día. LOLO</p>
            </div>
            <div
                style={{ width: imageWidth, height: "20px" }}
                className="mx-auto flex justify-end items-end text-primary-200"
            >
                <p> {relativeMeetingDate}</p>
            </div>
        </div>
    )
}