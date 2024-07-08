interface Props {
    isActivated: boolean;
    handleClick: () => void;
}

export default function ChatButton({ isActivated, handleClick }: Props) {

    if (isActivated) return null
    return (
        <div
            onClick={handleClick}
            className="fixed  bottom-10 right-10 z-50 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out">
            <div
                className="flex justify-center items-center bg-primary-500 rounded-full w-12 h-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </div>
        </div>
    )
}