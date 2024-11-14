import { Stack } from 'expo-router';

const TabsLayout = () => {
	return(
		<Stack>
			<Stack.Screen name="home" options={{ headerShown: false }} />
			<Stack.Screen name="offline-mode" options={{ headerShown: false }} />
			<Stack.Screen name="computer-mode" options={{ headerShown: false }} />
			<Stack.Screen name="forget-password" options={{ headerShown: false }} />
		</Stack>
	)
}

export default TabsLayout;