import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from '../../components/style/styles';

import axios from 'axios';

const SignUp = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	
	const handleSignUp = async () => {
		try{
			const response = await axios.post('http://localhost:5000/api/signup', {
				username,
				password
			});
			setMessage(response.data.message);
		}catch(error){
			setMessage('Error signing up: ' + error.response.data.message);
		}
	};

	return(
		<View>
			<Text>Sign up</Text>
		</View>
	)
}

export default SignUp;