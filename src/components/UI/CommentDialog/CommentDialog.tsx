import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
    })
)

const CommentDialog = (props: any) => {
    const classes = useStyles()

    return (
        <Dialog open={props.dialogOpen} onClose={props.dialogClose} aria-labelledby="add-comment-dialog">
            <form onSubmit={props.saveList}>
                <DialogTitle id="add-comment-dialog">Add comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="list-name"
                        onChange={props.nameChange}
                        label="List name"
                        type="text"
                        variant="outlined"
                        value={props.nameValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CommentDialog