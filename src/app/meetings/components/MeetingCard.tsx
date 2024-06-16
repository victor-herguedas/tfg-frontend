import Image from "next/image";
import { getRelativeDateService } from "@/utils/relativeDateService";
import styles from "./MeetingCard.module.css"

interface Props {
    title: string
    shortDescription: string
    meetingDate: Date
    imageUrl?: string
}

export default function MeetingCard({ title, shortDescription, meetingDate, imageUrl = "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" }: Props) {
    const relativeMeetingDate = getRelativeDateService(meetingDate)
    const width = "375px"
    const height = "500px"
    const imageWidth = 350
    const imageHeight = imageWidth * (9 / 16)

    return (
        <div
            style={{ maxWidth: width, width: width, height: height, maxHeight: height }}
            className={`flex flex-col bg-secondaryBackground my-4 mx-2 rounded-lg border-white border-2 ${styles.meetingCard} hover:cursor-pointer hover:bg-neutral-800`}>
            <div
                style={{ maxWidth: imageWidth, maxHeight: "90px", minHeight: "90px" }}
                className="text-xl mx-auto mt-2 overflow-hidden text-center flex items-center uppercase"
            >
                <h2 className="">{title}</h2>
            </div>
            <Image className="mx-auto mt-2"
                alt={shortDescription}
                width={imageWidth}
                height={imageHeight}
                src={imageUrl} />
            <div
                style={{ width: imageWidth, maxHeight: "150px", minHeight: "150px"}}
                className="overflow-hidden m-3 text-sm">
                <p className="">{shortDescription} this is so good
                    notice for you men
                </p>
                <p className="">{shortDescription} This is so good for you guys letsd  nasdjasdja dsd. Me gusta mucho salir de la empresa y ver todas las cosas que he hecho en el día. LOLO</p>
            </div>
            <div
                style={{ width: imageWidth, height: "20px"}}
                className="mx-auto flex justify-end items-end text-primary-200"
            >
                <p> {relativeMeetingDate}</p>
            </div>
        </div>
    )
}