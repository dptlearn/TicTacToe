import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

import styles from './style/styles';

const CustomButton = ({ title, handlePress, theme, statusBarHeight }) => {
	return(
			<Pressable
				onPress={handlePress}
				style={[ theme === 'dark'? styles.buttonLight : styles.buttonDark, {marginTop: statusBarHeight} ]}
			>
				<Text style={[ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight, {fontWeight: 'bold'} ]}>{title}</Text>
			</Pressable>
	)
}

export default CustomButton;