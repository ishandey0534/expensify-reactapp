import {createStore} from 'redux';

//action generators
const incrementCount = ({ incBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incBy
});

const decrementCount = ({ decBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const countReducer = (state = {count:0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count+action.incBy
            };
        case 'DECREMENT':
            return {
                count: state.count-action.decBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;   
    }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incBy: 3 }));

store.dispatch(incrementCount());

store.dispatch(incrementCount({ incBy: 6 }));

store.dispatch(decrementCount({ decBy: 5 }));

store.dispatch(decrementCount({ decBy: 6 }));

store.dispatch(resetCount());

store.dispatch(setCount({ count: 50 }));

//unsubscribe();

// store.dispatch({
//     type: 'SET',
//     count: 101
// });



