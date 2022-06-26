import React from "react";
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import TimeboxListElement from "../../components/TimeboxListElement";
import { v4 as uuid } from 'uuid';

describe('TimeboxListElement', () => {
    afterEach(cleanup);

    it(' cannot be edited', () => {

        const { getByRole } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false }}/>);

        expect(getByRole('textbox')).toBeDisabled();
        expect(getByRole('spinbutton')).toBeDisabled();

    });

    it(' can be edited', () => {

        const { getByRole } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true }}/>);
     
        expect(getByRole('textbox')).not.toBeDisabled();
        expect(getByRole('spinbutton')).not.toBeDisabled();

    });
    
    it(' has delete button', () => {

        const { getByTitle } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true }}/>);

        expect(getByTitle("usuń")).toBeInTheDocument();        

    });

    it(' has save button', () => {

        const { queryByTitle, getByTitle } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true }}/>);

        expect(getByTitle("zapisz")).toBeInTheDocument();
        expect(queryByTitle("edytuj")).toBeNull();
    });

    it(' has edit button', () => {

        const { queryByTitle, getByTitle } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false }}/>);

        expect(getByTitle("edytuj")).toBeInTheDocument();
        expect(queryByTitle("zapisz")).toBeNull();
    });
    it(' has start button', () => {

        const { queryByTitle, getByTitle } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false }}/>);

        expect(getByTitle("play")).toBeInTheDocument();        
    });

    it(' should set proper value of textarea and input value (title=Wywłanie eventów, totalTimeInMinutes=3)',() => {
        const { getByRole } = render(<TimeboxListElement timebox={{ uuid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true }}/>);

        expect(getByRole('textbox').value).toMatch("Wywołanie eventów");
        expect(getByRole('spinbutton').value).toEqual("3");
    })
});