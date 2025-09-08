import { router } from "expo-router";
import { Modal, View, Text, Pressable } from "react-native";

type IntroModalProps = {
    modalVisible: boolean
    isVisible: (visible: boolean) => void
    isActive: (active: boolean) => void
}

export default function IntroModal({ modalVisible, isVisible, isActive }: IntroModalProps) {
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
                        New Game
                    </Text>

                    <Text className="text-white text-3xl font-extrabold mt-1">
                        Ready to play?
                    </Text>

                    <Text className="text-white/70 mt-2">
                        Guess the character’s name and origin to win.
                    </Text>
                    <Text className="text-white/70 mt-4">Rules:</Text>
                    <View className="mt-2">
                        <View className="flex-row items-start mb-2">
                            <Text className="text-white mr-2">•</Text>
                            <Text className="text-white flex-1">10 Attempts to guess</Text>
                        </View>

                        <View className="flex-row items-start">
                            <Text className="text-white mr-2">•</Text>
                            <Text className="text-white flex-1">
                                Each guess reveals the corresponding correct attribute.
                            </Text>
                        </View>
                    </View>

                    <View className="mt-6 gap-3">
                        <Pressable
                            onPress={() => {
                                isActive(true);
                                isVisible(false);
                            }}
                            className="h-12 rounded-2xl bg-indigo-500 items-center justify-center"
                            style={({ pressed }) => ({
                                transform: [{ scale: pressed ? 0.98 : 1 }],
                                opacity: pressed ? 0.95 : 1,
                            })}
                        >
                            <Text className="text-white font-semibold">Enter Game</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => { isVisible(false); router.replace("/") }}
                            className="h-12 rounded-2xl border border-white/10 bg-white/5 items-center justify-center"
                            style={({ pressed }) => ({
                                transform: [{ scale: pressed ? 0.98 : 1 }],
                                opacity: pressed ? 0.9 : 1,
                            })}
                        >
                            <Text className="text-white/80 font-semibold">Maybe later</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal >
    )
}