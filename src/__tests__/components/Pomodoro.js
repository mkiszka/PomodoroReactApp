import React from "react";
import { render, fireEvent, within, screen } from "@testing-library/react";
import Pomodoro from "../../components/Pomodoro";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe('Pomodoro', () => {
    it('should change element position on enter', () => {
        render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        const list = screen.getAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByRole('textbox');
        expect(firstElementTitle.value).toEqual("Wywołanie eventów")

        fireEvent.dragStart(lastElement);
        fireEvent.dragEnter(firstElement); 

        const newFirstElement = screen.getAllByRole('listitem')[0];
        firstElementTitle = within(newFirstElement).getByRole('textbox');
    
        expect(firstElementTitle.value).toEqual("KP-3104 Deploy webserwisu zamówień dla 1.15");



    })
    it.skip('should change element position on drag over', () => {
        render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        const list = screen.getAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByRole('textbox');
        expect(firstElementTitle.value).toEqual("Wywołanie eventów")

        fireEvent.dragStart(lastElement);        
        fireEvent.dragOver(firstElement);
    
        const newFirstElement = screen.getAllByRole('listitem')[0];
        firstElementTitle = within(newFirstElement).getByRole('textbox');
    
        expect(firstElementTitle.value).toEqual("KP-3104 Deploy webserwisu zamówień dla 1.15");



    })
    it('should change element position on drop', () => {
        render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        const list = screen.getAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByRole('textbox');
        expect(firstElementTitle.value).toEqual("Wywołanie eventów")

        fireEvent.dragStart(lastElement);        
        fireEvent.drop(firstElement);

        const newFirstElement = screen.getAllByRole('listitem')[0];
        firstElementTitle = within(newFirstElement).getByRole('textbox');
    
        expect(firstElementTitle.value).toEqual("KP-3104 Deploy webserwisu zamówień dla 1.15");

    })
    it('start button should change Timebox content', () => {
       
        render(<DndProvider backend={HTML5Backend}><Pomodoro/></DndProvider>);
        
        let timebox = screen.getByTestId('Timebox');
        const taskTitle = within(timebox).getByRole('heading', { level: 1 });
        expect(taskTitle.textContent).toEqual("Wywołanie eventów");

        const taskList = screen.getAllByRole('listitem');
        const startButton = within(taskList[1]).getByTitle('start');
        fireEvent.click(startButton);

        timebox =  screen.getByTestId('Timebox');    
        expect(taskTitle.textContent).toEqual("KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.");
    })
});