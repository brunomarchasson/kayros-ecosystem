import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import { childrenProps } from '../proptypes';

const drawerWidth = 240;


function ListItemLink(props) {
  return (
    <li>
      <RouterLink { ...props } role={ undefined } />
    </li>
  );
}

function AppLayout(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navItems = [{ route: 'home', label: t('menu.home') }, { route: 'quotation', label: t('menu.quotation') }];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => logout();

  const drawer = (
    <Box onClick={ handleDrawerToggle } sx={ { textAlign: 'center' } }>
      <Typography variant="h6" sx={ { my: 2 } }>
        KAYROS
      </Typography>
      <Divider />
      <List>
        { navItems.map((item) => (
          <ListItemLink key={ item.route } to={ `/${item.route}` } primary={ item } />
        )) }
      </List>
    </Box>
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <Box sx={ { display: 'flex', height: '100vh' } }>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={ handleDrawerToggle }
            sx={ { mr: 2, display: { sm: 'none' } } }
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={ { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }
          >
            KAYROS
          </Typography>
          <Box sx={ { display: { xs: 'none', sm: 'block' } } }>
            { navItems.map((item) => (
              <Button
                key={ item }
                component={ RouterLink }
                to={ `/${item.route}` }
                sx={ { color: '#fff' } }
              >
                { item.label }
              </Button>
            )) }
          </Box>
          <Box sx={ { flexGrow: 0 } }>
            <Tooltip title="Open settings">
              <IconButton onClick={ handleOpenUserMenu } sx={ { p: 0 } }>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={ { mt: '45px' } }
              id="menu-appbar"
              anchorEl={ anchorElUser }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              keepMounted
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              open={ Boolean(anchorElUser) }
              onClose={ handleCloseUserMenu }
            >

              <MenuItem onClick={ handleLogout }>
                <Typography textAlign="center">logout</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={ mobileOpen }
          onClose={ handleDrawerToggle }
          ModalProps={ {
            keepMounted: true, // Better open performance on mobile.
          } }
          sx={ {
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          } }
        >
          { drawer }
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={ { width: '100%', display: 'flex', flexDirection: 'column' } }
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  );
}

AppLayout.propTypes = {
  children: childrenProps,
};

export default AppLayout;
