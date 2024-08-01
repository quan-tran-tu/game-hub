import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import SudokuPage from './pages/SudokuPage';
import ChessPage from './pages/ChessPage';
import TicTacToePage from './pages/TicTacToePage';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Multi-Game App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sudoku" element={<SudokuPage />} />
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
