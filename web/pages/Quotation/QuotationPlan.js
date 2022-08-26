import * as React from 'react';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import VerticalLinearStepper from './Stepper';

const drawerWidth = 240;

export default function QuotationPlan({children}) {
  return (
    <Paper sx={{ display: 'flex', overFlow: 'auto', p:3, width: drawerWidth }}>

<VerticalLinearStepper></VerticalLinearStepper>
    </Paper>
  );
}
