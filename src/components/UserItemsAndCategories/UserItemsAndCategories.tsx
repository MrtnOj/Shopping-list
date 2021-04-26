import React from 'react'
import Container from '@material-ui/core/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './components/TabPanel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import useUserItemsAndCategories from './hooks/useUserItemsAndCategories'
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

    const { items,
        categories,
        tabValue,
        handleTabChange,
        deleteItem
    } = useUserItemsAndCategories()

    return (
        <Container component='article' maxWidth='sm' className={classes.container}>
            <Tabs 
                value={tabValue}
                variant='fullWidth'
                aria-label="user-items-navigation-tabs"
                className={classes.tabs}
                onChange={handleTabChange}
            >
                <Tab label="Items" />
                <Tab label="Categories" />
                <Tab label="Recipes" disabled />
            </Tabs>
            <TabPanel value={tabValue} index={0} content={items} deleteElement={deleteItem}/>
            <TabPanel value={tabValue} index={1} content={categories} />
        </Container>
    )
}

export default UserItemsAndCategories
