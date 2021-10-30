import {Search} from 'semantic-ui-react'
import _ from 'lodash'
import React from 'react'
import { BrowserRouter as Router, useHistory} from "react-router-dom";
import { useRef, useCallback, useEffect, useReducer, useState } from "react";
import unitsService from './services/units'

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

function UnitSearch() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { loading, results, value } = state

    let history = useHistory()
    
    const timeoutRef = useRef()
    
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ 
            type: 'START_SEARCH', 
            query: data.value 
        })

        if (data.value.length === 0) {
            dispatch({ type: 'CLEAN_QUERY' })
            return
        }

        timeoutRef.current = setTimeout(() => {
            unitsService.searchUnits(data.value)
                .then(objects => {
                    let data = objects.data
                    dispatch({
                        type: 'FINISH_SEARCH',
                        results: data,
                    })
                })
        }, 500)
    }, [results])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const resultRenderer = (results) => {
        return (
            <div>
                {results.code} - {results.title}
            </div>
        )
    }

    return (
            <Search
            loading={loading}
            onResultSelect={(e, data) =>
                history.push("/unit/"+data.result._id)
            }
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
            />
    )
}

export default UnitSearch