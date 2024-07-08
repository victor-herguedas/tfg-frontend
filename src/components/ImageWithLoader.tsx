'use client'
import { Spinner } from "@chakra-ui/react"
import Image from "next/image"
import { ReactElement, use, useEffect, useState } from "react"

interface ImageComponentProps {
    imageUrl: string | null | undefined
    imageWidth: number
    imageHeight: number
    alt: string
}

export default function ImageWithLoader({ imageUrl, imageWidth, imageHeight, alt }: ImageComponentProps): ReactElement {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    return (
        <div className="flex justify-center items-center relative m-0 p-0 gap-0">
            {(!isImageLoaded || imageUrl === null) && (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    className="absolute"
                />
            )}
            <Image
                alt={alt}
                width={imageWidth}
                height={imageHeight}
                src={imageUrl ?? ""}
                onLoad={() => setIsImageLoaded(true)}
            />
        </div>
    )
}
