import { render, cleanup, screen } from '@testing-library/react';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import ProgressBar from '../../components/ProgressBar';

describe('ProgressBar', () => {
    it('percent = 40 should be --width: 40% and --background-color: red', () => {
        const { debug, baseElement ,getByTestId} = render(<ProgressBar percent={40}/>);
        expect(getByTestId('ProgressBar-div')).toHaveStyle('--width: 40%; --background-color: red');        
    });
    it('percent = 40 should be --width: 40% and --background-color: blue', () => {
        const { debug, baseElement ,getByTestId} = render(<ProgressBar percent={40} color="blue" />);
        expect(getByTestId('ProgressBar-div')).toHaveStyle('--width: 40%; --background-color: blue');        
    });   

    //afterEach(cleanup);
    //Testing Library automatically cleans up the environment after each test so you don't need to call cleanup in an afterEach or beforeEach function.
})