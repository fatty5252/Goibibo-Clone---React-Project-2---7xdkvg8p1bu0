import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import AdbIcon from '@mui/icons-material/Adb';
import "../styles/Navbar.css";
import { useNavigate, NavLink } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import Login from './Login';



const pages = ['Flights', 'Hotels', 'Trains', 'Bus'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function Navbar() {
  const { getToken, getName, loginpop, setLoginpop, onTokenHandler, onNameHandler } = useUser();
  // const [loginpop, setLoginpop] = useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    onTokenHandler(null);
    onNameHandler("");
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };
  return (
    <div>
      <AppBar sx={{position:'relative'}}>
        {loginpop && <Typography sx={{position:'absolute', top:'4rem'}}> <Login setLoginpop={setLoginpop} loginpop={loginpop} /> </Typography>}
        <Container maxWidth="xl" className='container-nav'>
          <Toolbar disableGutters >
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <NavLink to={'/'}><img src='logo2.png' style={{ width: '100px' }} /></NavLink>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
                <NavLink to={'/Flight'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Flights</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to={'/Hotel'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Hotels</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to={'/Train'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Trains</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to={'/Bus'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Bus</Typography>
                  </MenuItem>
                </NavLink>
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <NavLink to={'/'}>
                <img src='logo2.png' style={{ width: '100px' }} />
              </NavLink>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                <NavLink to={'/Fight'}>
                  <Button className='categoryParent'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex', gap: '5px', alignItems: 'center', pl: '50px' }}
                  > <img src='/flight1.png' style={{ width: '40px' }} />
                    <Typography sx={{ color: '#7E7E7E', fontWeight: '800' }}>Flights</Typography>
                  </Button>
                </NavLink>
                <NavLink to={'/Hotel'}>
                  <Button className='categoryParent'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex', gap: '5px', alignItems: 'center', pl: '50px' }}
                  > <img src='/Hotels.png' style={{ width: '40px' }} />
                    <Typography sx={{ color: '#7E7E7E', fontWeight: '800' }}>Hotels</Typography>
                  </Button>
                </NavLink>
                <NavLink to={'/Train'}>
                  <Button className='categoryParent'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex', gap: '5px', alignItems: 'center', pl: '50px' }}
                  > <img src='/Trains.png' style={{ width: '40px' }} />
                    <Typography sx={{ color: '#7E7E7E', fontWeight: '800' }}>Trains</Typography>
                  </Button>
                </NavLink>
                <NavLink to={'/Bus'}>
                  <Button className='categoryParent'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex', gap: '7px', alignItems: 'center', pl: '50px' }}
                  > <img src='/Bus.png' style={{ width: '40px' }} />
                    <Typography sx={{ color: '#7E7E7E', fontWeight: '800' }}>Bus</Typography>
                  </Button>
                </NavLink>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                {getToken && <Button className='categoryParent'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'flex', gap: '7px', alignItems: 'center', pl: '50px' }}
                > <BusinessCenterIcon sx={{ color: 'grey' }} />
                  <Box >
                    <Typography sx={{ color: 'blue', fontWeight: '700', textAlign: 'start' }}>My Trips</Typography>
                    <Typography sx={{ color: '#7E7E7E', fontWeight: '700' }}>Manage Booking</Typography>
                  </Box>
                </Button>}

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    {!getToken ? (<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                      <Typography sx={{ border: '2px solid blue', padding: '0.5rem', borderRadius: '5px', color: 'blue' }}>< PersonIcon />Login / Signup<KeyboardArrowDownIcon />
                      </Typography>
                    </IconButton>)
                      : (<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Typography sx={{ border: '2px solid blue', padding: '0.5rem', borderRadius: '5px', color: 'blue' }}>< PersonIcon />{getName}<KeyboardArrowDownIcon />
                      </Typography>
                      </IconButton>)
                    }
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* {settings.map((setting) => ( */}
                      {!getToken ? <MenuItem onClick={handleCloseUserMenu}>
                      {/* <Avatar sx={{visibility:'hidden'}}/> */}
                      <Button variant='contained' sx={{p:'5px 20px'}} onClick={()=>setLoginpop(!loginpop)}>Login / Signup</Button>
                      </MenuItem>
                      :
                      <MenuItem onClick={handleCloseUserMenu}>
                      {/* <Avatar sx={{visibility:'hidden'}}/> */}
                      <Button variant='contained' sx={{p:'5px 20px'}} onClick={()=>logoutHandler()}>Logout</Button>
                      </MenuItem>
                      }
                    {/* ))} */}
                  </Menu>
                </Box>
              </Box>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    </div>
  )
}


export default Navbar