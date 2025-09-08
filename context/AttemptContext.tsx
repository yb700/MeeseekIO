import { Character } from "@/graphql/Schema";
import React, { createContext, useContext, useState, type ReactNode } from "react";

type AttemptContext = {
    attempts: Character[],
    answer?: Character,
    setAnswer: (c?: Character) => void;
    addAttempt: (character: Character) => void,
    resetAttempts: () => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const AttemptContext = createContext<AttemptContext | undefined>(undefined);

export function AttemptProvider({ children }: { children: ReactNode }) {
    const [attempts, setAttempts] = useState<Character[]>([]);
    const [answer, setAnswer] = useState<Character>();

    function addAttempt(guess: Character) {
        setAttempts((prev) => {
            if (prev.some((c) => c.name.toLowerCase().trim() === guess.name.toLowerCase().trim())) {
                return prev;
            }
            return [...prev, guess];
        });
    }

    function resetAttempts() {
        setAttempts([]);
    }

    return (
        <AttemptContext.Provider value={{ attempts, answer, setAnswer, addAttempt, resetAttempts }}>
            {children}
        </AttemptContext.Provider>
    );
}

export function useAttempts() {
    const context = useContext(AttemptContext);
    if (!context) throw new Error("Use the AttemptProvider");
    return context;
}