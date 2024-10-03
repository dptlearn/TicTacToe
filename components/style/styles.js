import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	basicContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	
	safeAreaViewDark: {
		backgroundColor: 'black',
		flex: 1
	},
	
	safeAreaViewLight: {
		backgroundColor: '#fff',
		flex: 1
	},
	
	scrollViewDark: {
		backgroundColor: 'black'
	},
	
	scrollViewLight: {
		backgroundColor: '#fff'
	},
	
	textLight: {
		color: '#fff'
	},
	
	textDark: {
		color: 'black'
	},
	
	boardContainer: {
		borderWidth: 2
	}
});

export default styles;