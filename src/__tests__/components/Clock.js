import { render, screen } from '@testing-library/react';
import Clock from "../../components/Clock";

describe('Clock', () => {  
    it('should add insignificant zeros', () => {
        render(<Clock hours={9} minutes={5} seconds={5} miliseconds={1} />);
        const timeString = screen.getByRole("heading", { level: 2 });
        expect(timeString.innerHTML).toEqual("09:05:05.001");
    });
    it('should add insignificant zeros', () => {
        render(<Clock hours={9} minutes={5} seconds={5} miliseconds={1} />);
        const timeString = screen.getByRole("heading", { level: 2 });
        expect(timeString.innerHTML).toEqual("09:05:05.001");
    });

    it('should add insignificant zeros', () => {
        render(<Clock hours={26} minutes={90} seconds={61} miliseconds={2000} />);
        const timeString = screen.getByRole("heading", { level: 2 });
        expect(timeString.innerHTML).toEqual("09:05:05.001");
    });
    it('should add insignificant zeros', () => {
        render(<Clock hours={-1} minutes={-1} seconds={-1} miliseconds={-2000} />);
        const timeString = screen.getByRole("heading", { level: 2 });
        expect(timeString.innerHTML).toEqual("09:05:05.001");
    });
    it('should add insignificant zeros', () => {
        render(<Clock hours={0} minutes={0} seconds={0} miliseconds={0} />);
        const timeString = screen.getByRole("heading", { level: 2 });
        expect(timeString.innerHTML).toEqual("09:05:05.001");
    });
})