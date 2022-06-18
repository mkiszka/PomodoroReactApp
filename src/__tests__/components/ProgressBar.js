import TestRenderer from 'react-test-renderer';
import ProgressBar from '../../components/ProgressBar';

describe('ProgressBar ', () => {
    let progressBar = null;
    let progressBarJSON = null;

    describe('when none of parameters was set, should ', () => {
        beforeAll(() => {
            progressBar = TestRenderer.create(<ProgressBar />);
            progressBarJSON = progressBar.toJSON();
        })
        it('not contain undefined className', () => {
            expect(progressBarJSON.props.className).not.toMatch(/undefined/);
        });
        it('looks always the same',()=> {
            expect(progressBarJSON).toMatchSnapshot();
        });
        /*
        {
              type: 'div',
              props: {
                className: 'ProgressBar ProgressBar_trackRemaining_false undefined ',
                style: { '--width': '0%', '--background-color': 'red' }
              },
              children: null
            }
            */
/*
        it(' .... ', () => {
            console.log(progressBar.toJSON());
            expect(progressBar.toJSON()).toBe();
        })
        */
    });
});