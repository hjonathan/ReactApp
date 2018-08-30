import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Audio from '../../App/Components/Audio';

jest.mock('react-native-sound', () => require.requireActual('../../__mocks__/react-native-sound').default);
jest.mock('react-native-audio-record', () => require.requireActual('../../__mocks__/react-native-audio-record').default);

describe('Component >>> audio', () => {
    const onClose = () => {},
        saveAudio = () => {};

    let audioView,
        audioViewDefault;

    beforeEach(() => {
        audioViewDefault = shallow(<Audio />);
        audioView = shallow(<Audio onClose={onClose} saveAudio={saveAudio}/>);
    });

    test('Render audio', () => {
        expect(toJson(audioView)).toMatchSnapshot();
        expect(toJson(audioViewDefault)).toMatchSnapshot();
    });

    test('Render renderHeader', () => {
        let header,
            close;
        header = audioView.instance().renderHeader();
        close = header.props.children[1].props;
        expect(close.onPress()).toMatchSnapshot();
    });

    test('Render progressBarAndroid', () => {
        jest.mock('Platform', () => {
            return {OS: 'android'};
        });
        expect(audioView.instance().progressBar()).toMatchSnapshot();
        jest.mock('Platform', () => {
            return {OS: 'ios'};
        });
        expect(audioView.instance().progressBar()).toMatchSnapshot();
    });

    test('Render progressBar&Timer', () => {
        let progressBarTimer;
        audioView.instance().setState({loading: true});
        progressBarTimer = audioView.instance().renderProgressBar();
        expect(progressBarTimer).toMatchSnapshot();
    });

    test('Render recordButton', () => {
        let recordButton;
        recordButton = audioView.instance().renderRecordButton();
        audioView.instance().setState({recording: false, loading: false});
        expect(recordButton.props.children[0].props.onPress()).toMatchSnapshot();
        audioView.instance().setState({recording: true, loading: true});
        expect(recordButton.props.children[0].props.onPress()).toMatchSnapshot();
    });

    test('Render stopButton', async () => {
        let stopButton;
        stopButton = audioView.instance().renderStopButton();
        audioView.instance().setState({recording: true});
        expect(await stopButton.props.children[0].props.onPress()).toMatchSnapshot();
        audioView.instance().setState({recording: false});
        expect(await stopButton.props.children[0].props.onPress()).toMatchSnapshot();
    });

    test('Render playButton', () => {
        let playButton;
        playButton = audioView.instance().renderPlayButton();
        audioView.instance().setState({stopped: true, recording: false});
        expect(playButton.props.children[0].props.onPress()).toMatchSnapshot();
        audioView.instance().setState({stopped: false, recording: false});
        expect(playButton.props.children[0].props.onPress()).toMatchSnapshot();
    });

    test('Render saveButton', () => {
        let saveButton;
        saveButton = audioView.instance().renderSaveButton();
        audioView.instance().setState({stopped: true, audioPath: "path"});
        expect(saveButton.props.children[0].props.onPress()).toMatchSnapshot();
        audioView.instance().setState({stopped: false, audioPath: ""});
        expect(saveButton.props.children[0].props.onPress()).toMatchSnapshot();
    });

    test('timeStart function', () => {
        audioView.instance().timeStart();
    });

    test('timeClear function', () => {
        audioView.instance().timeClear();
    });
});
