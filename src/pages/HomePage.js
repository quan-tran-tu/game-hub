import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to the Multi-Game App
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Choose a Game
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <Button variant="outlined" component={Link} to="/sudoku">
          Sudoku
        </Button>
        <Button variant="outlined" component={Link} to="/chess">
          Chess
        </Button>
        <Button variant="outlined" component={Link} to="/tic-tac-toe">
          Tic-Tac-Toe
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
