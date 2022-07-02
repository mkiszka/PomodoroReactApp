import React from "react";
import { screen, render, cleanup } from '@testing-library/react';
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
        it('cannot be edited', () => {

            render(<DndProvider backend={HTML5Backend}><TimeboxListElement timebox={timebox} uuid={timebox.uid} findElement={findElement} /></DndProvider>);

            expect(screen.getByRole('textbox')).toBeDisabled();
            expect(screen.getByRole('spinbutton')).toBeDisabled();

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
    });
    describe('isEditable true', () => {
        beforeEach(() => {
            timebox = { uid: uuid(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true };
        });
        it('should set proper value of textarea and input value (title=Wywłanie eventów, totalTimeInMinutes=3)', () => {


            render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                timebox={timebox}
                uuid={timebox.uid}
                findElement={findElement}
            /></DndProvider>);

            expect(screen.getByRole('textbox').value).toMatch("Wywołanie eventów");
            expect(screen.getByRole('spinbutton').value).toEqual("3");
        })
        it('can be edited', () => {
            
            render(<DndProvider backend={HTML5Backend}><TimeboxListElement
                    timebox={timebox}
                    uuid={timebox.uid}
                    findElement={findElement}
                /></DndProvider>);

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
            expect(screen.getByTitle("zapisz")).toBeInTheDocument();
            expect(screen.queryByTitle("edytuj")).toBeNull();
        });
    })
});