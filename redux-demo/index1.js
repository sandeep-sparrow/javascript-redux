const redux = require('redux');
const produce = require('immer').produce;

// create store
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';

// action in Redux
function orderCake(qty = 1)
{
    return {
        type: CAKE_ORDERED,
        payload: qty,
    }
};


function restockCake(qty = 1)
{
    return {
        type: CAKE_RESTOCK,
        payload: qty,
    }
};

const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTOCK = 'ICE_CREAM_RESTOCK';

function orderIceCream(qty = 1){
    return {
        type: ICE_CREAM_ORDERED,
        payload: qty,
    }
};

function restockIceCream(qty = 1){
    return {
        type: ICE_CREAM_RESTOCK,
        payload: qty,
    }
};

// initial state object of the application
const initialCakeState = {
    numOfCakes: 10,
    numOfBags: 10,
}

const initialIceCreamState = {
    numOfIceCream: 10,
}

// reducers 
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload,
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICE_CREAM_ORDERED:
            return{
                ...state,
                numOfIceCream: state.numOfIceCream - action.payload,
            }
        case ICE_CREAM_RESTOCK:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload,
            }
        case CAKE_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1,
            }
        default:
            return state;
    }
}

// combine reducers
const rootReducer = combineReducers({
        cake: cakeReducer, 
        iceCream: iceCreamReducer
});

// create redux store, createStore(reducer);
const store = createStore(rootReducer)
console.log('Initial state: ', store.getState());


// listener
const unsubcribe = store.subscribe(() => console.log('Updated state: ', store.getState()));

// store.dispatch(action);
// dispatch action -> match the action to -> reducer -> update the state

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream(5);
actions.restockIceCream(3);

unsubcribe();