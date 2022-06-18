import TestRenderer from 'react-test-renderer';
import ProgressBar from '../../components/ProgressBar';

describe('ProgressBar should', () => {
    let progressBar = null;
    let progressBarJSON = null;
    beforeAll(() => {
        progressBar = TestRenderer.create(<ProgressBar />);
        progressBarJSON = progressBar.toJSON();
    })
    it('not contain undefined className', () => {
        expect(progressBarJSON.props.className).not.toMatch(/undefined/);
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

    // it(' .... ', () => {
    //     console.log(progressBar.toJSON());
    //     expect(progressBar.toJSON()).toBe();
    // })
});