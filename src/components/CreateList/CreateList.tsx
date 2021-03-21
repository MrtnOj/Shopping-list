import React from 'react'
import useSuggestions from './hooks/useCreateList'
import ItemSuggest from './components/ItemSuggest'
import BuildingList from './components/BuildingList'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '100px 10px 20px 10px'
        },
        listBuildContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        searchInput: {
            display: 'block',
            maxWidth: 450,
            margin: '0 auto'
        },
    })
)

const CreateList = () => {
    const classes = useStyles()
    const { 
        inputChanged,
        itemClicked,
        saveList,
        suggestions,
        searchSuggestions,
        list,
        inputValue
    } = useSuggestions()


    return (
        <Container component='article' maxWidth='lg'>
            <Typography 
                variant='h1' 
                className={classes.articleTitle} 
                color='primary' 
                align='center'
            >
                Create List
            </Typography>
            <TextField 
                id="item-search" 
                value={inputValue} 
                className={classes.searchInput} 
                label="Item search" 
                variant="outlined" 
                fullWidth={true} 
                onChange={inputChanged}
            />
            <Box component='section' className={classes.listBuildContainer}>
                <ItemSuggest searchSuggestions={searchSuggestions} itemClicked={itemClicked}/>
                <BuildingList list={list} />
            </Box>
            <Button 
                type='button' 
                color='secondary' 
                variant='contained' 
                size='large'
                onClick={saveList}
            >
                Save list
            </Button>
        </Container>
    )
}

export default CreateList