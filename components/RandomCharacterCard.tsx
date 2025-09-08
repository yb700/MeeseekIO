import { useAttempts } from "@/context/AttemptContext";
import { Character } from "@/graphql/Schema";
import { useRandomCharacter } from "@/hooks/useRandomCharacter";
import { useEffect, useState } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";


type RandomCharacterCardProps = {
    onCorrect: (isMatch: boolean) => void;
    onWrong: (wrong: boolean) => void
    guess?: Character
};

export default function RandomCharacterCard({ onCorrect, onWrong, guess }: RandomCharacterCardProps) {
    const { character, next, loading } = useRandomCharacter();
    const { attempts, setAnswer } = useAttempts()
    const [revealed, setRevealed] = useState(false);
    const [wrong, setWrong] = useState(false);

    useEffect(() => {
        if (!character) {
            next();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character]);

    useEffect(() => { setAnswer(character); }, [character, setAnswer]);

    useEffect(() => {
        if (attempts.length >= 10) {
            onWrong(true);
            setWrong(true);
            setRevealed(true);
        }
    }, [attempts, onWrong]);

    useEffect(() => {
        if (!character || !guess) return;
        const isMatch = character.name === guess.name;
        onCorrect?.(isMatch)
        if (isMatch) {
            setRevealed(true);
            const t = setTimeout(() => {
                setRevealed(false);
                next();
            }, 1050); return () => clearTimeout(t);
        }
    }, [character, guess, next, onCorrect]);

    return (
        <View
        >
            <View className="w-full flex-col md:flex-row gap-4">
                <View className="w-full md:w-1/2 items-center justify-center">
                    {loading || !character ? (
                        <ActivityIndicator />
                    ) : (
                        <View className="w-40 h-40 md:w-full md:h-auto aspect-square max-w-sm rounded-2xl overflow-hidden">
                            <Image
                                source={{ uri: character.image }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                    )}
                </View>

                <View className="justify-center flex items-center p-4">
                    <Text className="text-white/60 text-xs uppercase tracking-widest">
                        Character
                    </Text>

                    <Text
                        className={`text-2xl font-extrabold mt-1
                        ${revealed ? "text-green-500" : ""}
                        ${wrong ? "text-red-500" : ""}
                        text-white`}
                        numberOfLines={2}
                    >
                        {!revealed && !wrong ? maskText(character?.name) : (character?.name ?? "—")}
                    </Text>

                    <View className="mt-3 space-y-2">
                        <InfoRow label="Origin" value={character?.origin?.name} guessValue={guess?.origin?.name} />
                        <InfoRow label="Status" value={character?.status} guessValue={guess?.status} />
                        <InfoRow label="Species" value={character?.species} guessValue={guess?.species} />
                        <InfoRow label="Gender" value={character?.gender} guessValue={guess?.gender} />
                    </View>
                </View>
            </View>
        </View>
    );
}

function maskText(text?: string | null, minVisibleLength = 0) {
    const value = (text ?? "").trim();
    if (!value) return "—";
    const visible = value.slice(0, minVisibleLength);
    const masked = "•".repeat(Math.max(3, value.length - minVisibleLength));
    return `${visible}${masked}`;
}

function InfoRow({ label, value, guessValue }: { label: string; value?: string | null; guessValue?: string | null; }) {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        if (value && guessValue && value === guessValue) {
            setRevealed(true);
        }
    }, [value, guessValue]);

    return (
        <View className="flex-row items-center mt-1.5">
            <Text className="text-white/60 text-center">{label}:</Text>
            <Text className={`text-white font-medium ml-3`} numberOfLines={1}>
                {revealed ? (value ?? "—") : maskText(value)}
            </Text>
        </View>
    );
}