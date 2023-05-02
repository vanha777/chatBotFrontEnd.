import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import theme from '../theme.js';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    botGradient: {
        //background: 'linear-gradient(to right top, #4f39ac, #7136aa, #8d33a6, #a531a1, #ba309b)'
        background: 'linear-gradient(to left bottom, #0095ce, #0087ce, #0078cc, #0068c7, #2c56be, #3550bb, #3d4ab8, #4544b5, #3c4bbc, #3052c2, #2159c8, #0060cd)'
    },
    userGradient: {
        background: '#5F5E58'
    },
    systemsGradient: {
        background: 'transparent'
    }
}), { defaultTheme: theme });


const ChatBubble = ({ message, sender }) => {
    const bubbleStyles = {
        padding: theme.spacing(1),
        borderRadius: '20px',
        backgroundColor: sender === 'Bánh Bao' ? theme.palette.chatUser.main : sender ==='systems' ?'' : theme.palette.chatBot.main,
        color: theme.palette.primary.contrastText,
        maxWidth: '100%',
        marginBottom: theme.spacing(1),
        display: 'flex',

    };


    const chatContainer = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: sender === 'Bánh Bao' ? 'flex-end' : sender === 'systems' ? 'center' : 'flex-start',
    }

    const classes = useStyles();

    return (
        <div>
            {sender === "Thánh Hỗ Trợ"
                ? <div style={chatContainer} >
                {/*<Avatar src={bot} style={{ marginRight: '10px' }} />*/}
                <Paper style={bubbleStyles} className={classes.botGradient}>
                    <Typography variant="body1" >{message}</Typography>
                </Paper>
            </div>
                : sender === "Bánh Bao"  
                ? <div style={chatContainer}>
                <Paper style={bubbleStyles} className={classes.userGradient}>
                    <Typography variant="body1" >{message}</Typography>
                </Paper>
            </div>
            : <div style={chatContainer}>
            <Paper style={bubbleStyles} className={classes.systemsGradient}>
                <Typography variant="body1" >{message}</Typography>
            </Paper>
        </div>
            }
        </div>
    );
};

export default ChatBubble;