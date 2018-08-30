import React, {Component} from "react";
import {Platform, View, Text, TouchableOpacity, ProgressBarAndroid} from "react-native";
import moment from "moment";
import Sound from "react-native-sound";
import AudioRecorder from "react-native-audio-record";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import I18n from "../../I18n";
import * as Res from "../../Assets/resources";
import Styles from "./styles";

const PREFIX = "formsliderAud";
let timer = null;
/**
 * Class Audio
 * Example:
 *      ...
 *      import Audio from "../../Components/Audio";
 *
 *      class SomeComponent extends component {
 *          render () {
 *              return (
 *                  <Audio
 *                      onClose={()=>{}} // close function
 *                      saveAudio={() => {}} // saving function
 *                  />
 *              );
 *          }
 *      }
 */
class Audio extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            timer: null,
            minutes: "00",
            seconds: "00",
            time: 0.00,
            audioPath: null,
            stopped: false,
            loading: false,
            recording: false
        };
    }

    /**
     * Initializes audio options
     */
    componentDidMount () {
        const options = {
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            wavFile: this.nameGenerator()
        };
        AudioRecorder.init(options);
    }
    /**
     * Closes control panel
     */
    onClosePanel () {
        this.setState({
            time: 0,
            audioPath: null,
            loading: false
        });
        this.props.onClose({status: false});
    }

    /**
     * Generates a file name
     * @returns {string}
     */
    nameGenerator () {
        let date = moment().format("YYYYMMDD"),
            timestamp = moment().valueOf(),
            extension = "m4a",
            uid;
        uid = `${PREFIX}_${date}_${timestamp}.${extension}`;
        return uid;
    }

    /**
     * Records audio
     * @private
     */
    _record () {
        if (!this.state.recording && !this.state.loading) {
            this.timeStart();
            AudioRecorder.start();
            this.setState({
                stopped: false,
                recording: true,
                loading: true
            });
        }
    }

    /**
     * Stops the current recording
     * @private
     */
    async _stop () {
        if (this.state.recording) {
            this.timeClear();
            let audioFile = await AudioRecorder.stop();
            this.setState({
                stopped: true,
                recording: false,
                loading: false,
                audioPath: audioFile
            });
        }
    }

    /**
     * Plays the current record
     * @private
     */
    _play () {
        if (this.state.stopped && !this.state.recording) {
            const sound = new Sound(this.state.audioPath, null, (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                this.setState({loading: true});
                this.timeStart();
                sound.play((success) => {
                    this.setState({loading: !success});
                    this.timeClear();
                });
            });
        }
    }

    /**
     * Saves current record
     * @private
     */
    _save () {
        if (this.state.stopped && this.state.audioPath) {
            this.props.saveAudio({path: this.state.audioPath});
        }
    }

    /**
     * Start time of chronometer
     */
    timeStart = () => {
        timer = setInterval(() => {
            let {minutes} = this.state,
                seconds = (Number(this.state.seconds) + 1).toString();
            if (Number(this.state.seconds) === 59) {
                minutes = (Number(this.state.minutes) + 1).toString();
                seconds = "00";
            }
            this.setState({
                minutes: minutes.length === 1 ? `0${minutes}` : minutes,
                seconds: seconds.length === 1 ? `0${seconds}` : seconds
            });
        }, 1000);
        this.setState({timer});
    };

    /**
     * End time of chronometer
     */
    timeClear () {
        this.setState({
            timer: null,
            minutes: "00",
            seconds: "00"
        });
        clearInterval(timer);
    }

    /**
     * Renders progress bar
     * @returns {*}
     */
    progressBar () {
        if (Platform.OS === "android") {
            return (
                <ProgressBarAndroid styleAttr="Horizontal" color={Res.colors.teal} />
            );
        }
        return null;
    }

    /**
     * Renders header
     * @returns {*}
     */
    renderHeader () {
        return (
            <View style={Styles.headerContainer}>
                <View style={Styles.headerTitle}>
                    <Text style={Styles.textTitle}>
                        {I18n.t("selectAudioRecordDialogtitle")}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.onClosePanel();
                    }}
                >
                    <MaterialIcon name="clear" style={Styles.closeIcon} />
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Renders indeterminate progressBar and timer
     * @returns {*}
     */
    renderProgressBar () {
        if (this.state.loading) {
            return (
                <View style={{backgroundColor: Res.colors.white}}>
                    {this.progressBar()}
                    <View>
                        <Text>{`${this.state.minutes}:${this.state.seconds}`}</Text>
                    </View>
                </View>
            );
        }
        return null;
    }

    /**
     * Renders record button
     * @returns {*}
     */
    renderRecordButton () {
        return (
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this._record();
                    }}
                >
                    <View style={Styles.button}>
                        <MaterialIcon name="fiber-manual-record" style={Styles.buttonIcon} />
                    </View>
                </TouchableOpacity>
                <Text>{I18n.t("recordAudioStringDialog")}</Text>
            </View>
        );
    }

    /**
     * Renders stop button
     * @returns {*}
     */
    renderStopButton () {
        return (
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this._stop();
                    }}
                >
                    <View style={Styles.button}>
                        <MaterialIcon name="stop" style={Styles.buttonIcon} />
                    </View>
                </TouchableOpacity>
                <Text>{I18n.t("stopStringAudioDialog")}</Text>
            </View>
        );
    }

    /**
     * Renders play button
     * @returns {*}
     */
    renderPlayButton () {
        return (
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this._play();
                    }}
                >
                    <View style={Styles.button}>
                        <MaterialIcon name="play-arrow" style={Styles.buttonIcon} />
                    </View>
                </TouchableOpacity>
                <Text>{I18n.t("playStringAudioDialog")}</Text>
            </View>
        );
    }

    /**
     * Renders save button
     * @returns {*}
     */
    renderSaveButton () {
        return (
            <View style={[Styles.buttonContainer, {margin: 4}]}>
                <TouchableOpacity
                    onPress={() => {
                        this._save();
                    }}
                >
                    <View style={Styles.button}>
                        <MaterialIcon name="send" style={Styles.buttonIcon} />
                    </View>
                </TouchableOpacity>
                <Text>{I18n.t("savedStringAudioDialog")}</Text>
            </View>
        );
    }

    /**
     * Renders component
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer}>
                <View style={Styles.panelContainer}>
                    {this.renderHeader()}
                    {this.renderProgressBar()}
                    <View style={Styles.subContainer}>
                        {this.renderRecordButton()}
                        {this.renderStopButton()}
                        {this.renderPlayButton()}
                        {this.renderSaveButton()}
                    </View>
                </View>
            </View>
        );
    }
}

export default Audio;
