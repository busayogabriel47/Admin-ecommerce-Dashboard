import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { Link, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import orders from '../assets/order.png';
import dash from '../assets/dashboard.png'
import Products from '../Pages/Products/Products';
import Dashboard from '../Pages/Dashboard/Dashboard';
import SingleProduct from '../Pages/Products/SingleProduct';

import BrandList from '../Pages/Brands/BrandList';
import AddBrand from '../Pages/Brands/AddBrand';
import AddProduct from '../Pages/Products/AddProduct';
import AddCategory from '../Pages/Categories/AddCategories';
import CategoryList from '../Pages/Categories/CategoryLists';
import ColorList from '../Pages/Colors/ColorList';
import AddColor from '../Pages/Colors/CreateColors';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: 'white', // Optional: Set text color for better contrast
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'black', // Set black background for the drawer
    color: 'white', // Optional: Set text color to white for better contrast
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Main() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [catalogOpen, setCatalogOpen] = React.useState(false);
  const [blogOpen, setBlogOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCatalogToggle = () => {
    setCatalogOpen(!catalogOpen);
  };

  const handBlogToggle = () => {
    setBlogOpen(!blogOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='text-white'>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <img src={dash} alt="Dashboard" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>  

              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </ListItem>
          {/* Catalog */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleCatalogToggle}>
              <ListItemIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Catalog" />
              {catalogOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {/* */}
          <Collapse in={catalogOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { text: 'Add Product', path: '/add-product' },
                { text: 'Product List', path: '/products' },
                { text: 'Brand', path: '/add-brand' },
                { text: 'Brand List', path: '/brand-list' },
                { text: 'Category', path: '/add-category' },
                { text: 'Category List', path: '/category-list' },
                { text: 'Color', path: '/color' },
                { text: 'Color List', path: '/color-list' },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.path} sx={{ pl: 4 }}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          {/* Order */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/orders">
              <ListItemIcon>
                <img src={orders} alt="Orders" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>



          {/*Blog */}

          <ListItem disablePadding>
            <ListItemButton onClick={handBlogToggle}>
              <ListItemIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Blog" />
              {blogOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {/* */}
          <Collapse in={blogOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { text: 'Add Blog', path: '/add-product' },
                { text: 'Blog List', path: '/products' },
                { text: 'Add Blog Category', path: '/brand' },
                { text: 'Blog Category List', path: '/brand-list' }
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.path} sx={{ pl: 4 }}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

        </List>
      </Drawer>
      <Box className="bg-[#OOO] min-h-[100vh]" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/singlePro" element={<SingleProduct />} />
          <Route  path='/add-brand' element={<AddBrand/>}/>
          <Route  path='/brand-list' element={<BrandList/>}/>
          <Route  path='/add-category' element={<AddCategory/>}/>
          <Route  path='/category-list' element={<CategoryList/>}/>
          <Route  path='/color-list' element={<ColorList/>}/>
          <Route  path='/color' element={<AddColor/>}/>
        </Routes>
      </Box>
    </Box>
  );
}
