import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-test-renderer';
import Timebox from '../../components/Timebox';

describe('Timebox', () => {
    it.skip('should be ready for nullable timebox property', () => {

    })
    it('should generate proper values', () => {
        const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }
        render(<Timebox timebox={timebox} />)

        const h1 = screen.getByRole('heading', { level: 1 });
        const h4 = screen.getByRole('heading', { level: 4 });

        expect(h1.innerHTML).toEqual('Wywołanie eventów');
        expect(h4.innerHTML).toEqual('Liczba przerw: 0');

    });
    it('should have pause button after click on play button', async () => {
        const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }

        render(<Timebox timebox={timebox} isEditable={true} />)

        const playButton = screen.getByRole('button', { name: /play/i });
        let pauseButton = screen.queryByRole('button', { name: /pause/i });
        expect(pauseButton).toBeNull()
        userEvent.click(playButton);
        pauseButton = await screen.findByRole('button', { name: /pause/i });
        expect(pauseButton).not.toBeNull();

    });
    it('should have play button after click on play button and then stop button', async () => {
        const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }

        render(<Timebox timebox={timebox} isEditable={true} />)

        let playButton = screen.getByRole('button', { name: /play/i });
        userEvent.click(playButton);
        playButton = screen.queryByRole('button', { name: /play/i });
        expect(playButton).toBeNull();
        const stopButton = await screen.findByRole('button', { name: /stop/i });
        userEvent.click(stopButton);
        playButton = screen.queryByRole('button', { name: /play/i });
        expect(playButton).not.toBeNull();

    });
    it('should be nonclickable if isEditable = false', () => {
        const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }

        render(<Timebox timebox={timebox} isEditable={false} />)

        const playButton = screen.getByRole('button', { name: /play/i });
        let pauseButton = screen.queryByRole('button', { name: /pause/i });
        expect(pauseButton).toBeNull()


        userEvent.click(playButton);

        pauseButton = screen.queryByRole('button', { name: /pause/i });
        expect(pauseButton).toBeNull();
    });
    describe('and its timers', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        })
        it('should render proper time string',async () => {
            const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }

            render(<Timebox timebox={timebox} isEditable={true} />)
            const playButton = screen.getByRole('button', { name: /play/i });
            let clock = screen.queryByText(/00:03:00\.000/i);
            expect(clock).not.toBeNull();
            
            userEvent.click(playButton);
            //TODO resolve  problem with act warning
            //https://stackoverflow.com/questions/71681055/react-testing-library-with-userevent-click-wrong-act-warning
            //https://github.com/testing-library/user-event/issues/255#issuecomment-636412774
            //niżej testy mają to samo
        
            act(() => {
                jest.advanceTimersByTime(60000)
            })

            clock = screen.queryByText(/00:02:00\.000/i); //Getting it again isn't necessary.
            expect(clock).not.toBeNull();

            act(() => {
                jest.advanceTimersByTime(120000)
            })

            clock = screen.queryByText(/00:00:00\.000/i); //Getting it again isn't necessary.
            expect(clock).not.toBeNull();

        });
        it('should render proper progressbar length', () => {
            const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 10 }

            render(<Timebox timebox={timebox} isEditable={true} progressBarAriaLabel='Postęp ładowania timeboxów' />)
            const playButton = screen.getByRole('button', { name: /play/i });
            let progressbar = screen.getByLabelText('Postęp ładowania timeboxów')
            let style = window.getComputedStyle(progressbar);

            expect(style._values['--width']).toEqual('100%');
            userEvent.click(playButton);

            act(() => {
                jest.advanceTimersByTime(300000);
            })

            style = window.getComputedStyle(progressbar);
            expect(style._values['--width']).toEqual('50%');

            act(() => {
                jest.advanceTimersByTime(300000);
            })

            style = window.getComputedStyle(progressbar);
            expect(style._values['--width']).toEqual('0%');


        });
        it('should not change progress bar as component is not editable', () => {
            const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 10 }

            render(<Timebox timebox={timebox} isEditable={false} progressBarAriaLabel='Postęp ładowania timeboxów' />)
            const playButton = screen.getByRole('button', { name: /play/i });
            let progressbar = screen.getByLabelText('Postęp ładowania timeboxów')
            let style = window.getComputedStyle(progressbar);

            expect(style._values['--width']).toEqual('100%');
            userEvent.click(playButton);

            act(() => {
                jest.advanceTimersByTime(300000);
            })

            style = window.getComputedStyle(progressbar);
            expect(style._values['--width']).toEqual('100%');

            act(() => {
                jest.advanceTimersByTime(300000);
            })

            style = window.getComputedStyle(progressbar);
            expect(style._values['--width']).toEqual('100%');
        })
        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        })
    });

});