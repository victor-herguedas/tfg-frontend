'use client'
import { ReactElement, useContext, useEffect, useRef, useState } from "react"
import styles from "./PopUp.module.css"
import { PopUpContext } from "./PopUpProvider";

interface Props {
    children: React.ReactNode;
    stylesProp?: string ;
    buttonRef?: React.RefObject<HTMLDivElement>;
}

export default function PopUp({ children, stylesProp, buttonRef }: Props) {
    const popUpContext = useContext(PopUpContext);
    if (!popUpContext) {
        throw new Error("PopUpContext is not found");
    }
    const { isActivated, setIsActivated } = popUpContext;
    // const [isActivated, setIsActivated] = useState(true);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (overlayRef.current && contentRef.current && !contentRef.current.contains(event.target as Node) && !buttonRef?.current?.contains(event.target as Node)) {
            setIsActivated(false);
        }
    };

    useEffect(() => {
        if (isActivated) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <>
            <div ref={overlayRef} className={`${styles.popup} ${isActivated ? styles.active : ""}`}>
                <div className={`${styles.overlay} `}>
                    <div ref={contentRef} className={`${styles.content} border-2 border-white rounded-lg overflow-x-hidden overflow-y-auto flex flex-col ${stylesProp}`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}