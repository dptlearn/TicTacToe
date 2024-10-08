import { View, Text, Appearance, StatusBar, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

import styles from '../../components/style/styles';

import Ionicons from '@expo/vector-icons/Ionicons';

const getStatusBarHeight = () => {
	return StatusBar.currentHeight || 0;
}

const OfflineMode = () => {
	const [theme, setTheme] = useState(Appearance.getColorScheme());
	const statusBarHeight = getStatusBarHeight();
	const [board, setBoard] = useState(Array(9).fill(null));
	const [dimensions, setDimensions] = useState(Dimensions.get('window'));
	const [turn, setTurn] = useState('X');
	const [player1, setPlayer1] = useState(0);
	const [player2, setPlayer2] = useState(0);
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[0, 4, 8],
		[2, 5, 8],
		[2, 4, 6],
		[1, 4, 7]
	];
	
	const checkWinner = (board) => {
		for(let combination of winningCombinations)
		{
			const [a, b, c] = combination; {/* e.g. a=0, b=1, c=2 */}
			{/* Check if the board currently has any of the winning combinations */}
			if(board[a] != null && board[a] === board[b] && board[b] === board[c])
			{
				return board[a];
			}
		}
		
		return null;
	}
	
	const checkForTie = (board) => {
		return board.every(cell => cell !== null);
	}
	
	const handleRestartGame = () => {
		setBoard(Array(9).fill(null));
	}
	
	const handleResetScore = () => {
		setPlayer1(0);
		setPlayer2(0);
	}
	
	const handlePress = (index) => {
		if(board[index]) return;
		const newBoard = [...board];
		newBoard[index] = turn;
		
		{/* Check if there's a winner after a player made a move */}
		const winner = checkWinner(newBoard);
		if(winner != null)
		{
			if(winner === 'X')
			{
				Alert.alert('We have a winner!', `Player 1 (${winner}) is the winner!`);
				
				setPlayer1(prev => prev + 1);
				setBoard(Array(9).fill(null));
			}
			else if(winner === 'O')
			{
				Alert.alert('We have a winner!', `Player 2 (${winner}) is the winner!`);
				setPlayer2(prev => prev + 1);
				setBoard(Array(9).fill(null));
			}
			else if(checkForTie(newBoard))
			{
				Alert.alert('Draw!', 'This game is a DRAW!');
				setBoard(Array(9).fill(null));
			}
			
		}
		else
		{
			setBoard(newBoard);
			setTurn(turn === 'X'? 'O' : 'X');
		}
		
	}
	
	useEffect(() => {
		const listener = Appearance.addChangeListener(({ colorScheme }) => {
			setTheme(colorScheme);
		})
		
		const handleDimensions = ({ thisDimensions }) => {
			setDimensions(thisDimensions);
		}
		
		const dimensionChange = Dimensions.addEventListener('change', handleDimensions);
		
		return() => {
			listener.remove();
			dimensionChange.remove();
		}
	}, []);
	
	return(
		<SafeAreaView style={ theme === 'dark'? styles.safeAreaViewDark : styles.safeAreaViewLight }>
			<ScrollView style={{ flexGrow: 1, paddingTop: statusBarHeight }}>
				<View style={styles.backArrowView}>
					<TouchableOpacity
						onPress={() => router.back()}
					>
						<Ionicons
							name="arrow-back"
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
			
				<View style={[styles.basicContainer, {marginTop: statusBarHeight}]}>
					<Text style={styles.headerText}>TicTacToe</Text>
					<Text style={ theme === 'dark'? styles.textLight : styles.textDark }>Offline Mode</Text>
				</View>
				
				<View style={{ marginTop: statusBarHeight, alignItems: 'center' }}>
					<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, {fontWeight: 'bold'} ]}>Player 1: { player1 }</Text>
					<Text style={[ theme === 'dark'? styles.textLight : styles.textDark, {fontWeight: 'bold'} ]}>Player 2: { player2 }</Text>
				</View>
				
				<View style={[styles.basicContainer, {marginTop: statusBarHeight}]}>
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
				
				<View style={{ marginTop: statusBarHeight, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flex: 1 }}>
					<Button
						title='Restart game'
						color={ theme === 'dark'? 'white' : 'black' }
						onPress={() => handleRestartGame()}
					/>
					
					<Button
						title="Reset Score"
						color={ theme === 'dark'? 'white' : 'black' }
						onPress={() => handleResetScore()}
					/>
				</View>
				
			</ScrollView>
		</SafeAreaView>
	);
}

export default OfflineMode;