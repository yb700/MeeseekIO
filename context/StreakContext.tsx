import React, { createContext, useContext, useState, type ReactNode } from "react";

type StreakContext = {
    streak: number;
    best: number;
    increase: () => void;
    resetStreak: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const StreakContext = createContext<StreakContext | undefined>(undefined);

export function StreakProvider({ children }: { children: ReactNode }) {
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(0);

    function increase() {
        setStreak((prev) => {
            const next = prev + 1;
            if (next > best) setBest(next);
            return next;
        });
    }

    function resetStreak() {
        setStreak(0);
    }

    return (
        <StreakContext.Provider value={{ streak, best, increase, resetStreak }}>
            {children}
        </StreakContext.Provider>
    );
}

export function useStreak() {
    const context = useContext(StreakContext);
    if (!context) throw new Error("Use the StreakProvider");
    return context;
}