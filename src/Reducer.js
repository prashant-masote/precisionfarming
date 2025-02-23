// Initial State (Prevent Accidental Mutations)
export const initialState = Object.freeze({
    basket: [],
    user: null,
});

// Selector: Calculate Basket Total
export const getBasketTotal = (basket = []) => 
    basket.reduce((total, item) => total + (item.price || 0), 0);

// Reducer Function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            };

        default:
            console.warn(`⚠️ Unknown action type: ${action.type}`);
            return state;
    }
};

export default reducer;
