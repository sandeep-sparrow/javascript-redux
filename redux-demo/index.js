const redux = require('redux');
const reduxLogger = require('redux-logger');

const applyMiddlerWare = redux.applyMiddleware;
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const logger = reduxLogger.createLogger();


const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTOCK = 'ICE_CREAM_RESTOCK';

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
const initialState = {
    numOfCakes: 10,
    numOfBags: 10,
    numOfIceCream: 10,
}

// reducers 
const reducer = (state = initialState, action) => {
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
            return{
                ...state,
                numOfIceCream: state.numOfIceCream - action.payload,
            }
        case ICE_CREAM_RESTOCK:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload,
            }
        default:
            return state;
    }
}

// create redux store, createStore(reducer);
const store = createStore(reducer, applyMiddlerWare(logger));
console.log('Initial state', store.getState());


// listener
const unsubscribe = store.subscribe(() => {});

// store.dispatch(action);
// dispatch action -> match the action to -> reducer -> update the state

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream(5);
actions.restockIceCream(3);

unsubscribe();