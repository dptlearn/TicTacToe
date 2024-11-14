import { View, Text, SafeAreaView, ScrollView, Appearance, StatusBar, TouchableOpacity, Dimensions, Modal, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import styles from '../../components/style/styles';

import Ionicons from '@expo/vector-icons/Ionicons';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

const ComputerMode = () => {
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const statusBarHeight = getStatusBarHeight();
	const [computerScore, setComputerScore] = useState(0);
	const [playerScore, setPlayerScore] = useState(0);
	const [board, setBoard] = useState(Array(9).fill(null));
	const [dimensions, setDimensions] = useState(Dimensions.get('window'));
	const [turn, setTurn] = useState('X');
	const [playerIcon, setPlayerIcon] = useState(null);
	const [computerIcon, setComputerIcon] = useState(null);
	const [modalVisible, setModalVisible] = useState(true);
	
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
		[1, 4, 7]
	];
	
	const checkWinningMove = (myIcon, myBoard) => {
		for(let combination of winningCombinations)
		{
			const [a, b, c] = combination;
			if(
				(myBoard[a] === myIcon && myBoard[b] === myIcon && !myBoard[c]) ||
				(myBoard[a] === myIcon && !myBoard[b] && myBoard[c] === myIcon) ||
				(!myBoard[a] && myBoard[b] === myIcon && myBoard[c] === myIcon)
			){
				return c || a || b;
			}
		}
		
		return null;
	}
	
	const checkForWinner = (myBoard) => {
		for(let combination of winningCombinations)
		{
			const [a, b, c] = combination;
			if(myBoard[a] && myBoard[a] === myBoard[b] && myBoard[b] === myBoard[c])
			{
				return myBoard[a];
			}
		}
		
		return null;
	}
	
	const handleWinner = (winner) => {
		if(winner === playerIcon)
		{
			Alert.alert('We have a winner!', `Player (${playerIcon}) is the WINNER!`);
			setPlayerScore(prev => prev + 1);
		}
		else 
		{
			Alert.alert('We have a winner!', `Computer (${computerIcon}) is the WINNER!`);
			setComputerScore(prev => prev + 1);
		}
		
		setBoard(Array(9).fill(null));
	}
	
	const checkTie = (myBoard) => {
		return myBoard.every(cell => cell !== null);
	}
	
	const handlePress = (index) => {
		if(turn === playerIcon)
		{
			{/* Check if cell is occupied */}
			if(board[index]) return;
			const newBoard = [...board];
			
			//const newBoard = [...board];
			newBoard[index] = turn;
			
			
			const hasWinner = checkForWinner(newBoard);
			if(hasWinner)
			{
				handleWinner(hasWinner);
			}
			
			else if(checkTie(newBoard))
			{
				Alert.alert('Draw!', 'This game is a draw!');
				setBoard(Array(9).fill(null));
			}
			else
			{
				setBoard(newBoard);
				setTurn(turn === 'X'? 'O' : 'X');
			}
			
		}
	}
	
	useEffect(() => {
		const listener = Appearance.addChangeListener(({ color }) => {
			setTheme(color);
		});
		
		const handleDimension = ({ thisDimension }) => {
			setDimensions(thisDimension);
		}
		
		const dimensionChange = Dimensions.addEventListener('change', handleDimension);
		
		return() => {
			listener.remove();
			dimensionChange.remove();
		}
	}, []);
	
	useEffect(() => {
		if(turn === computerIcon)
		{
			const newBoard = [...board];
			
			const hasWinningMove = checkWinningMove(computerIcon, newBoard);
			const opponentWinningMove = checkWinningMove(playerIcon, newBoard);
			
			// If there's a winning combination 
			if(hasWinningMove && !newBoard[hasWinningMove])
			{
				//if(newBoard[hasWinningMove]) return;
				newBoard[hasWinningMove] = computerIcon;
				setBoard(newBoard);
				setTurn(playerIcon);
				return;
			}
			
			if(opponentWinningMove && !newBoard[opponentWinningMove])
			{
				//if(newBoard[opponentWinningMove]) return;
				newBoard[opponentWinningMove] = computerIcon; // Block the player's move
				setBoard(newBoard);
				setTurn(playerIcon);
				return;
			}
			
			const emptyIndices = newBoard.map((cell, index) => (cell === null? index: null)).filter(index => index !== null)
			const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
			if (randomIndex !== undefined)
			{
				if(newBoard[randomIndex]) return;
				newBoard[randomIndex] = computerIcon;
				setBoard(newBoard);
				setTurn(playerIcon);
			}
		}
		
		const hasWinner = checkForWinner(board);
		if(hasWinner)
		{
			handleWinner(hasWinner);
		}
		
		else if(checkTie(board))
		{
			Alert.alert('Draw!', 'This game is a draw!');
			setBoard(Array(9).fill(null));
		}
	}, [turn === computerIcon]);

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
				
				<View style={[ styles.basicContainer, { marginTop: statusBarHeight } ]}>
					<Text style={styles.headerText}>TicTacToe</Text>
					<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, { fontStyle: 'italic', fontWeight: 'bold' } ]}>VS computer mode</Text>
				</View>
				
				{/* Display scores */}
				<View style={{ marginTop: statusBarHeight, alignItems: 'center' }}>
					<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, { fontWeight: 'bold' } ]}>Computer: {computerScore}</Text>
					<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, { fontWeight: 'bold' } ]}>Player: {playerScore}</Text>
				</View>
				
				{/* Display board */}
				<View style={[ styles.basicContainer, { marginTop: statusBarHeight } ]}>
					<View style={[ theme === 'dark'? styles.boardLight : styles.boardDark, { width: dimensions.width/1.5, height: dimensions.height/2.5 } ]}>
						{board.map((cell, index) => {
							return <TouchableOpacity
										key={index}
										style={ theme === 'dark'? styles.gridLight : styles.gridDark }
										onPress={() => handlePress(index)}
							>
								<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, { fontWeight: 'bold', fontSize: 30 } ]}>{ cell }</Text>
							</TouchableOpacity>
						})}
					</View>
				</View>
				
				<Modal
					visible={modalVisible}
					transparent={true}
					onRequestClose={() => {setModalVisible(false)}}
				>
					<View style={styles.modalOverlay}>
						<View style={ theme === 'dark'? [styles.modalDark, {borderColor: 'white'}] : [styles.modalLight, {borderColor: 'black'}] }>
							<Text style={styles.headerText}>Choose turn</Text>

								<TouchableOpacity
									onPress={() => {setPlayerIcon('X'), setComputerIcon('O'), setModalVisible(false)}}
									style={[ theme === 'dark'? [styles.buttonLight, {backgroundColor: 'white'}] : [styles.buttonDark, {backgroundColor: 'black'}], { marginTop: statusBarHeight } ]}
								>
									<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Go First</Text>
								</TouchableOpacity>
								
								<TouchableOpacity
									onPress={() => {setPlayerIcon('O'), setComputerIcon('X'), setModalVisible(false)}}
									style={ theme === 'dark'? [styles.buttonLight, {backgroundColor: 'white'}] : [styles.buttonDark, {backgroundColor: 'black'}] }
								>
									<Text style={ theme === 'dark'? styles.buttonTextDark : styles.buttonTextLight }>Go Second</Text>
								</TouchableOpacity>

						</View>
					</View>
				</Modal>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ComputerMode;