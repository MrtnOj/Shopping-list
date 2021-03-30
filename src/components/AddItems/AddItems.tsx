import React, { useState, useEffect } from 'react';
import useAddItems from './hooks/useAddItems'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        articleTitle: {
            marginTop: '100px'
        },
        addItemForm: {
            margin: theme.spacing(4)
        },
        inputs: {
            marginTop: theme.spacing(2)
        },
        addButton: {
            display: "block",
            marginTop: theme.spacing(2)
        }
    })
);

const AddItems = () => {
    const classes = useStyles();
    const { 
        itemName, 
        categories, 
        category, 
        itemLasts, 
        handleNameChange, 
        submitItem, 
        handleCategoryChange, 
        handleItemLastsChange,
        filterOptions,
        getOptionLabel,
    } = useAddItems();

    return(
        <Container component='article' maxWidth='md'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                Add an item
            </Typography>
            <form className={classes.addItemForm} onSubmit={submitItem}>
                <TextField 
                    required
                    id='item-name'
                    label='Item name'
                    variant='outlined'
                    fullWidth={true}
                    value={itemName}
                    onChange={handleNameChange}
                    className={classes.inputs}
                />
                <Autocomplete 
                    value={category}
                    onChange={handleCategoryChange}
                    filterOptions={filterOptions}
                    id='category-autocomplete'
                    options={categories}
                    getOptionLabel={getOptionLabel}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={option => option.name}
                    freeSolo
                    renderInput={params => (<TextField {...params} label='category' variant='outlined' className={classes.inputs}/>)}
                />
                <TextField 
                    id='item-name'
                    label='Lasts (days)'
                    variant='outlined'
                    value={itemLasts}
                    onChange={handleItemLastsChange}
                    className={classes.inputs}
                />
                <Button type="submit" className={classes.addButton} variant='contained' color='secondary'>
                    Add
                </Button>
            </form>
        </Container>
    )
}

export default AddItems;