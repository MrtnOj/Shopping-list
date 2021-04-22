import React from 'react'
import useListView from '../../hooks/useListView'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
    })
)

const ListCompleteDialog = (props: any) => {
    const classes = useStyles()
    return(
        <Dialog 
            open={props.open} 
            onClose={props.handleClose} 
            aria-labelledby='finish-dialog'
        >
            <DialogTitle id='finish-dialog'>{'Mark shopping complete?'}</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    No, I forgot something
                </Button>
                <Button onClick={props.handleFinished} color="secondary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )   
}

export default ListCompleteDialog