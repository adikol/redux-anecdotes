import anecdoteService from '../services/anecdotes'

export const voteFor = (id, newObject) => {
  return async dispatch => {
  const setObj = await anecdoteService.setVotes(id, newObject)
  const votes = setObj.votes
  dispatch({
    type: "VOTE",
    data: {id, votes}
  })
}
}

export const addAnecdote = (content) => {
  return async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch({
    type: "NEW_ANECDOTE",
    newAnecdote
  })
}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log('initializeAnecdotes: ' , anecdotes)
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type)
  {
    case 'VOTE': {
      const acecdoteToChange =  state.find(n => n.id === action.data.id)
      const changedAnecdote = {
        ...acecdoteToChange,
        votes: action.data.votes
      }
      return state.map(anecdote => anecdote.id === action.data.id ? changedAnecdote : anecdote)
    }
    case 'NEW_ANECDOTE':
      return [...state, action.newAnecdote]
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export default reducer