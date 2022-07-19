import { render, screen } from '@testing-library/react';
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
    it('should be noneditable isEditable = false', () => {
        const timebox = { uid: 'aaaa-dddd-cccc', title: 'Wywołanie eventów', totalTimeInMinutes: 3 }
        render(<Timebox timebox={timebox} isEditable='false' />)

        

    });
});