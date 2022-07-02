import React from "react";
import TestRenderer from 'react-test-renderer';
import ProgressBar from "../../components/ProgressBar";



describe('ProgressBar', () => {
    let progressBar = null;
    let progressBarJSON = null;
   
    describe('when trackRemaining', () => {
        it('is true className should contain  ProgressBar_trackRemaining_true', () => {
            progressBarJSON = TestRenderer.create(<ProgressBar percent={80} trackRemaining={true} />).toJSON();
            expect(progressBarJSON.props.className).toMatch('ProgressBar_trackRemaining_true');
        })
        it('is false className should contain  ProgressBar_trackRemaining_true', () => {
            progressBarJSON = TestRenderer.create(<ProgressBar percent={80} trackRemaining={false} />).toJSON();
            expect(progressBarJSON.props.className).toMatch('ProgressBar_trackRemaining_false');
        })
    });
    describe('when none of parameters was set, should', () => {
        beforeAll(() => {
            progressBar = TestRenderer.create(<ProgressBar />);
            progressBarJSON = progressBar.toJSON();
        })
        it('not contain undefined className', () => {
            expect(progressBarJSON.props.className).not.toMatch(/undefined/);
        });
        it('looks always the same', () => {
            expect(progressBarJSON).toMatchSnapshot();
        });
    });
});