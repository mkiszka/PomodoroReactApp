import React from "react";
import { screen, render, cleanup } from '@testing-library/react';
import NonEditableTimeboxListElement from "../../components/NonEditableTimeboxListElement";
import { v4 as uuid } from 'uuid';

describe('NonEditableNonEditableTimeboxListElement', () => {
    let timebox;
    let findElement;
    afterEach(cleanup);
    beforeEach(() => {
        findElement = jest.fn().mockReturnValue({ index: 0 })
        timebox = {
            uid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3
        }
    })

    it('cannot be edited', () => {

        render(<NonEditableTimeboxListElement timebox={timebox} findElement={findElement} />);

        expect(screen.queryByRole('textbox')).toBeNull()
        expect(screen.queryByRole('spinbutton')).toBeNull();

    });
    it('has edit button', () => {

        render(<NonEditableTimeboxListElement
            timebox={timebox}            
            findElement={findElement}
        />);

        expect(screen.getByTitle("edytuj")).toBeInTheDocument();
        expect(screen.queryByTitle("zapisz")).toBeNull();
    });
    it('has start button', () => {


        render(<NonEditableTimeboxListElement
            timebox={timebox}            
            findElement={findElement}
        />);

        expect(screen.getByTitle("start")).toBeInTheDocument();
    });
    it('has delete button', () => {


        render(<NonEditableTimeboxListElement
            timebox={timebox}            
            findElement={findElement}
        />);

        expect(screen.getByTitle("usuń")).toBeInTheDocument();
    });

});