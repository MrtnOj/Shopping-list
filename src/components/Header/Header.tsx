import React, {useState, useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MobileNavBar from './components/MobileNavBar';
import DesktopNavBar from './components/DesktopNavBar';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const Header = () => {
    const [localState, setLocalState] = useState({
        mobileView: false,
        drawerOpen: false,
        redirectToLogin: false
    })

    const {state, dispatch} = useContext(AuthContext)

    const { mobileView } = localState
    const { drawerOpen } = localState

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setLocalState((prevState) => ({...prevState, mobileView: true }))
                : setLocalState((prevState) => ({...prevState, mobileView: false }))
        };
        setResponsiveness()
        window.addEventListener("resize", () => setResponsiveness())
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')
        setLocalState({...localState, redirectToLogin: true})
    }


    const handleDrawerOpen = () =>
      setLocalState((prevState) => ({ ...prevState, drawerOpen: true }))

      
    const handleDrawerClose = () =>
      setLocalState((prevState) => ({ ...prevState, drawerOpen: false }))

    let loginRedirect = null
    if ( localState.redirectToLogin ) {
        loginRedirect = <Redirect to="/login" />
    }
    
    return (
        <React.Fragment>
            <AppBar color='primary' position='fixed'>
                {mobileView 
                    ? <MobileNavBar 
                        openDrawer={handleDrawerOpen} 
                        closeDrawer={handleDrawerClose}
                        drawerOpen={drawerOpen}
                        logOut={logOut}
                        /> 
                    : <DesktopNavBar logOut={logOut} />}
            </AppBar>
            {loginRedirect}
            <h1 style={{position: 'relative', top: '100px'}}>{state.username}</h1>
        </React.Fragment>
    )
}

export default Header;