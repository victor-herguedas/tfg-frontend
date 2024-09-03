"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getEnv } from "./env";

interface Env {
    API_URL: string;
}

interface EnvContextInterface {
    env: Env
}

export const EnvContext = createContext<EnvContextInterface | undefined>(undefined);

export const EnvProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [env, setEnv] = useState<EnvContextInterface>({
        env: {
            API_URL: "",
        },
    });

    useEffect(() => {
        getEnv().then((env) => {
            const value = JSON.stringify(env, null, 2);
            const envMap = JSON.parse(value);
            setEnv({ env: envMap });
        });
    }, []);
    return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
    const env = useContext(EnvContext);
    if (!env) {
        throw new Error("useEnv must be used within an EnvProvider");
    }

    console.log(env);
    return env;
};
