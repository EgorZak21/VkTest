import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// CSS Styles
const useStyles = makeStyles({
    card: {
        minWidth: 275,
    }
});

// Log In component
function Login(props) {
    const classes = useStyles();
    return (
        <Card className={classes.card} >
            <CardContent>
                <Typography align="center" variant="h5" component="h1">
                    Добро пожаловать! <br />
                    Для продолжения необходима авторизация через ВКонтакте.
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" size="large" color="primary" mx="auto" onClick={props.login}>
                    Авторизоваться
                </Button>
            </CardActions>
        </Card>
    );
}

export default Login;