import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Item } from '../../hooks/useCreateList'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        suggestionsBoxVisible: {
            display: 'block',
            position: 'fixed',
            top: '100px',
            left: '50px',
            right: 50,
            bottom: 100,
            zIndex: 10,
            padding: theme.spacing(1)
        },
        suggestionsBoxHidden: {
            display: 'none'
        },
        suggestionItem: {
            cursor: 'pointer'
        },
        buttonContainer: {
            boxSizing: 'border-box',
            position: 'absolute',
            width: '100%',
            bottom: 0,
            left: 0,
            margin: 0,
            padding: theme.spacing(1),
            borderTop: '1px black solid',
            zIndex: 11
        },
        suggestionList: {
            maxHeight: 400,
            overflow: 'auto'
        }
    })
)

const Suggestions = (props: any) => {
    const classes = useStyles()

    return (
        <Paper
            className={props.toggleSuggestions 
                ? classes.suggestionsBoxVisible 
                : classes.suggestionsBoxHidden
            } 
            elevation={4}
            component='article'
        >
            <List className={classes.suggestionList}>
                {props.items.map((item: Item) => {
                    return (
                        <ListItem 
                            key={item.id} 
                            className={classes.suggestionItem}
                            divider={true}
                        >
                            <ListItemText primary={item.name}/>
                            <ListItemSecondaryAction>
                                <Checkbox 
                                    edge='end'
                                    onChange={() => props.suggestionCheckHandler(item)}
                                    checked={props.checkedSuggestions.indexOf(item) !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem> 
                    )
                })}
            </List>
            <Grid container justify='space-evenly' spacing={2} className={classes.buttonContainer} component='footer'>
                <Grid item>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={props.toggleVisible}
                    >
                        Close
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        color='secondary'
                        variant='contained'
                        disabled={props.checkedSuggestions.length < 1}
                        onClick={props.addItems}
                    >
                        Add Items
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Suggestions