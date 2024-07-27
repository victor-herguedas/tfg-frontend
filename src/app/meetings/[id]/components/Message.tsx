import { MessageRole } from "@/domain/models/Chat"
import { marked } from 'marked';

interface Props {
    message: string
    date: Date
    role: MessageRole
}

export default function MessageComponent({ message, date, role }: Props) {
    const hour = completeNumber(date.getHours().toString()) + ":" + completeNumber(date.getMinutes().toString())
    const textColor = role === MessageRole.USER ? "text-black" : "text-black"
    const bgColor = role === MessageRole.SYSTEM ? "bg-white" : "bg-green-300"
    const aliniation = role === MessageRole.SYSTEM ? "justify-start" : "justify-end"

    const getMarkdownText = () => {
        const rawMarkup = marked(message);
        return { __html: rawMarkup };
      };

    return (
        <div className={`w-full flex ${aliniation}`}>
            <div className={`flex w-10/12  ${aliniation}`}>
                <div className={`flex flex-row py-1 ${bgColor} ${textColor} rounded-lg ${aliniation}`}>
                    <div>
                        <div className="text-sm pl-2 px-1 text-start"
                            dangerouslySetInnerHTML={getMarkdownText()}>
                        </div>
                    </div>
                    <div className="flex items-end justify-end">
                        <p className="text-xs items-end pr-2">{hour}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
const completeNumber = (number: string): string => {
    if (number.length === 1) {
        return "0" + number
    }
    return number
}