import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ButtonMessage from '../../components/ButtonMessage';

describe('ButtonMessage',() => {
    it('should render only message with button',() => {
        render(<ButtonMessage message='Informaction about something.'></ButtonMessage>);
        const button = screen.getByRole('button');
        const message = screen.getByRole('textbox')

        expect(button.textContent).toEqual('close');
        expect(message.innerHTML).toEqual('Informaction about something.')
                
    })
})