import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {setTextFilter,sortByAmount,sortByDate, setStartDate, setEndDate} from '../actions/filters';

class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.state = {
            calendarFocused: null
        };
    }
    onDatesChange({startDate,endDate}) {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange(calendarFocused) {
        this.setState(() => ({ calendarFocused }))
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e) => {
                    this.props.dispatch(setTextFilter(e.target.value));
                }} />
                <select value={this.props.filters.sortBy} onChange={(e) => {
                    if(e.target.value==='date'){
                        this.props.dispatch(sortByDate());
                    }else if(e.target.value==='amount'){
                        this.props.dispatch(sortByAmount());
                    }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId="startDateId"
                    endDate={this.props.filters.endDate}
                    endDateId="endDateId"
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);