'use client'
import { Spinner } from "@chakra-ui/react";


export default function LoadingMeetingPlaceholderCard() {
    const width = "375px"
    const height = "500px"
    const imageWidth = 350
    const imageHeight = imageWidth * (9 / 16)

    return (
        <div>
            <div
                style={{ maxWidth: width, width: width, height: height, maxHeight: height }}
                className={`flex flex-col bg-secondaryBackground mt-4 mx-2 justify-around items-center py-8 rounded-lg border-white border-2 hover:cursor-pointer hover:bg-neutral-800`}>
                    <Spinner 
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
            </div>
        </div>
    )
}