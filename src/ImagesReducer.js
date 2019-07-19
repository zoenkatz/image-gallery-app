export default function ImagesReducer (state, action){
    switch(action.type) {
        case "GET_IMAGES":
            return{
                ...state,
                images: action.payload
            };
        case "SET_QUERY":
            return{
                ...state,
                query: action.payload
            };
        default:
            return state
    }
}
