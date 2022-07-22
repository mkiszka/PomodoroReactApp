import React from "react";
import { screen, render, cleanup } from '@testing-library/react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TimeboxListElement from "../../components/TimeboxListElement";
import { v4 as uuid } from 'uuid';
import userEvent from "@testing-library/user-event";

describe('TimeboxListElement', () => {
    let timebox;
    let findElement;
    afterEach(cleanup);
    beforeEach(() => {
        findElement = jest.fn().mockReturnValue({ index: 0 })
    })


    beforeEach(() => {
        timebox = { uid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3 };
    });
    it('cannot be edited', () => {

        render(<DndProvider backend={HTML5Backend}><TimeboxListElement timebox={timebox} uuid={timebox.uid} findElement={findElement} /></DndProvider>);
        const textarea = screen.queryByRole('textbox')
        const spinbutton = screen.queryByRole('spinbutton');
        expect(textarea).toBeNull();
        expect(spinbutton).toBeNull();

    });
    it('has edit button', () => {

        render(<DndProvider backend={HTML5Backend}><TimeboxListElement
            timebox={timebox}
            uuid={timebox.uid}
            findElement={findElement}
        /></DndProvider>);

        expect(screen.getByTitle("edytuj")).toBeInTheDocument();
        expect(screen.queryByTitle("zapisz")).toBeNull();
    });
    it('has start button', () => {
        render(<DndProvider backend={HTML5Backend}><TimeboxListElement
            timebox={timebox}
            uuid={timebox.uid}
            findElement={findElement}
        /></DndProvider>);

        expect(screen.getByTitle("start")).toBeInTheDocument();
    });   
    it('can be edited', () => {

        render(<DndProvider backend={HTML5Backend}><TimeboxListElement
            timebox={timebox}
            uuid={timebox.uid}
            findElement={findElement}
        /></DndProvider>);
        
        const editButton = screen.getByText('edytuj');
        userEvent.click(editButton);

        expect(screen.getByRole('textbox')).not.toBeDisabled();
        expect(screen.getByRole('spinbutton')).not.toBeDisabled();

    });

    it('has delete button', () => {

        render(<DndProvider backend={HTML5Backend}><TimeboxListElement
            timebox={timebox}
            uuid={timebox.uid}
            findElement={findElement}
        /></DndProvider>);
        expect(screen.getByTitle("usuń")).toBeInTheDocument();

    });

    it('has save button', () => {

        render(<DndProvider backend={HTML5Backend}><TimeboxListElement
            timebox={timebox}
            uuid={timebox.uid}
            findElement={findElement}
        /></DndProvider>);
        const editButton = screen.getByText('edytuj');
        userEvent.click(editButton);
        expect(screen.getByTitle("zapisz")).toBeInTheDocument();
        expect(screen.queryByTitle("edytuj")).toBeNull();
    });

});