import React from 'react'
import useMyLists from './hooks/useMyLists'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '100px 10px 60px 10px'
        },
        listTiles: {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: theme.spacing(4),
            padding: theme.spacing(2),
            width: '100%',
            height: '80px'
        }
    })
)

const MyLists = (props: any) => {
    const classes = useStyles()
    const { myLists } = useMyLists()

    const listTiles = myLists.map(list => {
        return (
            <Paper 
                className={classes.listTiles} 
                elevation={3} 
                component='section' 
                key={list.id}
                onClick={() => props.history.push({ pathname: '/mylists/' + list.id})}
            >
                <Typography variant='h4' color='secondary' align='center' component='h2'>
                    List ID: {list.id}
                </Typography>
                <Typography variant='h6' color='secondary' align='center' component='h3'>
                    Created: {list.createdAt}
                </Typography>
            </Paper>
        )
    })

    return (
        <Container component='article' maxWidth='md'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                My lists
            </Typography>
            {listTiles}
        </Container>
    )
}

export default MyLists