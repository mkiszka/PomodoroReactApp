import { render, screen } from '@testing-library/react';
import Clock from '../../components/Clock';

describe('Clock', () => {  
    it('should add insignificant zeros', () => {
        render(<Clock hours={9} minutes={5} seconds={5} miliseconds={1} />);
        const timeString = screen.getByRole('heading', { level: 2 });
        expect(timeString.innerHTML).toEqual('09:05:05.001');
    });
    it('should render without adding any insignificant zeros', () => {
        render(<Clock hours={23} minutes={30} seconds={55} miliseconds={999} />);
        const timeString = screen.getByRole('heading', { level: 2 });
        expect(timeString.innerHTML).toEqual('23:30:55.999');
    });

    it('should set the clock to maximun of the range on minutes, seconds and miliseconds positions.', () => {
        render(<Clock hours={26} minutes={90} seconds={61} miliseconds={2000} />);
        const timeString = screen.getByRole('heading', { level: 2 });
        expect(timeString.innerHTML).toEqual('26:59:59.999');
    });
    it('should set the clock to minimum of the range', () => {
        render(<Clock hours={-1} minutes={-1} seconds={-1} miliseconds={-2000} />);
        const timeString = screen.getByRole('heading', { level: 2 });
        expect(timeString.innerHTML).toEqual('00:00:00.000');
    });
    it('should render 0 on every position and add insignificant zeros', () => {
        render(<Clock hours={0} minutes={0} seconds={0} miliseconds={0} />);
        const timeString = screen.getByRole('heading', { level: 2 });
        expect(timeString.innerHTML).toEqual('00:00:00.000');
    });
})