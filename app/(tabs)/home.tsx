import {View, Text, Appearance, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import styles from '../../components/style/styles';

import Ionicons from '@expo/vector-icons/Ionicons';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

const Home = () => {
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
			<ScrollView style={{ flexGrow: 1, marginTop: statusBarHeight }}>
				<View style={styles.backArrowView}>
					<TouchableOpacity
						onPress={() => router.back()}
					>
						<Ionicons 
							name='arrow-back'
							size={24}
							color={ theme === 'dark'? 'white' : 'black' }
							
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={() => router.back()}
					>
						<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Back</Text>
					</TouchableOpacity>
				</View>
			
				<View style={[styles.basicContainer, { marginTop: statusBarHeight }]}>
					<TouchableOpacity
						style={ theme === 'dark'? styles.buttonLight : styles.buttonDark }
						onPress={() => router.push('/computer-mode')}
					>
						<Text style={ theme === 'dark'? styles.buttonTextDark: styles.buttonTextLight }>VS Computer</Text>
					</TouchableOpacity>
					
					<TouchableOpacity
						style={ theme === 'dark'? styles.buttonLight : styles.buttonDark }
					>
						<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Online</Text>
					</TouchableOpacity>
					
					<TouchableOpacity
						style={ theme === 'dark'? styles.buttonLight : styles.buttonDark }
						onPress={() => router.push('offline-mode')}
					>
						<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Offline 2 Player</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Home;