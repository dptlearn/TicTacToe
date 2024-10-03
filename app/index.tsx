import { Text, View, ScrollView, SafeAreaView, Appearance } from "react-native";
import React, { useState, useEffect } from 'react';

import styles from '../components/style/styles';

export default function Index() {
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const [board, setBoard] = useState(Array(9), fill(null));
	
	useEffect(() => {
		const listener = Appearance.addChangeListener(({ colorScheme }) => {
			setTheme(colorScheme);
		});

		return() => {
			listener.remove();
		};
	}, []);
	
	return (
		<SafeAreaView style={ theme === 'dark'? styles.safeAreaViewDark : styles.safeAreaViewLight }>
			<ScrollView>
				<View style={styles.basicContainer}>
					<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Hi</Text>
					{board.map((value, index) => {
						return <View style={styles.boardContainer} /> 
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
  );
}
