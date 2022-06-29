import React, { Children } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TimeboxList from "../../components/TimeboxList";
import TimeboxListElement from "../../components/TimeboxListElement";
import { v4 as uuidv4 } from "uuid";

describe('TimeboxList', () => {
    describe('isEditable == false', () => {
        let timeboxes;
        let timeboxListChildren;
        let onTitleChange;
        let onTimeChange;
        let onEdit;
        let onDelete;
        let onStart;

        beforeEach(() => {
            timeboxes = [
                { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
                { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
                { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
            ];

            onTitleChange = jest.fn();
            onTimeChange = jest.fn();
            onEdit = jest.fn();
            onDelete = jest.fn();
            onStart = jest.fn();

            timeboxListChildren = 
                timeboxes.map((elem, index) => {
                    return (
                        <TimeboxListElement
                            key={elem.uid}
                            index={index}
                            timebox={elem}
                            onTitleChange={onTitleChange}
                            onTimeChange={onTimeChange}
                            onEdit={() => { onEdit(elem.uid) }}
                            onDelete={() => { onDelete(elem.uid) }}
                            onStart={() => { onStart(index) }}
                        />
                    );
                })
        })

        it('should generate as 3 textboxes and 3 spinbuttons', () => {
            const { getAllByRole } = render(<TimeboxList>{timeboxListChildren}</TimeboxList>);

            const timeboxesList = getAllByRole("textbox");
            expect(timeboxesList.length).toEqual(3);
            const timeInput = getAllByRole("spinbutton");
            expect(timeInput.length).toEqual(3);


        })
        it('should be disabled', async () => {

            const { getAllByRole } = render(<TimeboxList>{timeboxListChildren}</TimeboxList>);

            const textareas = getAllByRole("textbox");
            const spinbuttons = getAllByRole("spinbutton");

            expect(textareas.length).toEqual(3);
            expect(spinbuttons.length).toEqual(3);

            textareas.forEach(element => {
                expect(element).toBeDisabled();
            });

            spinbuttons.forEach(element => {
                expect(element).toBeDisabled();
            });
        });

        it('should fire events 3 times', async () => {

            const { debug, getAllByTitle, getAllByRole }
                = render(<TimeboxList>{timeboxListChildren}</TimeboxList>);

            const editButtons = getAllByTitle("edytuj");
            const deleteButtons = getAllByTitle("usuń");

            expect(editButtons.length).toEqual(3);
            expect(deleteButtons.length).toEqual(3);

            editButtons.forEach(element => {
                fireEvent.click(element);
            });

            deleteButtons.forEach(element => {
                fireEvent.click(element);
            });

            expect(onEdit).toBeCalledTimes(3);
            expect(onDelete).toBeCalledTimes(3);

        });
        it('should handle TimeboxListElement start button', () => {

            const { getAllByTitle } = render(<TimeboxList>{timeboxListChildren}</TimeboxList>);

            const startButtons = getAllByTitle("start");
            fireEvent.click(startButtons[1]);
            expect(onStart).toBeCalledTimes(1);
        })
    });
    describe('isEditable == true', () => {
        let timeboxes;
        let timeboxListChildren;
        let onTitleChange;
        let onTimeChange;
        let onEdit;
        let onDelete;
        let onStart;

        beforeEach(() => {
            timeboxes = [
                { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true },
                { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: true },
                { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: true },
            ];

            onTitleChange = jest.fn();
            onTimeChange = jest.fn();
            onEdit = jest.fn();
            onDelete = jest.fn();
            onStart = jest.fn();

            timeboxListChildren = 
                timeboxes.map((elem, index) => {
                    return (
                        <TimeboxListElement
                            key={elem.uid}
                            index={index}
                            timebox={elem}
                            onTitleChange={onTitleChange}
                            onTimeChange={onTimeChange}
                            onEdit={() => { onEdit(elem.uid) }}
                            onDelete={() => { onDelete(elem.uid) }}
                            onStart={() => { onStart(index) }}
                        />
                    );
                })
            
        })
        it('should be enabled', () => {

            const { getAllByTitle, getAllByRole } = render(<TimeboxList>{timeboxListChildren}</TimeboxList>);

            const textareas = getAllByRole("textbox");
            const spinbuttons = getAllByRole("spinbutton");

            expect(textareas.length).toEqual(3);
            expect(spinbuttons.length).toEqual(3);

            textareas.forEach(element => {
                expect(element).not.toBeDisabled();
            });

            spinbuttons.forEach(element => {
                expect(element).not.toBeDisabled();
            });
        });
        it('has save button', () => {
            const { getAllByTitle } = render(<TimeboxList>
                {timeboxListChildren}
            </TimeboxList>
            );

            const saveButtons = getAllByTitle("zapisz");


            expect(saveButtons.length).toEqual(3);
        });
        it('should fire events 3 times', async () => {

            const { getAllByTitle, getAllByRole } = render(<TimeboxList>{timeboxListChildren}</TimeboxList>);

            const saveButtons = getAllByTitle("zapisz");
            const deleteButtons = getAllByTitle("usuń");

            expect(saveButtons.length).toEqual(3);
            expect(deleteButtons.length).toEqual(3);

            saveButtons.forEach(element => {
                fireEvent.click(element);
            });

            deleteButtons.forEach(element => {
                fireEvent.click(element);
            });

            expect(onEdit).toBeCalledTimes(3);
            expect(onDelete).toBeCalledTimes(3);

        });
    });
});