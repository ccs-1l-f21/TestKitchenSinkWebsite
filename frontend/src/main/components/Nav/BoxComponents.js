import React from 'react'; 
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
// import { borderRadius } from '@material-ui/system';
// import Box from '@mui/material/Box';

const App = ({diningHall}) => {
    if (diningHall == 'ortega') {
        return (
            <Box m = {1} sx={{
                height : '120px', 
                borderRadius: '12px',
                boxShadow: 1,
                backgroundColor : 'gray'
            }} >
                <Link to='/ortega'>{diningHall}</Link>
            </Box>
        );
    }
    if (diningHall == 'de-la-guerra') {
        return(
            <Box m = {1} sx={{
                height : '120px', 
                borderRadius: '12px',
                boxShadow: 1,
                backgroundColor : 'gray'
            }} >
                <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
                    <Link to='/de-la-guerra'>{diningHall}</Link>
                </Box>
            </Box>
        )
    }
    if (diningHall == 'portola') {
        return (
            <Box m = {1} sx={{
                height : '120px', 
                borderRadius: '12px',
                boxShadow: 1,
                backgroundColor : 'gray'
            }} >
                <Link to='/portola'>{diningHall}</Link>
            </Box>
        )
    }    
    if (diningHall == 'carrillo') {
        return (
            <Box m = {1} sx={{
                height : '120px', 
                borderRadius: '12px',
                boxShadow: 1,
                backgroundColor : 'gray'
            }} >
                <Link to='/carrillo'>{diningHall}</Link>
            </Box>
        )
    }
}

export default App; 