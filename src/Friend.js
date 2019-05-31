import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


// CSS Styles
const useStyles = makeStyles({
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    }
});

// Friend Component
function Friend(props) {
    const classes = useStyles();
    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="flex-start"
            >
                <Avatar alt={props.info.name} src={props.info.photo} className={classes.avatar}></Avatar>
                <Typography align="center" variant="h4">
                    {props.info.name}
                </Typography>
            </Box>

            <Divider variant="fullWidth" />
        </Box>
    );
}

export default Friend;