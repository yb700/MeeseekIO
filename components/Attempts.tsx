import { useAttempts } from "@/context/AttemptContext";
import { Character } from "@/graphql/Schema";
import { View, Text, Image } from "react-native";

export default function Attempts() {
    const { attempts, answer } = useAttempts();

    return (
        <View className="flex-1 px-4 py-3">
            <View className="flex-row items-center mb-2 gap-2 px-3">
                <Text className="text-md text-white/70 mb-1">Key -</Text>
                <Badge label="Match" ok />
                <Badge label="No match" />
            </View>

            {attempts.reverse().map((attempt: Character) => {
                const nameMatch = eq(attempt.name, answer?.name);
                const originMatch = eq(attempt.origin?.name, answer?.origin?.name);
                const statusMatch = eq(attempt.status, answer?.status);
                const speciesMatch = eq(attempt.species, answer?.species);
                const genderMatch = eq(attempt.gender, answer?.gender);

                return (
                    <View key={attempt.id ?? attempt.name} className="mb-2 rounded-2xl bg-white/5 border border-white/10 p-3">
                        <View className="flex-row items-center">
                            <Image source={{ uri: attempt.image }} className="h-10 w-10 rounded-lg mr-3" />
                            <Text className={`text-xl font-bold ${nameMatch ? "text-emerald-400" : "text-white"}`}>
                                {attempt.name}
                            </Text>
                        </View>

                        {answer && (
                            <View className="flex-row flex-wrap gap-6 mt-3">
                                <Field label="Origin" value={attempt.origin?.name} ok={originMatch} />
                                <Field label="Status" value={attempt.status} ok={statusMatch} />
                                <Field label="Species" value={attempt.species} ok={speciesMatch} />
                                <Field label="Gender" value={attempt.gender} ok={genderMatch} />
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
}


function eq(a?: string | null, b?: string | null) {
    return (a ?? "").trim().toLowerCase() === (b ?? "").trim().toLowerCase();
}

function Field({ label, value, ok }: { label: string; value?: string | null; ok: boolean }) {
    return (
        <View className="items-start">
            <Text className="text-white/60 text-xs">{label}</Text>
            <Badge label={value ?? "—"} ok={ok} />
        </View>
    );
}

function Badge({ label, ok = false }: { label: string; ok?: boolean }) {
    return (
        <View
            className={`mt-1 px-2 py-1 rounded-lg border
        ${ok ? "bg-emerald-600/20 border-emerald-500/40" : "bg-zinc-800/60 border-white/10"}`}
        >
            <Text className={`text-xs font-medium ${ok ? "text-emerald-300" : "text-white/80"}`}>
                {ok ? "✓ " : "✕ "}{label}
            </Text>
        </View>
    );
}
