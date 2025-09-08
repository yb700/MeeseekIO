import { Link, Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <ScrollView>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='w-screen h-screen'>
        <h1 className='text-4xl'>This screen doesn&apos;t exist.</h1>

        <Link href="/" >
          <h2>Go to home screen!</h2>
        </Link>
      </View>
    </ScrollView>
  );
}