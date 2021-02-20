import React, { useState, useEffect } from 'react';
import useSuggestions from './hooks/suggestions';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import suggestionsList from './tempList';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: '30px 0',
            width: '45%'
        },
        searchInput: {
            display: 'block',
            maxWidth: 450,
            margin: '0 auto'
        },
        suggestionList: {
            maxHeight: 300,
            overflow: 'auto'
        }
    })
)

const ItemSuggest = () => {
    const classes = useStyles()
    const { suggestions, inputChanged } = useSuggestions()

    // useEffect(() => {
        
    // }, [suggestions, inputChanged])

    return (
        <React.Fragment>
            <TextField id="item-search" className={classes.searchInput} label="Search Item" variant="outlined" fullWidth={true} onChange={inputChanged}/>
            <Box component="section" className={classes.container}>
                <List className={classes.suggestionList}subheader={<li />}>
                    {suggestions.map(suggestion => (
                        <ListItem key={suggestion.id} button>
                            <ListItemText id={suggestion.name} primary={suggestion.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </React.Fragment>
    )
}

export default ItemSuggest;