import { describe, expect, test } from "vitest";
import { getRelativeDateService } from "./relativeDateService";

describe("RelativeDateService", () => {
    test("should return 24 minites ago", () => {
        const date = new Date()
        const newDate = date.setMinutes(date.getMinutes() - 24)
        expect(getRelativeDateService(date)).toBe("24 minutes ago")
    })

    test("should return 5 hours ago", () => {
        const date = new Date()
        date.setHours(date.getHours() - 5)
        expect(getRelativeDateService(date)).toBe("5 hours ago")
    })

    test("should return 1 day ago", () => {
        const date = new Date()
        date.setDate(date.getDate() - 2)
        expect(getRelativeDateService(date)).toBe("2 days ago")
    })

    test("should return 10 seconds ago", () => {
        const date = new Date()
        date.setSeconds(date.getSeconds() - 10)
        expect(getRelativeDateService(date)).toBe("10 seconds ago")
    })

    test("should return date to string when more than 7 days", () => {
        const date = new Date()
        date.setDate(date.getDate() - 10)
        expect(getRelativeDateService(date)).toBe(date.toDateString())
    })

    test("should return date to string when less than 1 seccond", () => {
        const date = new Date()
        date.setMilliseconds(date.getMilliseconds() + 100)
        expect(getRelativeDateService(date)).toBe(date.toDateString())
    })
})