import React from 'react'
import useMyLists from './hooks/useMyLists'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '100px 10px 40px 10px'
        },
        listTiles: {
            boxSizing: 'border-box',
            display: 'grid',
            gridColumnGap: '1rem',
            gridRowGap: '10%',
            gridTemplateColumns:
                '4fr 4fr 4fr 4fr',
            gridTemplateRows:
                '50% 40%',
            gridTemplateAreas: `
                "id id date date"
                "useListButton viewListButton . deleteButton"
                `,
            justifyContent: 'space-around',
            marginTop: theme.spacing(2),
            padding: theme.spacing(2),
            width: '100%',
            height: '15vh'
        },
        deleteButton: {
            gridArea: 'deleteButton'
        },
        useListButton: {
            gridArea: 'useListButton'
        },
        viewListButton: {
            gridArea: 'viewListButton'
        },
        id: {
            gridArea: 'id'
        },
        date: {
            gridArea: 'date'
        }
    })
)

const MyLists = (props: any) => {
    const classes = useStyles()
    const { myLists, deleteList } = useMyLists()

    const listTiles = myLists.map(list => {
        return (
            <Paper 
                className={classes.listTiles} 
                elevation={3} 
                component='section' 
                key={list.id}
            >
                <Typography variant='h5' color='secondary' align='center' component='h2' className={classes.id}>
                    {list.name}
                </Typography>
                <Typography variant='h6' color='inherit' align='center' component='h3' className={classes.date}>
                    {list.createdAt?.split('T')[0]}
                </Typography>
                <IconButton 
                    color='inherit'
                    aria-label='delete-list'
                    className={classes.deleteButton}
                    onClick={() => deleteList(list.id)}
                >
                    <DeleteIcon />
                </IconButton>
                <Button 
                    color='primary'
                    variant='contained'
                    className={classes.useListButton}
                    onClick={() => props.history.push({ pathname: '/mylists/use/' + list.id })}
                >
                    Shop
                </Button>
                <Button 
                    color='inherit'
                    variant='contained'
                    className={classes.viewListButton}
                    onClick={() => props.history.push({ pathname: '/mylists/edit/' + list.id })}    
                >
                    View
                </Button>
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