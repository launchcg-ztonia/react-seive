import React, { Component, PropTypes } from 'react'
import BlockInstruction, { substitute } from './blockInstruction'

const noop = i => i

class Sieve extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.state = {
            query: ''
        }

        console.log(this.props)
    }

    onChange(e) {
        const input = e.target
        const query = input.value
        const filters = parseQuery(query)

        this.props.onChange && this.props.onChange(filters)

        this.setState({ query })
    }

    render() {
        const { query } = this.state
        const { name, id, className } = this.props

        return (<input
            type="text"
            name={name}
            id={id}
            className={className}
            onChange={this.onChange}
            value={query}
        />)
    }
}

const quoteRx = /"([^"]*)"/
const unterminatedQRx = /"[^"]*$/

function mapQuotes(query) {
    let sanitizedQuery = query
    const values = []
    let result

    while ((result = quoteRx.exec(sanitizedQuery))) {
        values.push(result[1])
        sanitizedQuery = sanitizedQuery.replace(quoteRx, substitute)
    }

    sanitizedQuery = sanitizedQuery.replace(unterminatedQRx, '')

    return {
        sanitizedQuery,
        quoteBlocks: values
    }
}


function parseQuery(query) {
    const { sanitizedQuery, quoteBlocks } = mapQuotes(query)

    let blocks = sanitizedQuery.split(/\s+/)

    // blocks = blocks.filter(block => !/"/.test(block))
    blocks = blocks.filter(noop)

    const blockList = blocks.reduce((instructions, rawBlock) => {
        if (rawBlock) {
            return instructions ? instructions.append(rawBlock) : new BlockInstruction(rawBlock)
        } else {
            return instructions
        }
    }, null)

    return blockList && blockList.head.rehydrate(quoteBlocks).tryComplete().compile()
}

Sieve.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string
}

export default Sieve
