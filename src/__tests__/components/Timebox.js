import { render, screen, process } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-test-renderer';
import Timebox from '../../components/Timebox';

describe('Timebox', () => {
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
        });

        it('should render proper time string', () => {
            const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }

            const { debug } = render(<Timebox timebox={timebox} isEditable={true} />)
            const playButton = screen.getByRole('button', { name: /play/i });            
            let clock = screen.queryByText(/00:03:00.000/i);
            expect(clock).not.toBeNull();

            userEvent.click(playButton);            
            act(() => {
                jest.advanceTimersByTime(60000)
            })

            clock = screen.queryByText(/00:02:00.000/i);
            expect(clock).not.toBeNull();

            act(() => {
                jest.advanceTimersByTime(120000)
            })
            
            clock = screen.queryByText(/00:00:00.000/i);
            expect(clock).not.toBeNull();
          
        });
        it.skip('should render proper progressbar length', () => {
            const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }

            const { debug } = render(<Timebox timebox={timebox} isEditable={true} />)
            const playButton = screen.getByRole('button', { name: /play/i });            
            let clock = screen.queryByText(/00:03:00.000/i);
            expect(clock).not.toBeNull();

            userEvent.click(playButton);            
            act(() => {
                jest.advanceTimersByTime(60000)
            })

            clock = screen.queryByText(/00:02:00.000/i);
            expect(clock).not.toBeNull();

            act(() => {
                jest.advanceTimersByTime(120000)
            })
            debug();
            clock = screen.queryByText(/00:00:00.000/i);
            expect(clock).not.toBeNull();
          
        });
        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        })
    });

});