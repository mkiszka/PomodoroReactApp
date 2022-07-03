import { render, screen } from '@testing-library/react';
import React from 'react';
import ProgressBar from '../../components/ProgressBar';

describe('ProgressBar', () => {
    it('percent = 40 should be --width: 40% and --background-color: red', () => {
        render(<ProgressBar percent={40}/>);
        expect(screen.getByTestId('ProgressBar-div')).toHaveStyle('--width: 40%; --background-color: red');        
    });
    it('percent = 40 should be --width: 40% and --background-color: blue', () => {
        render(<ProgressBar percent={40} color="blue" />);
        expect(screen.getByTestId('ProgressBar-div')).toHaveStyle('--width: 40%; --background-color: blue');        
    });   

    //afterEach(cleanup);
    //Testing Library automatically cleans up the environment after each test so you don't need to call cleanup in an afterEach or beforeEach function.
})