import React, { Component } from 'react';
import { Dots } from 'react-preloaders';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Vk from './Vk';
import config from './config.json';

const APP_ID = config.APP_ID;

// CSS styles
const useStyles = makeStyles({
    box: {
        minHeight: '60vh',
        marginTop: '12vh'
    }
});

// Wrapper Component
function FlexWrapper(props){
    const classes = useStyles();
    return (
        <Box
            className={classes.box}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {props.children}
        </Box>
    );
}

// App Component
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, // Data loading flag
            loggedIn: false, // Logged In flag
            info: {} // Profile and friendlist info
        };
    }


    // Checking authorization with VK Api
    checkLogin() {
        this.setState({ isLoading: true });
        this.VK.Auth.getLoginStatus(event => {
            if (event.status === "connected")
                this.getInfo();
            else
                this.setState({
                    isLoading: false,
                    loggedIn: false
                });
        });
    }


    // Get profile and friendlist info, updating state
    getInfo() {
        this.VK.Api.call('users.get', { // Get profile info
            fields: ['photo_200_orig'],
            v: '5.95'
        }, user =>
                this.VK.Api.call('friends.get', { // Get friends info
                    order: 'random',
                    count: 5,
                    fields: ['photo_200_orig,'],
                    v: '5.95'
                }, friends => { // Response processing
                    user = user.response[0];
                    friends = friends.response.items;
                    let info = {};
                    info.self = {
                        name: `${user.first_name} ${user.last_name}`,
                        photo: user.photo_200_orig
                    };
                    info.friends = friends.map(friend => {
                        return {
                            name: `${friend.first_name} ${friend.last_name}`,
                            photo: friend.photo_200_orig
                        }
                    });
                    this.setState({ //Updating State
                        info: info,
                        isLoading: false,
                        loggedIn: true
                    });
                })
        )
    }

    // VK Api initialization
    loadVkApi() {
        this.setState({ isLoading: true });
        window.vkAsyncInit = () => {
            window.VK.init({
                apiId: APP_ID
            });
            this.VK = window.VK;
            this.checkLogin();
        };

        setTimeout(function () {
            let api = document.createElement("script");
            api.type = "text/javascript";
            api.src = "https://vk.com/js/api/openapi.js?160";
            api.async = true;
            document.head.appendChild(api);
        }, 0);
    }

    // Initialize Api
    componentDidMount() {
        this.loadVkApi();
    }

    // Call log In method
    logIn = () => this.VK.Auth.login(() => this.checkLogin(), 2);

    // Call log out method
    logOut = () => this.VK.Auth.logout(() => this.checkLogin());

    render() {
        if (this.state.isLoading)
            return <Dots />; // Preloader
        else
            return (
                <Container maxWidth="sm" >
                    <FlexWrapper>
                        {(this.state.loggedIn)?
                            <Vk info={this.state.info} logout={this.logOut}></Vk>: // Vk Component
                            <Login login={this.logIn}></Login> // Log In Component
                        }
                    </FlexWrapper>
                </Container>

            );
    }
}

export default App;