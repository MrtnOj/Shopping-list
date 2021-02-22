import React from 'react'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: '30px 0',
            width: '48%'
        },
        suggestionList: {
            maxHeight: 300,
            overflow: 'auto'
        }
    })
)

const BuildingList = (props: any) => {
    const classes = useStyles()

    return (
        <Box component="section" className={classes.container}>
            <List className={classes.suggestionList}>
                {props.list.map((listItem: any) => (
                    <ListItem key={listItem.id}>
                        <ListItemText primary={listItem.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default BuildingList