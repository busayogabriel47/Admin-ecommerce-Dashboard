import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';





import Dashboard from "../Pages/Dashboard";
import Header from './header';
import Sidebar from './sidebar';




{/* Main Layout for Sidebar, Header, and Pages Navaigationn*/}
export default function Main() {

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
      };


      const handleDrawerClose = () => {
        setOpen(false);
      };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Header*/}
      <Header open={open} handleDrawerOpen={handleDrawerOpen}/>

      {/* Sidebar drawer*/}
        <Sidebar open={open} handleDrawerClose={handleDrawerClose}/>
      <Dashboard/>
    </Box>
  );
}