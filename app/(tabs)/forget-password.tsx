import { View, Text, SafeAreaView, ScrollView, Appearance, StatusBar, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import styles from '../../components/style/styles';
import FormField from '../../components/forms/FormField';
import CustomButton from '../../components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

const ForgetPassword = () => {
	const statusBarHeight = getStatusBarHeight();
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const components = [];
	const [message, setMessage] = useState('');
	
	for (let i = 0; i < 3; i++)
	{
		components.push(
			<FormField 
				key={i}
				title={ i === 0? 'Username:' : 'Password:' }
				statusBarHeight={statusBarHeight}
				value={i === 0? username : i === 1? password : confirmPassword }
				theme={theme}
				handleChangeText={i === 0? (e) => {setUsername(e); setMessage('');
								} : i === 1? (e) => {setPassword(e); setMessage('');
								} : (e) => {setConfirmPassword(e); setMessage('');}}
				placeHolder={i === 0? 'Username' : 'new password123'}
			/>
		)
	}
	
	const handleResetPassword = async () => {
		setMessage('');
	
		if(password === "" || confirmPassword === "")
		{
			setMessage("Password cannot be empty");
		}
		else if(password !== confirmPassword)
		{
			setMessage("Password do not match");
		}
		else
		{
			try
			{
				const response = await axios.post('http://localhost:5000/api/reset-password', {
					username,
					confirmPassword
				});
				setMessage(response.data.message);
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
	}
	
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
			<ScrollView style={{ flexGrow: 1, marginTop: statusBarHeight }}>
				<View style={styles.backArrowView}>
					<Pressable
						onPress={() => router.back()}
					>
						<Ionicons 
							name='arrow-back' 
							color={ theme === 'dark'? 'white' : 'black' }
							size={24}
							/>
					</Pressable>
					
					<Pressable
						onPress={() => router.back()}
					>
						<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Back</Text>
					</Pressable>
				</View>
				
				<View style={[styles.basicContainer, { marginTop: statusBarHeight }]}>
					<Text style={styles.headerText}>Reset Password</Text>
					
					{components}
					
					<CustomButton 
						title="Reset"
						theme={theme}
						statusBarHeight={statusBarHeight}
						handlePress={() => handleResetPassword()}
					/>
					
					{message && (
						<Text style={{ color: 'red' }}>{ message }</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ForgetPassword;