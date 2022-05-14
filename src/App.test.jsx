import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";

describe('behavior of the shopping list app', () => {
    it('should get the starting state of the app and adding, editing and deleting items', async () => {
        render(
            <App />
        );
        // starting state has one item
        screen.getByText(/items on list: 1/i);

        // finds input box
        const listInput = screen.getByPlaceholderText(/add a new list item/i);
        userEvent.type(listInput, 'forks{enter}');
        userEvent.type(listInput, 'chicken feet{enter}');
        userEvent.type(listInput, 'ox tail{enter}');

        // check if entries are on the list
        screen.getByText('forks');
        screen.getByText('chicken feet');
        screen.getByText('ox tail');

        // test edit function
        const edit = screen.getByLabelText(/edit button for ox tail/i)
        userEvent.click(edit)
        let editInput = screen.getByDisplayValue(/ox tail/i);
        userEvent.type(editInput, '{backspace}{backspace}{backspace}{backspace}{backspace}{backsapce}{backspace}{backspace}new york strip');

        // click the save button
        const save = screen.getByRole('button', { name: /save/i }); 
        userEvent.click(save);
        screen.getByText('new york strip');

        // test the delete fucntion
        const steak = screen.getByText('new york strip');

        const del = screen.getByLabelText(/delete button for new york strip/i);
        userEvent.click(del);

        expect(steak).not.toBeInTheDocument();





        screen.debug();

    })
})