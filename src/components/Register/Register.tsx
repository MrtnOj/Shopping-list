import React from 'react'
import useRegister from './hooks/useRegister'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        articleTitle: {
            marginTop: '100px'
        },
        signUpForm: {
            margin: theme.spacing(2)
        },
        inputs: {
            marginTop: theme.spacing(4)
        },
        registerButton: {
            display: "block",
            marginTop: theme.spacing(4),
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        logInContainer: {
            marginTop: theme.spacing(6),
            textAlign: 'center'
        },
        logInText: {
            marginBottom: theme.spacing(1)
        }
    })
)

const Register = () => {
    const classes = useStyles()
    const {
        username,
        email,
        password,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleRepeatPasswordChange,
        submitForm
        } = useRegister()
    
    return (
        <Container component='article' maxWidth='sm'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                Sign Up
            </Typography>
            <form className={classes.signUpForm} onSubmit={submitForm}>
                <TextField
                    required
                    id='email'
                    label='e-mail'
                    variant='outlined'
                    onChange={handleEmailChange}
                    fullWidth={true}
                    className={classes.inputs}
                />
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
                <TextField
                    required
                    id='repeat-password'
                    label='Repeat password'
                    type='password'
                    variant='outlined'
                    onChange={handleRepeatPasswordChange}
                    fullWidth={true}
                    className={classes.inputs}
                />
                <Button 
                    type="submit" 
                    className={classes.registerButton} 
                    variant='contained' 
                    size='large' 
                    color='secondary'
                >
                    Register
                </Button>
                <Box component="section" className={classes.logInContainer}>
                    <Typography 
                        variant='h5' 
                        component='h2' 
                        className={classes.logInText} 
                        color='primary' 
                        align='center'
                    >
                        Already a user?
                    </Typography>
                    <Button 
                        type="button" 
                        color='secondary' 
                        size='large' 
                        component={RouterLink} 
                        to='/login'
                    >
                        Log In
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default Register