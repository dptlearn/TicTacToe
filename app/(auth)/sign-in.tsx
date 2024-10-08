import { View, Text, Appearance, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../../components/style/styles';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

const SignIn = () => {
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const statusBarHeight = getStatusBarHeight();
	
	useEffect(() => {
		const listener = Appearance.addChangeListener(({ color }) => {
			setTheme(color);
		});
		
		return() => {
			listener.remove();
		}
	}, []);

	return(
		<SafeAreaView style={ theme === 'dark'? styles.safeAreaViewDark : styles.safeAreaViewLight }>
			<StatusBar
				barStyle={ theme === 'dark'? 'light-content' : 'dark-content' }
			/>
			<ScrollView style={{ flexGrow: 1, paddingTop: statusBarHeight }}>
				<View style={styles.backArrowView}>
					<TouchableOpacity
						onPress={() => router.back()}
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color={ theme === 'dark'? "white" : "black" }
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={() => router.back()}
					>
						<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Back</Text>
					</TouchableOpacity>
				</View>
				
				<View style={styles.basicContainer}>
					<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Sign in</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignIn;