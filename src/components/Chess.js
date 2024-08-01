import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ChessGame = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [turn, setTurn] = useState('w'); // 'w' for white, 'b' for black
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMove = ({ sourceSquare, targetSquare }) => {
    // Get list of valid moves from the current position
    const moves = game.moves({ square: sourceSquare, verbose: true });
    const validMove = moves.find(m => m.to === targetSquare);

    if (!validMove) return; // Invalid move

    // Make the move
    game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to a queen for simplicity
    });

    setFen(game.fen());
    setTurn(game.turn());

    // Check for checkmate
    if (game.isCheckmate()) {
      setIsCheckmate(true);
      setDialogOpen(true);
    }
  };

  const resetGame = () => {
    game.reset();
    setFen(game.fen());
    setTurn('w');
    setIsCheckmate(false);
    setDialogOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Chess Game
      </Typography>
      <Chessboard
        position={fen}
        onDrop={isCheckmate ? () => {} : (move) => handleMove(move)}
        width={320}
        transitionDuration={300}
        draggable={true}
      />
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Turn: {turn === 'w' ? 'White' : 'Black'}
      </Typography>
      <Button variant="contained" color="primary" onClick={resetGame} style={{ marginTop: '20px' }}>
        Reset Game
      </Button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Checkmate</DialogTitle>
        <DialogContent>
          <Typography>{turn === 'w' ? 'Black' : 'White'} wins!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetGame} color="primary">
            New Game
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChessGame;
