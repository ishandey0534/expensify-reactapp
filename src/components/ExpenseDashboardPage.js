import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './EpenseListFilters';

const ExpenseDashboardPage = () => {
    return (
        <div>
            <ExpenseListFilters />
            <ExpenseList />
        </div>
    );
};

export default ExpenseDashboardPage;