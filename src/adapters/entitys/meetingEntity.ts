'use client'
import vine, { errors } from '@vinejs/vine'

export class MeetingSummarizedEntity {
  constructor(
    public id: string,
    public createdAt: Date,
    public meetingDate: Date,
    public name: string,
    public transcriptionState: string,
) { }
}

const schema = vine.object({
  id: vine.string().trim().minLength(1),
  createdAt: vine.date(),
  meetingDate: vine.date(),
  name: vine.string().trim().minLength(1),
  transcriptionState: vine.enum(['IN_PROGRESS', 'COMPLETED', 'FAILED']),
})

export const getMeetingSummarizedEntity = async (meetingEntity: any): Promise<MeetingSummarizedEntity> => {
  try {
    const validatedCreateMeetingData = await vine.validate({ schema, data: meetingEntity })
    return validatedCreateMeetingData
  } catch (error) {
    throw error
  }
}