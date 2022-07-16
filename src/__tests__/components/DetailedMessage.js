import React from 'react';
import {render, screen, within} from '@testing-library/react';
import DetailedMessage  from '../../components/DetailedMessage'

describe('DetailedMessage',() => {
    it('should generate message with details',() => {
        render(<DetailedMessage summaryMessage="Short comment, summary" detailsMessage="Long description of message. May explain error from message"/>);
        const details = screen.getByRole("group");
        //const details2 = screen.getByRole("group");

        const summaryMessage = within(details).getByRole("button");
        // const summaryMessage = within(details).getByTestId("alamakota");
        const detailsMessage = within(details).getByRole("textbox");
        expect(summaryMessage.innerHTML).toEqual("Short comment, summary");
        expect(detailsMessage.innerHTML).toEqual("Long description of message. May explain error from message");
    })
})