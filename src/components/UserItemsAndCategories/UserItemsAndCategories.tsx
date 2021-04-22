import React from 'react'
import Container from '@material-ui/core/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {

        },
        tabs: {
            marginTop: 70
        }
    })
)

const UserItemsAndCategories = () => {
    const classes = useStyles()

    return (
        <Container component='article' maxWidth='sm' className={classes.container}>
            <Tabs value={1} variant='fullWidth' aria-label="simple tabs example" className={classes.tabs}>
                <Tab label="Item One" />
                <Tab label="Item Two" />
            </Tabs>
        </Container>
    )
}

export default UserItemsAndCategories
