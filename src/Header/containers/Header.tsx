import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MobileNavBar from '../components/MobileNavBar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const Header = (props: any) => {

    const [state, setState] = useState({
        mobileView: false
    })
    const { mobileView } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true }))
                : setState((prevState) => ({...prevState, mobileView: false }))
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness())
    }, [])
    
    return (
        <AppBar color='primary' position='fixed'>
            {mobileView ? <MobileNavBar /> : <div>fuck off m8</div>}
        </AppBar>
    )
}

export default Header;