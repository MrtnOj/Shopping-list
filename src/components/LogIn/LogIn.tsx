import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import useLogin from './hooks/useLogin'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '../UI/Alert'
import { Link as RouterLink } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        articleTitle: {
            marginTop: '100px'
        },
        logInForm: {
            margin: theme.spacing(2)
        },
        inputs: {
            marginTop: theme.spacing(4)
        },
        addButton: {
            display: "block",
            marginTop: theme.spacing(4),
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        registerContainer: {
            marginTop: theme.spacing(8),
            textAlign: 'center'
        },
        registerText: {
            marginBottom: theme.spacing(1)
        }
    })
)

const LogIn = (props: any) => {
    const classes = useStyles()
    const { 
        message,
        messageType,
        alertOpen,
        loginRedirect,
        handleAlertClose,
        handleUsernameChange,
        handlePasswordChange,
        submitForm,
        handleRegisterSuccessMessage
    } = useLogin()

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const redirect = query.get('redirect')
        if (redirect === 'true') {
            handleRegisterSuccessMessage('User created! You can now log in.')
        }
    }, [props.location.search])

    return (
        <Container component='article' maxWidth='sm'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                Log In
            </Typography>
            <form className={classes.logInForm} onSubmit={submitForm}>
                <TextField
                    required
                    id='username'
                    label='Username'
                    variant='outlined'
                    onChange={handleUsernameChange}
                    fullWidth={true}
                    className={classes.inputs}
                />
                <TextField
                    required
                    id='password'
                    label='Password'
                    type='password'
                    variant='outlined'
                    onChange={handlePasswordChange}
                    fullWidth={true}
                    className={classes.inputs}
                />
                <Button 
                    type="submit" 
                    className={classes.addButton} 
                    variant='contained' 
                    size='large' 
                    color='secondary'
                >
                    Log In
                </Button>
            </form>
            <Box component="section" className={classes.registerContainer}>
                <Typography 
                    variant='h5' 
                    component='h2' 
                    className={classes.registerText} 
                    color='primary' 
                    align='center'
                >
                    New to the app?
                </Typography>
                <Button 
                    type="button" 
                    color='secondary' 
                    size='large' 
                    component={RouterLink} 
                    to='/register'
                >
                    Sign Up Here
                </Button>
            </Box>
            <Snackbar open={alertOpen} autoHideDuration={9000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={messageType === 'error' ? 'error' : 'success'}>
                    {message}
                </Alert>
            </Snackbar>
            {loginRedirect ? <Redirect to="/createlist" /> : null}
        </Container>
    )
}

export default LogIn