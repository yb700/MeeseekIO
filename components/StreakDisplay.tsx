import { useStreak } from "@/context/StreakContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, Text } from "react-native";

export default function StreakDisplay() {
    const { streak, best } = useStreak();

    return (
        <View className="flex flex-col p-2 rounded-xl items-center justify-center">
            <Text className="text-white font-semibold"><FontAwesome6 name="fire-flame-curved" size={14} color="#fffff" /> Streak: {streak}</Text>
            <Text className="text-white/70 text-xs">Best: {best}</Text>
        </View>
    )
}