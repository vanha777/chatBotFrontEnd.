import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import theme from '../../modules/theme.js';
import ChatBubble from '../../modules/components/ChatBubble';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useInteractionState } from '../../modules/components/userInteractionState';

const mineTheme = theme;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(5),
        width: '100%',
        backgroundColor: theme.palette.primary.main
    },
    chatInput: {
        marginTop: theme.spacing(2),
        width: '100%',
        backgroundColor: '#5F5E58',
        '& .MuiInputBase-input:focus': {
            color: 'white',
            backgroundColor: '#353431'
        },
        '& .MuiInputBase-input:hover': {
            backgroundColor: '#353431',
        },


    },
    sendButton: {
        marginTop: theme.spacing(1),
        alignSelf: 'flex-end',
        color: theme.palette.secondary.contrastText,
        backgroundImage: 'linear-gradient(to left bottom, #0095ce, #0087ce, #0078cc, #0068c7, #2c56be, #3550bb, #3d4ab8, #4544b5, #3c4bbc, #3052c2, #2159c8, #0060cd)',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right bottom, #0095ce, #0087ce, #0078cc, #0068c7, #2c56be, #3550bb, #3d4ab8, #4544b5, #3c4bbc, #3052c2, #2159c8, #0060cd)'
        },
    },
    chatInputContainer: {
        display: 'flex',
        position: 'sticky',
        bottom: '10px',
        padding: theme.spacing(2),
        margin: '10px',
        width: '95%',

    }

}), { defaultTheme: mineTheme });

const ChatBox = (props) => {
    const classes = useStyles();
    const [message2, setMessage2] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [progress, setProgress] = React.useState(false);
    const { appbarInput } = props;
    const [customInput, setCustomInput] = useState('');
    const { userState, updateUserState } = useInteractionState();
    const handleModelTalk = () => {
        updateUserState('talk')
        setTimeout(() => {
            updateUserState('idle')
        }, 8000);
    }
    // whenever receive input from Parent Component, setState as customInput
    useEffect(() => {
        setCustomInput(appbarInput)
    }, [appbarInput])

    //reply to a system generate input
    useEffect(() => {
        handleCustomInput(customInput);
    }, [customInput])

    useEffect(() => {
        if (userState === 'hit') {
            setChatHistory([
                ...chatHistory,
                {
                    name: 'Thánh Hỗ Trợ',
                    message: "Ouch! That hurt! 😫💥"
                }
            ])
        }
        if (userState === 'interract') {
            setChatHistory([
                ...chatHistory,
                {
                    name: 'Thánh Hỗ Trợ',
                    message: "I feel so alive when I'm dancing like this! 💃🏻😍"
                }
            ])
        }
    }, [userState])


    //reply to a system generate input
    const handleCustomInput = (input) => {
        if (customInput.length > 0) {
            setChatHistory([
                ...chatHistory,
                {
                    name: 'systems',
                    message: `Systems: ${input}`
                }
            ])
            setProgress(true);
            setTimeout(() => {
                setProgress(false);
                setChatHistory([
                    ...chatHistory,
                    {
                        name: 'systems',
                        message: `Systems: ${input}`
                    },
                    {
                        name: 'Thánh Hỗ Trợ',
                        message: "Uh oh, something went wrong! 😬 Let me call Van Jiro right away. Don't worry, they're on it and we'll have things up and running in no time! 👍"
                    }
                ])
                // set Model 3d interraction
                updateUserState('talkPhone')
                setTimeout(() => {
                    updateUserState('idle')
                }, 8000);
            }, 2000);
        }
    }

    // clear <chatInputContainer/> display after user submitted chat
    const handleInput = (value) => {
        setMessage2(value);
        setMessage(value);
    }

    // chat start
    const handleSendMessage = async () => {
        if (message.length > 0) {
            // Update chat history with User new message
            setMessage2('');
            setChatHistory([
                ...chatHistory,
                {
                    name: 'Bánh Bao',
                    message: message
                }
            ])
            setProgress(true);

            // Send message logic to backend
            const response = await fetch('https://chat-bot-server.herokuapp.com/chat', {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8', },
                body: JSON.stringify({
                    input: message
                })
            }).then((res) => res.json()).then((res) => {
                return res.result.content
            })
                .catch((err) => console.log(`Front-end failed to fetch /chat, ${err}`));
            await response;
            console.log(chatHistory)
            setProgress(false);

            // Update chat history with Bot new message
            setChatHistory([
                ...chatHistory,
                {
                    name: 'Bánh Bao',
                    message: message
                },
                {
                    name: 'Thánh Hỗ Trợ',
                    message: response
                }
            ])
            setMessage('')
            // set Model 3d interraction
            handleModelTalk();

        }
    }

    async function sayWelcome() {
        setProgress(true);
        const welcome = await fetch('https://chat-bot-server.herokuapp.com/chat', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
            body: JSON.stringify({
                input: 'Please Introduce Yourself'
            })
        }).then((res) => res.json()).then((res) => { return res.result.content }).catch((err) => console.log(`Front-end failed to fetch /chat, ${err}`));
        await welcome;
        setProgress(false);
        setChatHistory([
            {
                name: 'Thánh Hỗ Trợ',
                message: welcome
            }
        ])
        handleModelTalk();
    }
    // chatBot to start conversations first
    useEffect(() => {
        sayWelcome();
    }, []);


    return (

        <div className={classes.root} >
            <div >
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <ChatBubble message={chat.message} sender={chat.name} key={index} />
                    </div>
                ))}
            </div>

            {progress == true
                ?
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color='progressBar' sx={{ background: 'linear-gradient(to left bottom, #0095ce, #0087ce, #0078cc, #0068c7, #2c56be, #3550bb, #3d4ab8, #4544b5, #3c4bbc, #3052c2, #2159c8, #0060cd)' }} />
                </Box>

                : null
            }
            <div className={classes.chatInputContainer}>
                <TextField
                    className={classes.chatInput}
                    label="Type a message to send"
                    InputLabelProps={{ style: { color: 'white', } }}
                    value={message2}
                    onChange={(e) => handleInput(e.target.value)}
                    variant="filled"
                    size="small"
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    aria-label="Type a message to send"
                />
                <Button
                    className={classes.sendButton}
                    variant="contained"
                    onClick={handleSendMessage}
                    aria-label="Send message"
                    style={{
                        marginLeft: '10px',
                        marginBottom: '3px'
                    }}
                >
                    <DoubleArrowOutlinedIcon />
                </Button>
            </div>

        </div>

    );
};

export default ChatBox;