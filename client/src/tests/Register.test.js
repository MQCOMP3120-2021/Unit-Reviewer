/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import fs from 'fs'
 
import { BrowserRouter as Router } from 'react-router-dom'
import RegisterForm from '../userAuth/RegisterForm'

describe("Register errors", () => {
    test('form all empty submit', () => {
        const setUser = jest.fn(() => done())

        const component = render(
            <Router>
                <RegisterForm setUser={setUser} />
            </Router>
        )

        const submitButton = component.getByTestId("buttonSubmit")
        fireEvent.click(submitButton)
        expect(component.container).toHaveTextContent("username field is empty")
        expect(component.container).toHaveTextContent("password field is empty")
    })

    test('form passwords empty submit', () => {
        const setUser = jest.fn(() => done())

        const component = render(
            <Router>
                <RegisterForm setUser={setUser} />
            </Router>
        )

        const username = component.getByTestId('username').querySelector('input')
        fireEvent.change(username, { target: { value: 'hi' } })
        
        const submitButton = component.getByTestId("buttonSubmit")
        fireEvent.click(submitButton)
        expect(component.container).toHaveTextContent("password field is empty")
        
    })
    test('form re-enter password empty submit', () => {
        const setUser = jest.fn(() => done())

        const component = render(
            <Router>
                <RegisterForm setUser={setUser} />
            </Router>
        )

        const username = component.getByTestId('username').querySelector('input')
        const password = component.getByTestId('password').querySelector('input')
        const password2 = component.getByTestId('password2').querySelector('input')
        fireEvent.change(username, { target: { value: 'hi' } })
        fireEvent.change(password, { target: { value: 'hello' } })
        fireEvent.change(password2, { target: { value: 'hello2' } })
        
        const submitButton = component.getByTestId("buttonSubmit")
        fireEvent.click(submitButton)
        expect(component.container).toHaveTextContent("password fields do not match")
        
    })
})
