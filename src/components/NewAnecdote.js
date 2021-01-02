import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

    const createNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
        props.showMessage(`you created new anecdote ${content}`, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    {addAnecdote, showMessage}
)(NewAnecdote)