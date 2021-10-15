/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import fs from 'fs'

import { BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../HomePage'

const sampleData = (fileName) => {
    const rawData = fs.readFileSync(fileName)
    const data = JSON.parse(rawData)
    return data
}

describe("Homepage Display", () => {
    test('hompage displays all units', () => {
        const units = sampleData('src/tests/samples/units.json')
        const component = render(
            <Router>
                <HomePage units={units} />
            </Router>
        )

        units.map(u => expect(component.container).toHaveTextContent(u.title))
    })

    test('snapshot test', () => {
        const units = sampleData('src/tests/samples/units.json')

        const component = render(
            <Router>
                <HomePage units={units} />
            </Router>
        )

        expect(component).toMatchSnapshot()
    })
})