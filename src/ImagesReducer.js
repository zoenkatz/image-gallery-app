export default function ImagesReducer (state, action){
    switch(action.type) {
        case "GET_IMAGES":
            return{
                ...state,
                images: action.payload
            };

        case "ADD_TODO":
            // if(!action.payload){
            //     return state;
            // }
            //
            // if(state.todos.findIndex(todo => todo.text === action.payload) > -1){
            //     return state;
            // }

            const addedTodos = [...state.todos, action.payload];
            return {
                ...state,
                todos: addedTodos
            };

        case "UPDATE_TODO":
            const updateTodo = {...action.payload};
            const updatedTodoIndex = state.todos.findIndex(todo => todo.id === state.currentTodo.id);
            const updatedTodos = [...state.todos.slice(0, updatedTodoIndex), updateTodo, ...state.todos.slice(updatedTodoIndex + 1)];

            // if(!action.payload){
            //     return state;
            // }
            //
            // if(state.todos.findIndex(todo => todo.text === action.payload) > -1){
            //     return state;
            // }

            return {
                ...state,
                currentTodo: {},
                todos: updatedTodos
            };

        case "SET_CURRENT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            };

        case "TOGGLE_TODO":
            const toggleTodos = state.todos.map((todo) => {
                return todo.id === action.payload.id ?
                    action.payload : todo
            });
            return {
                ...state,
                todos: toggleTodos
            };

        case "REMOVE_TODO":
            const filteredTodos = state.todos.filter(todo => todo.id !== action.payload.id);
            const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
            return {
                ...state,
                currentTodo: isRemovedTodo,
                todos: filteredTodos
            };

        default:
            return state
    }
}
