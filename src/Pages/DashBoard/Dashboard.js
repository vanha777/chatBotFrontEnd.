
import React, { useState, useRef, useEffect, useContext } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItems from './ListItems';
import ChatBox from './ChatBox.js'
import theme from '../../modules/theme.js';
import logo from '../../modules/images/logo.png'
import ThreeComponent from '../../modules/components/ThreeComponent.jsx';
import { useInteractionState } from '../../modules/components/userInteractionState';


const drawerWidth = 240;

//AppBar change when open drawer
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


//drawer Menu open and close define
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const CircleBox = styled(Box)({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
});


function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const chatBoxRef = useRef(null);
  const { userState, updateUserState } = useInteractionState();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [appbarInput, setAppBarInput] = useState('');

  const handleInput = (input) => {
    setAppBarInput(input);
  }
  // 3d Model Animations Set ...
  const handleClickModel = () => {
    updateUserState('hit')

    setTimeout(() => {
      updateUserState('look')
      setTimeout(() => {
        updateUserState('idle')
      }, 6000);
    }, 1000);



  }
  const handleMouseEnter = () => {

    updateUserState('interract')
  }
  const handleMouseLeave = () => {
    updateUserState('idle')
  }
  const handleModelTalk = () => {
    updateUserState('talk')
    setTimeout(() => {
      updateUserState('idle')
    }, 3000);
  }
  //End ...
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh", display: 'flex', backgroundColor: theme.palette.primary.main }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.primary.main }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
                color: theme.palette.button.main
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              sx={{
                height: 54,
                width: 54,
                marginRight: 2
              }}
              alt="Your logo."
              src={logo}
            />
            <Typography
              component="h1"
              variant="h6"
              color="#0060CD"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              BixTech
            </Typography>
            <IconButton >
              <Badge badgeContent={4} sx={{ color: '#EF476F' }} >
                <NotificationsIcon sx={{ color: theme.palette.button.main }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}  >

          <Toolbar
            sx={{
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: theme.palette.secondary.contrastText }} />
            </IconButton>
          </Toolbar>

          {/* chatBot Faces render by Three.js*/}
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, mx: 5, my: 5 }} >
            <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClickModel} sx={{ width: open === false ? 50 : 159, height: open === false ? 50 : 200 }} >
              <ThreeComponent />
            </Box>
          </Box>
          {/* end. */}

          <List component="nav" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.contrastText }}>
            <Divider sx={{ my: 1 }} />
            <ListItems appbarInput={handleInput} />
          </List>
          {open === true
            ?
            <Link variant='referenceLink' 
            href='https://master--stellular-stroopwafel-36ea55.netlify.app' 
            target="_blank"
            sx={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              backgroundColor: theme.palette.primary.main,
              color: '#5CA8FF',
              display: 'flex',
              justifyContent: 'center',
              padding: '50px',
            }}>
              @Built by CopyCoder
            </Link>
            : (null)
          }
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.primary.main,
            flexGrow: 1,
            height: '90vh',
            overflowY: 'auto',
            marginTop: theme.spacing(8)
          }}

          ref={chatBoxRef}
        >

          <ChatBox appbarInput={appbarInput} />

        </Box>


      </Box>

    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}