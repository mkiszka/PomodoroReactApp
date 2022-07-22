import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TimeboxList from "../../components/TimeboxList";
import TimeboxListElement from "../../components/TimeboxListElement";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import userEvent from "@testing-library/user-event";

describe('TimeboxList', () => {
    let timeboxes;
    let timeboxList;
    let onSave;
    let onDelete;
    let onStart;

    beforeEach(() => {
        timeboxes = [
            { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
            { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
            { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
        ];

        onDelete = jest.fn();
        onStart = jest.fn();
        onSave = jest.fn();

        timeboxList = <DndProvider backend={HTML5Backend}><TimeboxList>{
            timeboxes.map((elem, index) => {
                return (

                    <TimeboxListElement
                        key={elem.uid}
                        index={index}
                        timebox={elem}
                        onDelete={() => { onDelete(elem.uid) }}
                        onStart={() => { onStart(index) }}
                        onSave={() => { onSave(index) }}
                    />

                );
            })
        }</TimeboxList></DndProvider>
    })

    it('should generate 3 listitms', () => {
        render(timeboxList);

        const timeboxesList = screen.getAllByRole("listitem");
        expect(timeboxesList.length).toEqual(3);
    })
    it('should be noneditable', () => {

        render(timeboxList);

        const textareas = screen.queryAllByRole("textbox");
        const spinbuttons = screen.queryAllByRole("spinbutton");

        expect(textareas.length).toEqual(0);
        expect(spinbuttons.length).toEqual(0);

    });
    it('should fire Delete.onClick 3 times', async () => {

        render(timeboxList);

        const deleteButtons = screen.getAllByTitle("usuń");

        expect(deleteButtons.length).toEqual(3);

        deleteButtons.forEach((element) => {
            userEvent.click(element);
        });

        expect(onDelete).toBeCalledTimes(3, 'onDelete');

    });
    it('should change list item to editable version', async () => {

        render(timeboxList);

        const editButtons = screen.getAllByTitle("edytuj");

        expect(editButtons.length).toEqual(3);

        editButtons.forEach((element) => {
            userEvent.click(element);
        });

        const saveButtons = screen.getAllByTitle("zapisz");
        const textareas = screen.getAllByRole('textbox');
        const spinbutton = screen.getAllByRole('spinbutton');
        expect(saveButtons.length).toEqual(3);
        expect(textareas.length).toEqual(3);
        expect(spinbutton.length).toEqual(3);

    });

    it('should fire save event 3 times', async () => {

        render(timeboxList);

        const editButtons = screen.getAllByTitle("edytuj");

        expect(editButtons.length).toEqual(3);

        editButtons.forEach((button) => {
            userEvent.click(button);
        });

        const saveButtons = screen.getAllByTitle("zapisz");

        saveButtons.forEach((button) => {
            userEvent.click(button);
        })

        expect(onSave).toBeCalledTimes(3);

    });
    it('should handle TimeboxListElement start button', () => {

        render(timeboxList);

        const startButtons = screen.getAllByTitle("start");
        fireEvent.click(startButtons[1]);
        expect(onStart).toBeCalledTimes(1);
    })

});