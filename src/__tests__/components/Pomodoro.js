import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import Pomodoro from "../../components/Pomodoro";

describe('Pomodoro', () => {
 
    it('something ', () => {
        const { getByTestId, getAllByRole } = render(<Pomodoro time/>);      
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