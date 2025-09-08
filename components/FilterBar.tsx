import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import type { FilterCharacter } from "@/graphql/Schema";

type Props = {
    value: Partial<FilterCharacter>;
    onChange: (next: Partial<FilterCharacter>) => void;
    onClear: () => void;
};

const STATUSES = ["Alive", "Dead", "unknown"] as const;
const GENDERS = ["Male", "Female", "Genderless", "unknown"] as const;

export default function CharacterFilterBar({ value, onChange, onClear }: Props) {
    const [draft, setDraft] = useState<Partial<FilterCharacter>>(value);
    const [visible, setVisible] = useState(false);

    useEffect(() => setDraft(value), [value]);

    function setField<K extends keyof FilterCharacter>(key: K, v: string | undefined) {
        setDraft((prev) => ({ ...prev, [key]: v && v.length ? v : undefined }));
    }

    return (
        <View className="my-4 p-3 bg-gray-700 rounded-xl">
            <View className="flex-row items-center justify-between gap-4 mb-2">
                <Text className="text-white text-xl font-bold">Filters</Text>
                <View className="flex-row gap-3">
                    <Pressable
                        onPress={() => { setVisible(!visible) }}
                        className="px-3 py-1.5 rounded-xl bg-white/10"
                    >
                        <Text className="text-white/90 text-sm">{visible ? ("Hide") : ("Show")}</Text>
                    </Pressable>
                    <Pressable
                        onPress={onClear}
                        className="px-3 py-1.5 rounded-xl bg-white/10"
                    >
                        <Text className="text-white/90 text-sm">Clear</Text>
                    </Pressable>
                </View>
            </View>

            <View className={visible ? "flex" : "hidden"}>
                {/* Name */}
                <Text className="text-white/70 mb-1">Name</Text>
                <TextInput
                    placeholder="e.g. Rick"
                    placeholderTextColor="#9CA3AF"
                    value={(draft.name as string) ?? ""}
                    onChangeText={(t) => setField("name", t)}
                    className="bg-zinc-800 text-white px-3 py-2 rounded-xl mb-3"
                    returnKeyType="done"
                />

                {/* Status */}
                <Text className="text-white/70 mb-1">Status</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                    <View className="flex-row gap-2">
                        {STATUSES.map((s) => (
                            <Chip
                                key={s}
                                label={s}
                                active={draft.status === s}
                                onPress={() => setField("status", draft.status === s ? undefined : s)}
                            />
                        ))}
                    </View>
                </ScrollView>

                {/* Gender */}
                <Text className="text-white/70 mb-1">Gender</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                    <View className="flex-row gap-2">
                        {GENDERS.map((g) => (
                            <Chip
                                key={g}
                                label={g}
                                active={draft.gender === g}
                                onPress={() => setField("gender", draft.gender === g ? undefined : g)}
                            />
                        ))}
                    </View>
                </ScrollView>

                {/* Species & Type */}
                <View className="flex-row gap-3">
                    <View className="flex-1">
                        <Text className="text-white/70 mb-1">Species</Text>
                        <TextInput
                            placeholder="e.g. Human"
                            placeholderTextColor="#9CA3AF"
                            value={(draft.species as string) ?? ""}
                            onChangeText={(t) => setField("species", t)}
                            className="bg-zinc-800 text-white px-3 py-2 rounded-xl"
                            returnKeyType="done"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white/70 mb-1">Type</Text>
                        <TextInput
                            placeholder="e.g. Clone"
                            placeholderTextColor="#9CA3AF"
                            value={(draft.type as string) ?? ""}
                            onChangeText={(t) => setField("type", t)}
                            className="bg-zinc-800 text-white px-3 py-2 rounded-xl"
                            returnKeyType="done"
                        />
                    </View>
                </View>

                {/* Apply */}
                <Pressable
                    onPress={() => onChange(draft)}
                    className="mt-3 h-11 rounded-2xl bg-indigo-500 items-center justify-center"
                    style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
                >
                    <Text className="text-white font-semibold">Apply Filters</Text>
                </Pressable>
            </View>
        </View>
    );
}

function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            className={`px-3 py-1.5 rounded-2xl border ${active ? "bg-emerald-600/20 border-emerald-500/40" : "bg-white/10 border-white/10"
                }`}
            style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
            <Text className={`text-sm ${active ? "text-emerald-300" : "text-white/90"}`}>{label}</Text>
        </Pressable>
    );
}
