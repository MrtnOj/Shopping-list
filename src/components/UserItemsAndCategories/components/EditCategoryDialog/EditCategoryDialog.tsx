import React from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Category } from '../../../ListView/hooks/useListView'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
    })
)

const EditCategoryDialog = (props: any) => {
    const classes = useStyles()

    return (
        <Dialog open={props.dialogOpen} onClose={props.dialogClose} aria-labelledby="edit-category-dialog">
            <form onSubmit={props.confirmEdit}>
                <DialogTitle id="edit-category-dialog">{props.addOrEdit === 'add' ? 'Add Item' : 'Edit Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={props.dialogValue}
                        onChange={props.nameChange}
                        label="name"
                        type="text"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditCategoryDialog