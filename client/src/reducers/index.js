import Posts from './posts'
import UserData from './UserData'
import TokenReducer from './Token'
import { combineReducers } from 'redux'
import SinglePost from './Single'

const AllReducers = combineReducers({
    Posts : Posts,
    UserData : UserData,
    TokenReducer : TokenReducer,
    SinglePost : SinglePost
})

export default AllReducers