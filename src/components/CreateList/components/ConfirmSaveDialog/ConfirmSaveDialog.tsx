import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ConfirmSaveDialog = (props: any) => {

    return (
                <Dialog open={props.dialogOpen} onClose={props.dialogClose} aria-labelledby="confirm-save-dialog">
                    <form onSubmit={props.saveList}>
                        <DialogTitle id="confirm-save-dialog">Edit name</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                id="list-name"
                                onChange={props.nameChange}
                                label="List name"
                                type="text"
                                variant="outlined"
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

export default ConfirmSaveDialog