import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import Pomodoro from "../../components/Pomodoro";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe('Pomodoro', () => {
    it('should change element position on enter', () => {
        const { getAllByRole } = render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        const list = getAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByRole('textbox');
        expect(firstElementTitle.value).toEqual("Wywołanie eventów")

        fireEvent.dragStart(lastElement);
        fireEvent.dragEnter(firstElement); 

        const newFirstElement = getAllByRole('listitem')[0];
        firstElementTitle = within(newFirstElement).getByRole('textbox');
    
        expect(firstElementTitle.value).toEqual("KP-3104 Deploy webserwisu zamówień dla 1.15");



    })
    it.skip('should change element position on drag over', () => {
        const { getAllByRole } = render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        const list = getAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByRole('textbox');
        expect(firstElementTitle.value).toEqual("Wywołanie eventów")

        fireEvent.dragStart(lastElement);        
        fireEvent.dragOver(firstElement);
    
        const newFirstElement = getAllByRole('listitem')[0];
        firstElementTitle = within(newFirstElement).getByRole('textbox');
    
        expect(firstElementTitle.value).toEqual("KP-3104 Deploy webserwisu zamówień dla 1.15");



    })
    it('should change element position on drop', () => {
        const { getAllByRole } = render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        const list = getAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByRole('textbox');
        expect(firstElementTitle.value).toEqual("Wywołanie eventów")

        fireEvent.dragStart(lastElement);        
        fireEvent.drop(firstElement);

        const newFirstElement = getAllByRole('listitem')[0];
        firstElementTitle = within(newFirstElement).getByRole('textbox');
    
        expect(firstElementTitle.value).toEqual("KP-3104 Deploy webserwisu zamówień dla 1.15");

    })
    it('start button should change Timebox content ', () => {
       
        const { getByTestId, getAllByRole,debug } = render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        // debug();
        let timebox = getByTestId('Timebox');
        const taskTitle = within(timebox).getByRole('heading', { level: 1 });
        expect(taskTitle.textContent).toEqual("Wywołanie eventów");

        const taskList = getAllByRole('listitem');
        const startButton = within(taskList[1]).getByTitle('start');
        fireEvent.click(startButton);

        timebox =  getByTestId('Timebox');    
        expect(taskTitle.textContent).toEqual("KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.");
    })
});