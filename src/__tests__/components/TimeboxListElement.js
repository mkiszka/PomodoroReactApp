import React from "react";
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TimeboxListElement from "../../components/TimeboxListElement";
import { v4 as uuid } from 'uuid';

describe('TimeboxListElement', () => {
    let timebox;
    let findElement;
    afterEach(cleanup);
    beforeEach(() => {
        findElement = jest.fn().mockReturnValue({ index: 0 })
    })
    describe('isEditable false', () => {


        beforeEach(() => {
            timebox = { uid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false };
        });
        it(' cannot be edited', () => {

            const { getByRole } = render(<DndProvider backend={HTML5Backend}><TimeboxListElement timebox={timebox} uuid={timebox.uid} findElement={findElement} /></DndProvider>);

            expect(getByRole('textbox')).toBeDisabled();
            expect(getByRole('spinbutton')).toBeDisabled();

        });
        it(' has edit button', () => {

            const { queryByTitle, getByTitle } =
                render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                    timebox={timebox}
                    uuid={timebox.uid}
                    findElement={findElement}
                /></DndProvider>);

            expect(getByTitle("edytuj")).toBeInTheDocument();
            expect(queryByTitle("zapisz")).toBeNull();
        });
        it(' has start button', () => {

            const { queryByTitle, getByTitle } =
                render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                    timebox={timebox}
                    uuid={timebox.uid}
                    findElement={findElement}
                /></DndProvider>);

            expect(getByTitle("start")).toBeInTheDocument();
        });
    });
    describe('isEditable true', () => {
        beforeEach(() => {
            timebox = { uid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true };
        });
        it(' should set proper value of textarea and input value (title=Wywłanie eventów, totalTimeInMinutes=3)', () => {


            const { getByRole } = render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                timebox={timebox}
                uuid={timebox.uid}
                findElement={findElement}
            /></DndProvider>);

            expect(getByRole('textbox').value).toMatch("Wywołanie eventów");
            expect(getByRole('spinbutton').value).toEqual("3");
        })
        it(' can be edited', () => {

            const { getByRole } =
                render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                    timebox={timebox}
                    uuid={timebox.uid}
                    findElement={findElement}
                /></DndProvider>);

            expect(getByRole('textbox')).not.toBeDisabled();
            expect(getByRole('spinbutton')).not.toBeDisabled();

        });

        it(' has delete button', () => {

            const { getByTitle } =
                render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                    timebox={timebox}
                    uuid={timebox.uid}
                    findElement={findElement}
                /></DndProvider>);
            expect(getByTitle("usuń")).toBeInTheDocument();

        });

        it(' has save button', () => {

            const { queryByTitle, getByTitle } =
                render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                    timebox={timebox}
                    uuid={timebox.uid}
                    findElement={findElement}
                /></DndProvider>);
            expect(getByTitle("zapisz")).toBeInTheDocument();
            expect(queryByTitle("edytuj")).toBeNull();
        });
    })
});