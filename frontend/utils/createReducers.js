function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type]
        return reducer ? reducer(state, action.payload) : state
    }
}

export default function createReducers(reducersMap) {
    const result = {}
    Object.keys(reducersMap).forEach(key => {
        const {initialState, reducers} = reducersMap[key]
        result[key] = createReducer(initialState, reducers)
    })
    return result
}
