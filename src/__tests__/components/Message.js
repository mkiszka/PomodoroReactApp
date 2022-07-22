import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../../components/Message';

describe('Message', () => {
    it('should generate simple message', () => {
        render(<Message>Jest tu wiadomość i ona taka powinna być</Message>);
        const tebxtboxes = screen.getAllByRole('textbox');
        expect(tebxtboxes.length).toEqual(1);
        expect(tebxtboxes[0].innerHTML).toEqual("Jest tu wiadomość i ona taka powinna być");
    })
})
 