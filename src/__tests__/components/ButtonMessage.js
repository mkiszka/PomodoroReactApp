import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonMessage from '../../components/ButtonMessage';
import userEvent from '@testing-library/user-event';

describe('ButtonMessage',() => {
    it('should render only message without button',() => {
        render(<ButtonMessage message='Informaction about something.'></ButtonMessage>);
        const button = screen.queryByRole('button');
        const message = screen.getByRole('textbox')

        expect(button).toEqual(null);
        expect(message.innerHTML).toEqual('Informaction about something.')
                
    })
    it('should render message with two buttons',() => {
        const handleAction = jest.fn();
        const handleCancel = jest.fn();
        render(<ButtonMessage 
            message='Informaction about something.'
            onAction={handleAction}
            onCancel={handleCancel}
            />);
        const buttons = screen.getAllByRole('button');
        const message = screen.getByRole('textbox')
        
        expect(buttons.length).toEqual(2);
        expect(message.innerHTML).toEqual('Informaction about something.')
                
    })
    it('should have two clickable buttons', () => {
        //const user = userEvent.
        const handleAction = jest.fn();
        const handleCancel = jest.fn();
        render(<ButtonMessage 
            message='Informaction about something.'
            onAction={handleAction}
            onCancel={handleCancel}
            />);
        const buttons = screen.getAllByRole('button');        
        userEvent.click(buttons[0]);
        userEvent.click(buttons[1]);
        //TODO - it doesn't work, why ?
        // fireEvent(buttons[0],new MouseEvent('click'));
        // fireEvent(buttons[1],new MouseEvent('click'));

        expect(handleAction).toBeCalledTimes(1);
        expect(handleCancel).toBeCalledTimes(1);

        
    });
})