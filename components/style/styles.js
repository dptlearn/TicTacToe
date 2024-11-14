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
	
	scrollViewLight: {
		backgroundColor: '#fff'
	},
	
	textLight: {
		color: '#fff'
	},
	
	textDark: {
		color: 'black'
	},
	
	headerText: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 30
	},
	
	boardLight: {
		borderWidth: 2,
		borderColor: '#fff',
		flexDirection: 'row',
		flexWrap: 'wrap'
		
	},
	
	boardDark: {
		borderWidth: 1,
		borderColor: 'black',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center'
	},
	
	gridLight: {
		borderColor: '#fff',
		width: '33.3%',
		height: '33.3%',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	
	gridDark: {
		borderColor: 'black',
		width: '33.3%',
		height: '33.3%',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	
	buttonLight: {
		borderWidth: 2,
		padding: 20,
		width: '50%',
		borderRadius: 10,
		borderColor: '#fff',
		alignItems: 'center',
		marginBottom: 20,
		backgroundColor: '#fff'
	},
	
	buttonDark: {
		borderWidth: 2,
		padding: 20,
		width: '50%',
		borderRadius: 10,
		borderColor: 'black',
		alignItems: 'center',
		marginBottom: 20,
		backgroundColor: 'black'
	},
	
	backArrowView: {
		marginTop: 10, 
		paddingLeft: 20, 
		flexDirection: 'row', 
		alignItems: 'center'
	},
	
	buttonTextLight: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 20
	},
	
	buttonTextDark: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 20
	},
	
	modalOverlay: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	
	modalDark: {
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		height: '50%',
		borderWidth: 1
	},
	
	modalLight: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		height: '50%',
		borderWidth: 1
	},
	
	formFieldTextInputDark: {
		borderWidth: 1,
		borderColor: 'black'
	},
	
	formFieldTextInputLight: {
		borderWidth: 1,
		borderColor: '#fff',
		color: '#fff'
	}
	
});

export default styles;