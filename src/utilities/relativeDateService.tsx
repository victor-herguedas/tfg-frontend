export const getRelativeDateService = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 7) {
        return date.toDateString()
    }
    if (days > 0) {
        return `${days} days ago`
    } if (hours > 0) {
        return `${hours} hours ago`
    } else if (minutes > 0) {
        return `${minutes} minutes ago`
    } else if (seconds > 0) {
        return `${seconds} seconds ago`
    } else {
        return date.toDateString()
    }
}