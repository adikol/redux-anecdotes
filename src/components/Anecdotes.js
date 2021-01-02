import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = (props) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote =>
                <Anecdote key ={anecdote.id} anecdote={anecdote} handleClick={() => {
                    anecdote.votes += 1
                    props.voteFor(anecdote.id, anecdote)
                    props.showMessage(`you voted '${anecdote.content}'`, 5000)
                }} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    const anecdotesList = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    anecdotesList.sort((a, b) => (b.votes > a.votes) ? 1 : ((a.votes > b.votes) ? -1 : 0))

    return{ anecdotes: anecdotesList }
}

const mapDispatchToProps = {
    voteFor,
    showMessage
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes