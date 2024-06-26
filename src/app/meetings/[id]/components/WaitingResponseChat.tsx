import { MessageRole } from "@/domain/models/Chat"
import styles from "./WaitingResponseChat.module.css"

interface Props {
    role: MessageRole
}

export default function WaitingResponseChat({ role }: Props) {
    const textColor = role === MessageRole.USER ? "text-black" : "text-black"
    const bgColor = role === MessageRole.SYSTEM ? "bg-white" : "bg-green-300"
    const aliniation = role === MessageRole.SYSTEM ? "justify-start" : "justify-end"

    return (
        <div className={`w-full flex ${aliniation}`}>
            <div className={`flex w-10/12  ${aliniation}`}>
                <div className={`flex flex-row py-1 ${bgColor} ${textColor} rounded-lg ${aliniation}`}>
                    <div className={`${styles.wave}`}>
                        <LoadingDots />
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

const LoadingDots = () => {
    return (
        <div className={`${styles.loading} pt-3`}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      );
  };