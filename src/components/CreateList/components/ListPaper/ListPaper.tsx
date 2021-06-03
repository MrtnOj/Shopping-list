import React from 'react'
import ListElement from '../../../UI/ListElement'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listPaper: {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3) ,
            width: '100%',
            minHeight: '350px'
        },
        list: {
            marginBottom: '4rem'
        },
        saveButton: {
            position: 'fixed',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)'
        },
        wideScreenSaveButton: {
            position: 'absolute',
            width: '12rem',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        listItemText: {
            flexGrow: 'unset',
            marginRight: theme.spacing(1)
        }
    })
)

const ListPaper = (props: any) => {
    const classes = useStyles()

    return (
        <Paper  className={classes.listPaper} elevation={3} component='section'>
            <List className={classes.list}>
                {props.list.items.map((item: any) => {
                    return (
                        <ListElement
                            id={item.id}
                            name={item.name}
                            comment={item.comment}
                            deleteComment={props.deleteComment}
                            menuAnchorEl={props.menuAnchorEl}
                            closeDotsMenu={props.closeDotsMenu}
                            removeListItem={props.removeListItem}
                            addCommentButtonClicked={props.addCommentButtonClicked}
                            handleDotsClick={props.handleDotsClick}
                        />
                    )
                })}
            </List>
            {props.widescreen && props.saveButton}
        </Paper>
    )
}

export default ListPaper