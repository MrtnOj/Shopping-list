import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const categories = [
    {
        value: 'dairy',
        label: 'Dairy'
    },
    {
        value: 'meat',
        label: 'Meat'
    },
    {
        value: 'carbs',
        label: 'Carbs'
    },
    {
        value: 'vegetable',
        label: 'Vegetable'
    },
    {
        value: 'fruit',
        label: 'Fruit'
    },
    {
        value: 'sandwich material',
        label: 'Sandwich material'
    },
    {
        value: 'spice',
        label: 'Spice'
    }
]

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
    const [category, setCategory] = useState('')

    const categorySelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value)
    }

    return(
        <Container component='article' maxWidth='lg'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                Add an item
            </Typography>
            <form className={classes.addItemForm}>
                <TextField 
                    required
                    id='item-name'
                    label='Item name'
                    variant='outlined'
                    fullWidth={true}
                    className={classes.inputs}
                />
                <TextField 
                    id='workout-type'
                    select
                    label='Category'
                    variant='outlined'
                    fullWidth={true}
                    value={category}
                    onChange={categorySelectChange}
                    className={classes.inputs}
                >
                    {categories.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField 
                    id='item-name'
                    label='Lasts (days)'
                    variant='outlined'
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