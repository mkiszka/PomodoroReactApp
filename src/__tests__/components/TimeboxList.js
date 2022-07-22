import React from "react";
import { render, fireEvent, screen} from "@testing-library/react";
import TimeboxList from "../../components/TimeboxList";
import TimeboxListElement from "../../components/TimeboxListElement";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import userEvent from "@testing-library/user-event";

describe('TimeboxList', () => {
    describe('isEditable == false', () => {
        let timeboxes;
        let timeboxList;
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
            onDelete = jest.fn();
            onStart = jest.fn();            

            timeboxList = <DndProvider backend={HTML5Backend}><TimeboxList>{
                timeboxes.map((elem, index) => {
                    return (

                        <TimeboxListElement
                            key={elem.uid}
                            index={index}
                            timebox={elem}
                            onTitleChange={onTitleChange}
                            onTimeChange={onTimeChange}                           
                            onDelete={() => { onDelete(elem.uid) }}
                            onStart={() => { onStart(index) }}
                            
                        />

                    );
                })
            }</TimeboxList></DndProvider>
        })

        it('should generate as 3 textboxes and 3 spinbuttons', () => {
            render(timeboxList);

            const timeboxesList = screen.getAllByRole("textbox");
            expect(timeboxesList.length).toEqual(3);
            const timeInput = screen.getAllByRole("spinbutton");
            expect(timeInput.length).toEqual(3);


        })
        it('should be disabled', async () => {

            render(timeboxList);

            const textareas = screen.getAllByRole("textbox");
            const spinbuttons = screen.getAllByRole("spinbutton");

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

            render(timeboxList);

            const editButtons = screen.getAllByTitle("edytuj");
            const deleteButtons = screen.getAllByTitle("usuń");

            expect(editButtons.length).toEqual(3);
            expect(deleteButtons.length).toEqual(3);

            editButtons.forEach((element) => {
                userEvent.click(element);
            });

            deleteButtons.forEach((element) => {
                userEvent.click(element);
            });

            expect(onEdit).toBeCalledTimes(3,'onEdit');
            expect(onDelete).toBeCalledTimes(3,'onDelete');

        });
        it('should handle TimeboxListElement start button', () => {

            render(timeboxList);

            const startButtons = screen.getAllByTitle("start");
            fireEvent.click(startButtons[1]);
            expect(onStart).toBeCalledTimes(1);
        })
    });
    describe('isEditable == true', () => {
        let timeboxes;
        let timeboxList;
        let onTitleChange;
        let onTimeChange;        
        let onSave;
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
            onSave = jest.fn();
            onDelete = jest.fn();
            onStart = jest.fn();            

            timeboxList = <DndProvider backend={HTML5Backend}><TimeboxList>{
                timeboxes.map((elem, index) => {
                    return (

                        <TimeboxListElement
                            key={elem.uid}
                            index={index}
                            timebox={elem}
                            onTitleChange={onTitleChange}
                            onTimeChange={onTimeChange}                            
                            onSave={()=> { onSave(elem.uid)}}
                            onDelete={() => { onDelete(elem.uid) }}
                            onStart={() => { onStart(index) }}
                            
                        />

                    );
                })
            }</TimeboxList></DndProvider>

        })      
        it('should be enabled', () => {

            render(timeboxList);

            const textareas = screen.getAllByRole("textbox");
            const spinbuttons = screen.getAllByRole("spinbutton");

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
            render(timeboxList);

            const saveButtons = screen.getAllByTitle("zapisz");


            expect(saveButtons.length).toEqual(3);
        });
        it('should fire events 3 times', async () => {

            render(timeboxList);

            const saveButtons = screen.getAllByTitle("zapisz");
            const deleteButtons = screen.getAllByTitle("usuń");

            expect(saveButtons.length).toEqual(3);
            expect(deleteButtons.length).toEqual(3);

            saveButtons.forEach(element => {
                fireEvent.click(element);
            });

            deleteButtons.forEach(element => {
                fireEvent.click(element);
            });

            expect(onSave).toBeCalledTimes(3);
            expect(onDelete).toBeCalledTimes(3);

        });
    });
});