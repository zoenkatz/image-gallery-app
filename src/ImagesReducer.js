export default function ImagesReducer (state, action){
    switch(action.type) {
        case "GET_IMAGES":
            return{
                ...state,
                images: action.payload
            };

        default:
            return state
    }
}
