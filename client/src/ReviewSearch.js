import {Search, Rating} from 'semantic-ui-react'
import _ from 'lodash'
import React from 'react'
import { useState, useRef, useCallback, useEffect, useReducer } from "react";

const initialState = {
    loading: false,
    results: [],
    value: '',
}
  
function reducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
        return initialState
        case 'START_SEARCH':
        return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
        return { ...state, value: action.selection }

        default:
        throw new Error()
    }
}

function ReviewSearch({reviews}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { loading, results, value } = state
    const[search, setSearch] = useState(false)
    
    const timeoutRef = useRef()
    
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
            dispatch({ type: 'CLEAN_QUERY' })
            return
        }

        const re = new RegExp(_.escapeRegExp(data.value), 'i')
        const isMatch = (result) => (re.test(result.author) || re.test(result.content))

        dispatch({
            type: 'FINISH_SEARCH',
            results: _.filter(reviews, isMatch),
        })
        }, 300)
    }, [reviews])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const resultRenderer = (results) => {
        console.log(results)
        return (
            <div>
                {(results.author).charAt(0).toUpperCase() + results.author.slice(1)} - {results.content}
                <p><Rating icon='star' defaultRating={results.rating} disabled maxRating={5} /></p>
            </div>
        )
    }

    return (
            <Search
            loading={loading}
            onResultSelect={(e, data) =>
                <></>
            }
            setSearch={true}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
            input={{ fluid: true }}
            fluid
            />
    )
}

export default ReviewSearch