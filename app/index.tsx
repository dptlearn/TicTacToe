import { View, Text, SafeAreaView, ScrollView, Appearance, StatusBar, BackHandler, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import styles from '../components/style/styles';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

export default function Index({ navigation }){
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const statusBarHeight = getStatusBarHeight();
	
	{/* Function to close the app */}
	const handleQuit = () => {
		BackHandler.exitApp();
	}
	
	useEffect(() => {
		const listener = Appearance.addChangeListener(({ color }) => {
			setTheme(color);
		});
		
		return() => {
			listener.remove()
		}
		
	}, []);

	return(
		<SafeAreaView style={ theme === 'dark'? styles.safeAreaViewDark : styles.safeAreaViewLight }>
			<StatusBar 
				barStyle={ theme === 'dark'? 'light-content' : 'dark-content' }
			/>
			<ScrollView style={{ flexGrow: 1, marginTop: statusBarHeight }}>
				<View style={[styles.basicContainer, {marginTop: statusBarHeight}]}>
					<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, { fontSize: 30, fontWeight: 'bold' } ]}>Welcome to TicTacToe!</Text>
				</View>
				
				<View style={[styles.basicContainer, {marginTop: statusBarHeight}]}>
					<TouchableOpacity
						onPress={() => router.push('/home')}
						style={ theme === 'dark'? styles.buttonLight : styles.buttonDark }
					>
						<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Play as Guest</Text>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={() => router.push('/sign-in')}
						style={ theme === 'dark'? styles.buttonLight : styles.buttonDark }
					>
						<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Log in</Text>
					</TouchableOpacity>
				
					<TouchableOpacity
						onPress={() => handleQuit()}
						style={ theme === 'dark'? styles.buttonLight : styles.buttonDark }
					>
						<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Quit</Text>
					</TouchableOpacity>
					
					
				</View>
			</ScrollView>
		</SafeAreaView>
	)
} 