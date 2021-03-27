import React, { useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Item } from '../../hooks/useListView'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
    })
)


const AddItemDialog = (props: any) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Dialog open={props.itemSearchOpen} fullWidth={true} onClose={props.handleItemSearchClose} aria-labelledby='add-item-search'>
                <DialogContent>
                    <Autocomplete 
                        value={props.autocompleteValue}
                        onChange={props.autoCompleteValueChange}
                        filterOptions={props.filterOptions}
                        id='add-item-autocomplete'
                        options={props.options}
                        getOptionLabel={props.getOptionLabel}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={option => option.name}
                        freeSolo
                        renderInput={params => (<TextField {...params} label='Search Item or add new' variant='outlined' />)}
                    />
                </DialogContent>
                <DialogActions>
                        <Button onClick={props.handleItemSearchClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" onClick={props.addItem}>
                            Add
                        </Button>
                    </DialogActions>
            </Dialog>
            <Dialog open={props.dialogOpen} onClose={props.dialogClose} aria-labelledby="add-item-dialog-name">
                <form onSubmit={props.addItem}>
                    <DialogTitle id="add-item-dialog-name">Add a new item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={(props.dialogValues as Item).name}
                            onChange={props.dialogNameChange}
                            label="name"
                            type="text"
                        />
                        <TextField
                            margin="dense"
                            id="category"
                            value={(props.dialogValues as Item).category}
                            onChange={props.dialogCategoryChange}
                            label="category"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.dialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}

export default AddItemDialog