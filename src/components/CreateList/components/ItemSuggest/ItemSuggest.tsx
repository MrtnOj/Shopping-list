import React from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ItemList from './tempList';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: '50px auto',
            width: '50%'
        },
        suggestionList: {
            maxHeight: 300,
            overflow: 'auto'
        }
    })
)

const ItemSuggest = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box component="section" className={classes.container}>
                <TextField id="item-search" label="Search Item" variant="outlined" fullWidth={true} />
                <List className={classes.suggestionList}subheader={<li />}>
                    {ItemList.map(item => (
                        <ListItem key={item.id} button>
                            <ListItemText id={item.name} primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </React.Fragment>
    )
}

export default ItemSuggest;