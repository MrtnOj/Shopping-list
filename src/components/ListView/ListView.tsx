import React, { useEffect } from 'react'
import useListView from './hooks/useListView'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '100px 10px 20px 10px'
        },
        listPaper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: theme.spacing(4),
            padding: theme.spacing(2),
            width: '100%'
        }
    })
)

const ListView = (props: any) => {
    const classes = useStyles()
    const { listData, getList } = useListView()

    useEffect(() => {
        getList(props.match.params.listId)
    }, [props.match.params.listId])
    
    return (
        <Container component='article' maxWidth='md'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                Check out the list nr {props.match.params.listId}
            </Typography>
            <Paper 
                className={classes.listPaper} 
                elevation={3} 
                component='div' 
            >
                <Typography variant='h4' color='secondary' align='center' component='h2'>

                </Typography>
                <Typography variant='h6' color='secondary' align='center' component='h3'>

                </Typography>
            </Paper>
        </Container>
    )
}

export default ListView