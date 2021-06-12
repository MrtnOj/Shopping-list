import React from 'react'
import ListElement from '../../../UI/ListElement'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core'

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
            minHeight: '350px',
        },
        wideScreenListPaper: {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(5) ,
            width: '100%',
            minHeight: '350px',
        },
        list: {
            marginBottom: theme.spacing(3),
            boxSizing: 'border-box',
            overflow: 'auto'
        },
        widescreenList: {
            paddingBottom: theme.spacing(6)
        },
        listItemText: {
            flexGrow: 'unset',
            marginRight: theme.spacing(1)
        }
    })
)

const ListPaper = (props: any) => {
    const classes = useStyles()
    const widescreen = useMediaQuery('(min-width:600px)')

    return (
        <Paper  className={widescreen ? classes.wideScreenListPaper : classes.listPaper} elevation={3} component='section'>
            <List className={widescreen ? classes.widescreenList : classes.list}>
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