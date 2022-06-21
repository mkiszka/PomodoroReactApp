import React from "react";
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import TimeboxListElement from "../../components/TimeboxListElement";

describe('TimeboxListElement', () => {
    afterEach(cleanup);

    it(' can be edited', () => {

        const { baseElement, debug, getByTitle, getByRole } = render(<TimeboxListElement />);
        const title = getByRole('textbox');
        expect(title).toBeDisabled();
        
        const editButton = getByTitle('edytuj');        
        fireEvent((editButton), new MouseEvent('click'));
                
        expect(title).not.toBeDisabled();
        
       debug();
    });


});