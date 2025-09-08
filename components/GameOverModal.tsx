import { useStreak } from "@/context/StreakContext";
import { router } from "expo-router";
import { Modal, View, Text, Pressable } from "react-native";

type IntroModalProps = {
    modalVisible: boolean
    isVisible: (visible: boolean) => void
    isActive: (active: boolean) => void
    onRetry: () => void
}

export default function GameOverModal({ modalVisible, isVisible, isActive, onRetry }: IntroModalProps) {
    const { streak, best } = useStreak();
    return (
        <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => isVisible(false)}
            className='z-50'
        >
            <View className="flex-1 bg-black/90 items-center justify-center px-6">

                <View className="w-full max-w-md p-10 overflow-hidden backdrop-blur-md rounded-3xl border border-white/10">

                    <Text className="text-white/70 text-xs uppercase tracking-widest">
                        Game Over
                    </Text>

                    <Text className="text-white text-3xl font-extrabold mt-1">
                        Too Many Attempts
                    </Text>

                    <Text className="text-white/70 text-xs uppercase tracking-widest">
                        Streak: {streak}
                    </Text>

                    <View className="mt-6 gap-3">
                        <Pressable
                            onPress={() => {
                                onRetry()
                            }}
                            className="h-12 rounded-2xl bg-indigo-500 items-center justify-center"
                            style={({ pressed }) => ({
                                transform: [{ scale: pressed ? 0.98 : 1 }],
                                opacity: pressed ? 0.95 : 1,
                            })}
                        >
                            <Text className="text-white font-semibold">Retry</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => { isVisible(false); router.replace("/") }}
                            className="h-12 rounded-2xl border border-white/10 bg-white/5 items-center justify-center"
                            style={({ pressed }) => ({
                                transform: [{ scale: pressed ? 0.98 : 1 }],
                                opacity: pressed ? 0.9 : 1,
                            })}
                        >
                            <Text className="text-white/80 font-semibold">Go Home</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal >
    )
}