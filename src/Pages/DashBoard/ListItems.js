import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FeedIcon from '@mui/icons-material/Feed';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import theme from '../../modules/theme.js';

function ListItems(props) {
  const { appbarInput } = props;
  const handleClick = (e) => {
    appbarInput(e);
  }
  return (
    <React.Fragment  >
      <ListSubheader style={{ color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main }} component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton onClick={(e) => { handleClick('Log In') }}>
        <ListItemIcon >
          <VpnKeyIcon style={{ color: theme.palette.button.main, }} />
        </ListItemIcon>
        <ListItemText primary="Log In" />
      </ListItemButton>
      <ListItemButton onClick={(e) => { handleClick('Services & Products') }}>
        <ListItemIcon>
          <FeedIcon style={{ color: theme.palette.button.main }} />
        </ListItemIcon>
        <ListItemText primary="Services & Products" />
      </ListItemButton>
      <ListItemButton onClick={(e) => { handleClick('Switch Model') }}>
        <ListItemIcon>
          <SwapHorizIcon style={{ color: theme.palette.button.main }} />
        </ListItemIcon>
        <ListItemText primary="Switch Model" />
      </ListItemButton>
      <ListItemButton onClick={(e) => { handleClick('Contacts') }}>
        <ListItemIcon >
          <FeedbackIcon style={{ color: theme.palette.button.main }} />
        </ListItemIcon>
        <ListItemText primary="Contacts" />
      </ListItemButton>
      <ListItemButton onClick={(e) => { handleClick('Report Issue') }}>
        <ListItemIcon >
          <SupportAgentIcon style={{ color: theme.palette.button.main }} />
        </ListItemIcon>
        <ListItemText primary="Report Issue" />
      </ListItemButton>
    </React.Fragment>
  )
}
export default ListItems;


{/*export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader style={{ color: theme.palette.primary.contrastText , backgroundColor:theme.palette.primary.main }} component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon style={{ color: theme.palette.button.main }}/>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon style={{ color: theme.palette.button.main }}/>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon style={{ color: theme.palette.button.main }}/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);*/}