import React from "react";
import { screen, render, cleanup } from '@testing-library/react';
import EditableTimeboxListElement from "../../components/EditableTimeboxListElement";
import { v4 as uuid } from 'uuid';

describe('EditableTimeboxElement', () => {
    let timebox;
    beforeEach(() => {
        timebox = { uid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3};
    });
    it('should set proper value of textarea and input value (title=Wywłanie eventów, totalTimeInMinutes=3)', () => {


        render(<EditableTimeboxListElement
            timebox={timebox}
        />);

        expect(screen.getByRole('textbox').value).toMatch("Wywołanie eventów");
        expect(screen.getByRole('spinbutton').value).toEqual("3");
    })
    it('can be edited', () => {
        
        render(<EditableTimeboxListElement
                timebox={timebox}                
            />);

        expect(screen.getByRole('textbox')).not.toBeDisabled();
        expect(screen.getByRole('spinbutton')).not.toBeDisabled();

    });
    it('has save button', () => {
        
        render(<EditableTimeboxListElement
                timebox={timebox}              
            />);
        expect(screen.getByTitle("zapisz")).toBeInTheDocument();
        expect(screen.queryByTitle("edytuj")).toBeNull();
    });
})