import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    Pressable,
    ScrollView,
    Keyboard,
    Image,
} from "react-native";
import useGuessAutocomplete from "@/hooks/useGuessAutocomplete";
import type { Character } from "@/graphql/Schema";

type AttemptInputProps = {
    onPick: (c: Character) => void;
    placeholder?: string;
};

export default function AttemptInput({ onPick, placeholder = "Make your guess" }: AttemptInputProps) {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { suggestions = [], loading, error }: {
        suggestions?: Character[];
        loading?: boolean;
        error?: unknown;
    } = useGuessAutocomplete({ name: text });

    function choose(c: Character) {
        onPick(c);
        setText('');
        setOpen(false);
        Keyboard.dismiss();
    }

    const uniqueSuggestions = Array.from(
        new Map(suggestions.map((c) => [c.id ?? c.name, c])).values()
    );

    return (
        <View className="px-4 py-3 relative">
            <TextInput
                autoComplete="off"
                nativeID="guess"
                value={text}
                onChangeText={setText}
                placeholder={placeholder}
                placeholderTextColor="#ffffff"
                className="h-12 px-4 rounded-2xl bg-white/10 border border-white/10 text-white"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="search"
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 120)}
                onSubmitEditing={() => {
                    if (suggestions.length > 0) choose(suggestions[0]);
                }}
                clearTextOnFocus
            />

            {open && (
                <View
                    className="mt-2 rounded-2xl overflow-hidden border border-white/10 bg-white/5"
                    style={{ maxHeight: 280 }}
                >
                    {loading ? (
                        <Text className="px-4 py-3 text-white/70">Loading…</Text>
                    ) : error ? (
                        <Text className="px-4 py-3 text-red-400">Failed to load suggestions.</Text>
                    ) : suggestions.length === 0 ? (
                        <Text className="px-4 py-3 text-white/60">No matches.</Text>
                    ) : (
                        <ScrollView keyboardShouldPersistTaps="handled">
                            {uniqueSuggestions.map((item) => (
                                <Pressable
                                    key={String(item.id ?? item.name)}
                                    onPress={() => choose(item)}
                                    className="px-4 py-3 border-b border-white/10 last:border-b-0"
                                >
                                    <View className="flex-row items-center">
                                        {item.image ? (
                                            <Image
                                                source={{ uri: item.image }}
                                                className="h-8 w-8 rounded-lg mr-3"
                                            />
                                        ) : null}
                                        <Text className="text-white">{item.name}</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>
                    )}
                </View>
            )}
        </View>
    );
}