import { afterEach, describe, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import MeetingCard from "./MeetingCard";

describe("MeetingCard", () => {
    const meetingTitle = "Meeting Title"
    const shortDescription = "Short Description"
    const meetingDate = new Date()
    meetingDate.setMinutes(meetingDate.getMinutes() - 24)

    afterEach(() => {
        cleanup()
    })

    it("Should render the Meeting card", async () => {
        render(
            <MeetingCard
                title={meetingTitle}
                shortDescription={shortDescription}
                meetingDate={meetingDate}
            />
        )


        screen.getByText(meetingTitle)

        screen.getByText(shortDescription)
        screen.getByText("24 minutes ago")
    })
})