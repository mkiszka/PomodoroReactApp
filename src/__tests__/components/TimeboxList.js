import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TimeboxList from "../../components/TimeboxList";
import { v4 as uuidv4 } from "uuid";

describe('TimeboxList', () => {
    describe('isEditable == false', () => { 
        let timeboxes;
        beforeEach(() => {
            timeboxes = [
                { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
                { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
                { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
            ];
        })

        it('should generate as 3 textboxes and 3 spinbuttons', () => {

            const onTitleChange = jest.fn();
            const onTimeChange = jest.fn();
            const onEdit = jest.fn();
            const onDelete = jest.fn();


            const { getAllByRole } = render(<TimeboxList timeboxes={timeboxes} onTitleChange={onTitleChange} onTimeChange={onTimeChange} onEdit={onEdit} onDelete={onDelete} />);


            const timeboxesList = getAllByRole("textbox");
            expect(timeboxesList.length).toEqual(3);
            const timeInput = getAllByRole("spinbutton");
            expect(timeInput.length).toEqual(3);


        })
        it('should be disabled', async () => {

            const onTitleChange = jest.fn();
            const onTimeChange = jest.fn();
            const onEdit = jest.fn();
            const onDelete = jest.fn();


            const { getAllByTitle, getAllByRole } = render(<TimeboxList timeboxes={timeboxes} onTitleChange={onTitleChange} onTimeChange={onTimeChange} onEdit={onEdit} onDelete={onDelete} />);

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

            const onTitleChange = jest.fn();
            const onTimeChange = jest.fn();
            const onEdit = jest.fn();
            const onDelete = jest.fn();


            const { debug, getAllByTitle, getAllByRole } = render(<TimeboxList timeboxes={timeboxes} onTitleChange={onTitleChange} onTimeChange={onTimeChange} onEdit={onEdit} onDelete={onDelete} />);

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
    });
    describe('isEditable == true', () => { 
        let timeboxes;
        beforeEach(() => {
            timeboxes = [
                { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: true },
                { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: true },
                { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: true },
            ];
        })
        it('should be enabled', () => {

            const onTitleChange = jest.fn();
            const onTimeChange = jest.fn();
            const onEdit = jest.fn();
            const onDelete = jest.fn();


            const { getAllByTitle, getAllByRole } = render(<TimeboxList timeboxes={timeboxes} onTitleChange={onTitleChange} onTimeChange={onTimeChange} onEdit={onEdit} onDelete={onDelete} />);

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

            const onTitleChange = jest.fn();
            const onTimeChange = jest.fn();
            const onEdit = jest.fn();
            const onDelete = jest.fn();


            const { getAllByTitle, getAllByRole } = render(<TimeboxList timeboxes={timeboxes} onTitleChange={onTitleChange} onTimeChange={onTimeChange} onEdit={onEdit} onDelete={onDelete} />);

            const saveButtons = getAllByTitle("zapisz");
            

            expect(saveButtons.length).toEqual(3);       
        });
        it('should fire events 3 times', async () => {

            const onTitleChange = jest.fn();
            const onTimeChange = jest.fn();
            const onEdit = jest.fn();
            const onDelete = jest.fn();


            const {  getAllByTitle, getAllByRole } = render(<TimeboxList timeboxes={timeboxes} onTitleChange={onTitleChange} onTimeChange={onTimeChange} onEdit={onEdit} onDelete={onDelete} />);

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