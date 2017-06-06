import React, { Component, PropTypes } from 'react'

export const substitute = '\x1A'

export default class BlockInstruction {
    static gtCompare(property, expression, object) {
        return object[property] > expression
    }
    static ltCompare(property, expression, object) {
        return object[property] < expression
    }
    static baseCompare(property, expression, object) {
        return object[property] === expression
    }
    static containCompare(property, expression, object) {
        return object[property].indexOf(expression) >= 0
    }
    static looseCompare(expression, object) {
        let isAny = false
        for (const property in object) {
            isAny = isAny
            || String.prototype.indexOf.call(object[property], expression) >= 0
        }
        return isAny
    }

    constructor(expression) {
        const compound = expression.split(/[<>=?:]/)
        this.setInvalid()

        if (compound.length > 2) {
            return null
        } else if (compound.length === 2) {
            [this.property, this.expression] = compound
            this.operator = /([<>=?:])/.exec(expression)[1]
            if (this.property && this.expression) {
                this.setValid()
            }
        } else {
            this.setValid()
            this.expression = expression
        }
    }

    append(props) {
        const newBlockInstruction = new BlockInstruction(props)
        if (this.next) {
            newBlockInstruction.next = this.next
            this.next.previous = newBlockInstruction
        }
        this.next = newBlockInstruction
        newBlockInstruction.previous = this

        return newBlockInstruction
    }

    prepend(props) {
        const newBlockInstruction = new BlockInstruction(props)
        if (this.previous) {
            newBlockInstruction.previous = this.previous
            this.previous.next = newBlockInstruction
        }
        this.previous = newBlockInstruction
        newBlockInstruction.next = this

        return newBlockInstruction
    }

    get head() {
        if (this.previous) {
            return this.previous.head
        }
        return this
    }

    get tail() {
        if (this.next) {
            return this.next.tail
        }
        return this
    }

    get next() { return this._next }
    set next(value) { return (this._next = value) }
    get previous() { return this._previous }
    set previous(value) { return (this._previous = value) }

    get isValid() { return this._valid }
    setInvalid() { return (this._valid = false) }
    setValid() { return (this._valid = true) }

    get isComplete() {
        return Boolean(this.operator && this.property && this.expression)
    }

    hasChildren() {
        return Boolean(this.children)
    }

    get children() {
        return this._children
    }

    orphan() {
        if (this.next) this.next.previous = this.previous
        if (this.previous) this.previous.next = this.next
        this.next = null
        this.previous = null
    }

    merge(otherBlock) {
        this.property = this.property || otherBlock.property
        this.operator = this.operator || otherBlock.operator
        this.expression = this.expression || otherBlock.expression
    }

    tryComplete() {
        const next = this.next
        const previous = this.previous

        if (!this.isComplete && this.operator) {
            if (!this.property) {
                if (previous && previous.isValid && !previous.isComplete) {
                    this.property = previous.expression
                    previous.orphan()
                }
            }
            if (!this.expression) {
                if (next && next.isValid && !next.isComplete) {
                    this.expression = next.expression
                    next.orphan()
                }
            }
        }
        if (this.next) return this.next.tryComplete()
        else return this.head
    }

    rehydrate(values) {
        let { expression, property } = this
        while (property && property.indexOf(substitute) >= 0) {
            property = property.replace(substitute, values.shift())
        }
        while (expression && expression.indexOf(substitute) >= 0) {
            expression = expression.replace(substitute, values.shift())
        }
        this.expression = expression
        this.property = property

        this.next && this.next.rehydrate(values)
        return this
    }

    executeRule(rule) {
    }

    compile() {
        const base = this.constructor
        const next = this.next
        const methodChain = (next && next.compile()) || []

        let method
        switch (this.operator) {
            case '>': method = base.gtCompare
                break
            case '<': method = base.gtCompare
                break
            case ':': method = base.containCompare
                break
            case '=': method = base.baseCompare
                break
        }
        if (this.isValid) {
            if (this.isComplete) {
                method = (method).bind(null, this.property, this.expression)
            } else {
                // this should be a match all
                method = (base.looseCompare).bind(null, this.expression)
            }
        }
        if (method) methodChain.unshift(method)
        return methodChain
    }

    execute(list) {
        if (this.children) this.children.map(blockInstruction => blockInstruction())
    }
}
