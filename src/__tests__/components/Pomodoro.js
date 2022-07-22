import React from "react";
import { render, fireEvent, within, screen } from "@testing-library/react";
import Pomodoro from "../../components/Pomodoro";
import AuthenticationContext from "../../contexts/AuthenticationContext";


describe('Pomodoro', () => {
    it('should change element position on enter',async () => {
        render(<AuthenticationContext.Provider value={{ accessToken: 'aa-bb-cc', onLogout: () => { } }}>
            <Pomodoro />
        </AuthenticationContext.Provider>)
        const list = await screen.findAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByText('Wywołanie eventów');
        expect(firstElementTitle).not.toBeNull();

        fireEvent.dragStart(lastElement);
        fireEvent.dragEnter(firstElement); 

        const newFirstElement = (await screen.findAllByRole('listitem'))[0];
        firstElementTitle = within(newFirstElement).getByText('KP-3104 Deploy webserwisu zamówień dla 1.15');
    
        expect(firstElementTitle).not.toBeNull();



    })
    it.skip('should change element position on drag over', async () => {
        render(<AuthenticationContext.Provider value={{ accessToken: 'aa-bb-cc', onLogout: () => { } }}>
            <Pomodoro />
        </AuthenticationContext.Provider>)
        const list = await screen.findAllByRole('listitem');
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByText('Wywołanie eventów');
        expect(firstElementTitle).not.toBeNull();

        fireEvent.dragStart(lastElement);        
        fireEvent.dragOver(firstElement); //TODO - repair - it looks like dragOver does nothing
        //fireEvent.drop(firstElement);

    
        const newList = (await screen.findAllByRole('listitem'));
        const newFirstElement = newList[0];
        firstElementTitle = within(newFirstElement).getByText('KP-3104 Deploy webserwisu zamówień dla 1.15');
        expect(firstElementTitle).not.toBeNull();
    

    })
    it('should change element position on drop', async () => {
        render(<AuthenticationContext.Provider value={{ accessToken: 'aa-bb-cc', onLogout: () => { } }}>
            <Pomodoro />
        </AuthenticationContext.Provider>)
        const list = await screen.findAllByRole('listitem');
        
        const firstElement = list[0];
        const lastElement = list[2];

        let firstElementTitle = within(firstElement).getByText('Wywołanie eventów');
        expect(firstElementTitle).not.toBeNull();


        fireEvent.dragStart(lastElement);        
        fireEvent.drop(firstElement);

        const newFirstElement = (await screen.findAllByRole('listitem'))[0];
        firstElementTitle = within(newFirstElement).getByText('KP-3104 Deploy webserwisu zamówień dla 1.15');
    
        expect(firstElementTitle).not.toBeNull();

    })
    it('start button should change Timebox content',async () => {
       
        // render(<DndProvider backend={HTML5Backend}><AuthenticationContext.Context value={{ accessToken: 'aa-bb-cc', onLogout: () => { } }}><Pomodoro /></AuthenticationContext.Context></DndProvider>);
        // render(<AuthenticationContext.Provider value={{ accessToken: 'aa-bb-cc', onLogout: () => { } }}>
        //     <React.Suspense fallback={'Loading ...'}>
        //         <AuthenticatedApp />
        //     </React.Suspense>
        // </AuthenticationContext.Provider>)
        render(<AuthenticationContext.Provider value={{ accessToken: 'aa-bb-cc', onLogout: () => { } }}>
            <Pomodoro />
        </AuthenticationContext.Provider>)
 
        let timebox = await screen.findByTestId('Timebox');
        const taskTitle = within(timebox).getByRole('heading', { level: 1 });
        expect(taskTitle.textContent).toEqual("Wywołanie eventów");

        const taskList = await screen.findAllByRole('listitem');
        const startButton = within(taskList[1]).getByTitle('start');
        fireEvent.click(startButton);

        timebox =  await screen.findByTestId('Timebox');    
        expect(taskTitle.textContent).toEqual("KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.");
    })
});