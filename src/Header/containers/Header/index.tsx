import React, {useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MobileNavBar from '../../components/MobileNavBar';
import DesktopNavBar from '../../components/DesktopNavBar';



const Header = () => {

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const { mobileView } = state
    const { drawerOpen } = state

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true }))
                : setState((prevState) => ({...prevState, mobileView: false }))
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness())
    }, [])

    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));

    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    
    return (
        <AppBar color='primary' position='fixed'>
            {mobileView 
                ? <MobileNavBar 
                    openDrawer={handleDrawerOpen} 
                    closeDrawer={handleDrawerClose}
                    drawerOpen={drawerOpen}
                    /> 
                : <DesktopNavBar />}
        </AppBar>
    )
}

export default Header;