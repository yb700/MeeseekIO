import { Character } from "@/graphql/Schema";
import { View, Image, Text, useWindowDimensions } from "react-native";

export default function CharacterCard({ character }: { character: Character }) {
    const { width } = useWindowDimensions();
    const isSmall = width < 600;

    return (
        <View className="bg-gray-700 rounded-xl overflow-hidden flex-1">
            <View className={isSmall ? "flex-col" : "flex-row"}>
                <Image
                    source={{ uri: character.image }}
                    className={isSmall ? "w-full h-48" : "w-1/2 h-full"}
                    resizeMode="cover"
                />

                <View className="p-4 flex-1">
                    <Text className="text-white text-2xl font-bold mb-1" numberOfLines={1}>
                        {character.name}
                    </Text>
                    <Text className="text-gray-400 text-base mb-4">{character.gender}</Text>

                    <InfoRow label="Species" value={character.species} />
                    <InfoRow
                        label="Origin"
                        value={
                            character.origin.name !== "unknown"
                                ? `${character.origin.name} – ${character.origin.dimension ?? ""}`
                                : character.origin.name
                        }
                    />
                    <InfoRow label="Status" value={character.status} />
                    <InfoRow label="Last Known Location" value={character.location.name} />
                </View>
            </View>
        </View>
    );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
    return (
        <View className="mb-2">
            <Text className="text-gray-400 text-sm">{label}</Text>
            <Text className="text-white text-lg font-semibold" numberOfLines={2}>
                {value ?? "—"}
            </Text>
        </View>
    );
}