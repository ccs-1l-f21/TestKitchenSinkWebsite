import React from 'react'; 
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';;
// import { getThemeProps } from '@material-ui/system';
// import { borderRadius } from '@material-ui/system';
// import Box from '@mui/material/Box';

const BoxComponents = (props) => {
    return (
    <>
        <Box m = {1} sx={{
            height : '120px', 
            borderRadius: '12px',
            boxShadow: 1,
            backgroundColor : 'gray'
        }} >
            <Link to={`/commons/${props.diningHallCode}`}>{props.diningHallName}</Link>
        </Box>
    </>
    );
}

export default BoxComponents; 