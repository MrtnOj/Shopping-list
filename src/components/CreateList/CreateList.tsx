import React, { useState, useEffect } from 'react';
import ItemSuggest from './components/ItemSuggest';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            marginTop: '100px'
        }
    })
)

const CreateList = () => {
    const classes = useStyles()

    return (
        <Container component='article' maxWidth='lg'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                Create a new list
            </Typography>
            <ItemSuggest />
        </Container>
    )
}

export default CreateList