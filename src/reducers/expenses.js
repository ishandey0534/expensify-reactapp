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

export default expensesReducer;