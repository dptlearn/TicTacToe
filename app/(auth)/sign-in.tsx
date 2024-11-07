import { View, Text, Appearance, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../../components/style/styles';
import FormField from '../../components/forms/FormField';
import CustomButton from '../../components/CustomButton';

import axios from 'axios';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

const SignIn = () => {
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const statusBarHeight = getStatusBarHeight();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [signInSuccess, setSignInSuccess] = useState(false);
	
	useEffect(() => {
		const listener = Appearance.addChangeListener(({ color }) => {
			setTheme(color);
		});
		
		return() => {
			listener.remove();
		}
	}, []);
	
	const handleSignIn = async () => {
		setMessage('');
		setSignInSuccess(false);
		try{
			const response = await axios.post('http://localhost:5000/api/signin', {
				username, 
				password
			});
			setMessage(response.data.message);
			setSignInSuccess(true);
			router.push('/home');
		}catch(error){
			if (error.response) {
			// Server responded with a status other than 200
			setMessage('Error signing in: ' + (error.response.data.message || 'An unexpected error occurred.'));
			} 
			else if (error.request) {
				// Request was made but no response was received
				setMessage('Network error: Please try again later.');
			}
			else {
				// Something else caused the error
				setMessage('Error: ' + error.message);
			}
		}
	}

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
				
				<View style={[styles.basicContainer, {marginTop: statusBarHeight}]}>
					<Text style={styles.headerText}>TicTacToe</Text>
					{/* Username form field */}
					<FormField 
						title={"Username:"}
						statusBarHeight={statusBarHeight}
						placeHolder={'johnwick123'}
						theme={theme}
						value={username}
						handleChangeText={(e) => setUsername(e)}
						
					/>
					
					{/* Password form field */}
					<FormField 
						title={"Password: "}
						statusBarHeight={statusBarHeight}
						theme={theme}
						placeHolder={'password123'}
						value={password}
						handleChangeText={(e) => setPassword(e)}
					/>
					
					{/* Sign in button */}
					<CustomButton 
						title='Sign In'
						statusBarHeight={statusBarHeight}
						handlePress={() => handleSignIn()}
						theme={theme}
					/>
					
					<Pressable
						onPress={() => router.push('/forget-password')}
					>
						<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Forget password?</Text>
					</Pressable>
					
					{signInSuccess === false && (
						<Text style={{ color: 'red' }}>{message}</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignIn;