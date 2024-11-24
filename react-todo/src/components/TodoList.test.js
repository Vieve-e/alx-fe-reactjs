import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from './TodoList';
import TodoForm from './AddTodoForm';


describe('TodoList component', () => {
  test('renders the todo list', () => {            // Initial rendering of the TodoList component
    const { getByText } = render(<TodoList />);
    expect(getByText('Learn Coding')).toBeInTheDocument();
    expect(getByText('Build Projects')).toBeInTheDocument();
    expect(getByText('Do laundry')).toBeInTheDocument();
  });

 
  test('toggles the todo completed state', () => {
    const { getByLabelText } = render(<TodoList />);
    const checkbox = getByLabelText('Learn Coding');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  // Test for adding a todo item
  test('adds a new todo item', () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText('Enter a new todo');
    const addButton = getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(getByText('New Todo')).toBeInTheDocument();
  });
 
 // Test for toggling between completed and not completed
  test('toggles between completed and not completed', () => {
    const { getByLabelText, getByText } = render(<TodoList />);
    const checkbox = getByLabelText('Learn Coding');
    const todoText = getByText('Learn Coding');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(todoText).toHaveStyle('textDecoration: line-through');

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(todoText).not.toHaveStyle('textDecoration: line-through');
  });

 // Test for deleting a todo item
  test('deletes a todo item', () => {
    const { getByText, queryByText } = render(<TodoList />);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(queryByText('Learn Coding')).not.toBeInTheDocument();
  });

  // Test to show that the correct number of todo items is rendered
  test('renders the correct number of todo items', () => {
    const { getAllByRole } = render(<TodoList />);
    const todoItems = getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
  });
});