import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Friend from './Friend';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

// CSS styles
const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bigAvatar: {
        margin: 3,
        width: 90,
        height: 90,
    }
});

// VK Component
function Vk(props) {
    const classes = useStyles();
    return (
        <Card className={classes.card} >
            <CardContent>
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="center"
                >
                    <Avatar alt={props.info.self.name} src={props.info.self.photo} className={classes.bigAvatar}></Avatar>
                    <Typography align="center" variant="h4">
                        {props.info.self.name}
                    </Typography>
                </Box>
                <Typography align="left" variant="h5">Друзья:</Typography>
                <Divider variant="fullWidth" />
                {props.info.friends.map((friend, index) => // List of Friend components
                    <Friend key={index} info={friend} />
                )}
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" size="large" color="primary" mx="auto" onClick={props.logout}>
                    Выйти
                </Button>
            </CardActions>
        </Card>
    );
}

export default Vk;