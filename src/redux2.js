import { createStore, combineReducers} from 'redux';
import { v4 as uuidv4 } from 'uuid';

//action generators
const addExpense = ({description='',note='',amount=0,createdAt=0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id }={}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpenses = (id,updates) => ({
    type: 'EDIT_EXPENSES',
    id,
    updates
});

const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const expensesReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter((eachExpense) => eachExpense.id!==action.id);
        case 'EDIT_EXPENSES':
            return state.map((eachExpense) => {
                if(eachExpense.id===action.id){
                    return {
                        ...eachExpense,
                        ...action.updates
                    };
                }else {
                    return eachExpense;
                }
            });
        default:
            return state;
    };
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    };
}

//filtering fn
const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number'||expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number'||expense.createdAt <= endDate; 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch&&endDateMatch&&textMatch;
    }).sort((a,b) => {
        if(sortBy==='date'){
            return a.createdAt<b.createdAt ? 1 : -1;
        }else if(sortBy==='amount') {
            return a.amount<b.amount ? 1 : -1;
        }
    });
};

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000}));

const expense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -100001000}));

// store.dispatch(removeExpense({ id: expense1.expense.id}));

// store.dispatch(editExpenses(expense2.expense.id,{amount:500}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());


const demoState = {
    expenses: [{
        id: 'kjkln',
        description: 'rent',
        note: 'bla',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};