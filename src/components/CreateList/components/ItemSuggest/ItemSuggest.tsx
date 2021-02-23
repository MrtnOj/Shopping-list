import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: '30px 0',
            width: '48%',
        },
        suggestionList: {
            maxHeight: 300,
            overflow: 'auto'
        }
    })
)

interface Props {
    searchSuggestions: {
            id: number,
            name: string,
            category: string,
            lasts: number
    }[];
    itemClicked: (event: React.MouseEvent<HTMLLIElement>, itemKey: number) => void
}

const ItemSuggest = (props: Props) => {
    const classes = useStyles()

    return (
        <Box component="section" className={classes.container}>
            <List className={classes.suggestionList}>
                {props.searchSuggestions.map((suggestion) => (
                    <ListItem key={suggestion.id} onClick={(event) => props.itemClicked(event, suggestion.id)}>
                        <ListItemText primary={suggestion.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default ItemSuggest;