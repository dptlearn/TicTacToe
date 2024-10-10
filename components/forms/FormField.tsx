import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';

import styles from '../style/styles';

const FormField = ({ title, statusBarHeight, handleChangeText, placeHolder, value, theme }) => {
	const [showPassword, setShowPassword] = useState(false);
	
	const togglePassword = () => {
		setShowPassword(!showPassword);
	}

	return(
		<View style={[styles.basicContainer, {marginTop: statusBarHeight}]}>
			<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, {fontWeight: 'bold', fontStyle: 'italic'}]}>{title}</Text>
		
			<View style={{flexDirection: 'row', marginTop: statusBarHeight/5}}>
				
				<TextInput 
					onChangeText={handleChangeText}
					placeholder={placeHolder}
					placeholderTextColor={'#C0C0C0'}
					value={value}
					style={[ theme === 'dark'? styles.formFieldTextInputLight : styles.formFieldTextInputDark, { marginLeft: 10, width: '80%', height: '100%' } ]}
					secureTextEntry={ title === 'Password: ' && !showPassword}
				/>
				
				{ title === 'Password: ' && (
					<TouchableOpacity
						onPress={() => togglePassword()}
						style={{ alignItems: 'center', marginLeft: -20, justifyContent: 'center' }}
					>
						{showPassword === true? <Entypo name='eye-with-line' color={theme === 'dark'? 'white' : 'black'} size={15} /> : <Entypo name='eye' size={15} color={theme === 'dark'? 'white' : 'black'} />}
					</TouchableOpacity>
				) }
			</View>
		</View>
	);
}

export default FormField;