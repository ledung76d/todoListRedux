import { createSelector } from 'reselect';

export const searchFilterSelector = (state) => state.filters.search;
export const todoListSelector = (state) => state.todoList;
export const statusFilterSelector = (state) => state.filters.status;
export const priorityFilterSelector = (state) => state.filters.priority;

export const todosRemainingSelector = createSelector(
    todoListSelector,
    searchFilterSelector,
    statusFilterSelector,
    priorityFilterSelector,
    (todoList, searchText, status, priority) => {
        return todoList.filter(todo => {
            if (status === 'ALL') {
                return priority.length ?
                    todo.name.includes(searchText) && priority.includes(todo.priority)
                    : todo.name.includes(searchText);
            }

            return (todo.name.includes(searchText)
                && (status === 'Completed' ? todo.completed : !todo.completed)
                && (priority.length ? priority.includes(todo.priority) : true));
        })
    }
)