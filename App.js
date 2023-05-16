import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const BOARD_SIZE = 3;

export default function App() {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const onSquarePress = (row, col) => {
    if (board[row][col] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    checkForWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkForWinner = (board, player) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      // Verificar coluna horizontal
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        setWinner(player);
        return;
      }
      // Verificar coluna vertical
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        setWinner(player);
        return;
      }
    }
    // Verificar diagonal
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      setWinner(player);
      return;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      setWinner(player);
      return;
    }
    // Verificar empate
    if (!board.flat().includes(null)) {
      setWinner('Empate');
      return;
    }
  };

  const renderSquare = (row, col) => (
    <TouchableOpacity style={styles.square} onPress={() => onSquarePress(row, col)}>
      <Text style={styles.squareText}>{board[row][col]}</Text>
    </TouchableOpacity>
  );

  const renderBoard = () => (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.boardRow}>
          {row.map((col, colIndex) => (
            <React.Fragment key={colIndex}>
              {renderSquare(rowIndex, colIndex)}
              {(colIndex + 1) % BOARD_SIZE === 0 && <View style={{ width: 0, height: '100%' }} />}
            </React.Fragment>
          ))}
        </View>
      ))}
    </View>
  );

  const renderStatus = () => {
    if (winner) {
      return <Text style={styles.status}>{winner === 'Empate' ? 'É\ um empate!' : `${winner} Venceu!`}</Text>;
    }
    return <Text style={styles.status}>{currentPlayer} Turno </Text>;
  };

  return (
    <View style={styles.container}>
      {renderBoard()}
      {renderStatus()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'500px'
  },
  board: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

