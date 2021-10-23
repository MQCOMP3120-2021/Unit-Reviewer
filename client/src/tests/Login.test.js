/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import fs from 'fs'

import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from '../userAuth/LoginForm'

describe("Login errors", () => {
    test('form all empty submit', () => {
        const getUser = jest.fn(() => done())

        const component = render(
            <Router>
                <LoginForm getUser={getUser} />
            </Router>
        )

        const submitButton = component.getByTestId("buttonSubmitLog")
        fireEvent.click(submitButton)
        expect(component.container).toHaveTextContent("username field is empty")
        expect(component.container).toHaveTextContent("password field is empty")
    })

    test('form passwords empty submit', () => {
        const getUser = jest.fn(() => done())

        const component = render(
            <Router>
                <LoginForm getUser={getUser} />
            </Router>
        )

        const username = component.getByTestId('usernameLog').querySelector('input')
        fireEvent.change(username, { target: { value: 'hi' } })
        
        const submitButton = component.getByTestId("buttonSubmitLog")
        fireEvent.click(submitButton)
        expect(component.container).toHaveTextContent("password field is empty")
        
    })
    test('form username empty submit', () => {
        const getUser = jest.fn(() => done())

        const component = render(
            <Router>
                <LoginForm getUser={getUser} />
            </Router>
        )

        const username = component.getByTestId('usernameLog').querySelector('input')
        fireEvent.change(username, { target: { value: 'hi' } })
        
        const submitButton = component.getByTestId("buttonSubmitLog")
        fireEvent.click(submitButton)
        expect(component.container).toHaveTextContent("password field is empty")
        
    })
})