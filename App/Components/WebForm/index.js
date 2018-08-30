import React, {Component} from "react";
import {WebView} from "react-native";
import RNFS, {DocumentDirectoryPath} from "react-native-fs";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import compatJs from "../../CompatPM/FormRender/JsInterface";
import Utils from "../../Utils";
import Actions from "../../Actions";
import Data from "../../Model/Data";
import {FILENAMES} from "../../Libs/Const";

const folderForm = "FormRender",
    folderBuild = "build-prod";

/**
 * Class FormRender
 */
export class WebForm extends Component {
    constructor (props) {
        super(props);
        this.state = Object.assign({}, props.payload, {
            webView: null,
            isLoad: false
        });
    }

    /**
     * Component did mount
     */
    componentDidMount () {
        this.props.spreadWebView(this.webView);
    }

    /**
     * Component will receive nextProps
     */
    componentWillReceiveProps (nextProps) {
        if (nextProps.errorNextStep) {
            this.webView.injectJavaScript(Utils.injectHideMaskLoading());
            this.props.clearWebForm();
        }
    }

    /**
     * Component update Handler
     * @param {*} nextProps
     * @param {*} nextState
     */
    componentDidUpdate (nextProps, nextState) {
        switch (this.props.flowStatus) {
            case "continueStep":
                this.webView.injectJavaScript(Utils.injectContinueStep({
                    path: this.props.pathNextStep
                }));
                break;
            case "loadForm":
                this.webView.injectJavaScript(Utils.injectLoadForm({
                    path: this.props.formPath
                }));
                break;
            case "hideFieldLoading":
                this.webView.injectJavaScript(Utils.injectHideFieldLoading(this.props.fileInput));
                break;
            case "setFormData":
                this.webView.injectJavaScript(Utils.injectSetFormData({
                    path: this.props.formDataPath,
                    stepData: this.props.stepData || {}
                }));
                break;
            case "setFiles":
                this.webView.injectJavaScript(Utils.injectSetFiles(this.props.fileUploaded));
                break;
            case "setFileVersions":
                this.webView.injectJavaScript(Utils.injectSetFileVersions(this.props.fileVersions));
                break;
            case "setLocation":
                this.webView.injectJavaScript(Utils.injectSetLocation(this.props.location));
                break;
            case "getFormData":
                this.webView.injectJavaScript(Utils.injectGetFormData());
                break;
            case "setCacheLibraryMap":
                this.webView.injectJavaScript(Utils.injectSetCacheLibraryMap({
                    path: `${FILENAMES.EXTERNALMAP}`
                }));
                break;
            default:
                break;
        }
    }

    /**
     * Listener on load Web View
     */
    onLoad = () => {
        if (!this.state.isLoad) {
            const {state} = this.props,
                {payload} = this.props;
            let str,
                path,
                caseData,
                data = {
                    steps: this.state.stepsPath,
                    isRTL: false,
                    offLineMode: false,
                    statusConnection: state.Net.isConnected
                },
                params = Object.assign({}, data, payload, Utils.mergePropsStateApi(state));
            caseData = Data.filterCaseIdWIP(params.app_uid);
            if (caseData) {
                path = `${RNFS.DocumentDirectoryPath}/data.json`;
                // TODO writing of the files will be resolved in the ticket PRE-101
                if (RNFS.exists(path)) {
                    RNFS.unlink(path);
                }
                RNFS.writeFile(path, JSON.stringify(caseData), "utf8")
                    .then(success => success)
                    .catch(error => error);
                params.dataPath = path;
                str = Utils.injectOpenStep(params);
            } else {
                str = Utils.injectOpenCase(params);
            }
            this.webView.injectJavaScript(`(${compatJs.toString()})()`);
            this.webView.injectJavaScript(str);
            this.props.finishLoadWebView();
            this.setState({isLoad: true});
        }
    };

    /**
     * Listener to message from webView
     * @param event
     */
    onMessage = (event) => {
        if (event && event.nativeEvent && event.nativeEvent.data) {
            const {type, data} = JSON.parse(event.nativeEvent.data),
                config = this.props.payload;
            this.props.onMessage({type, stepData: data, config});
        }
    };

    /**
     * Render the component
     * @returns {*}
     */
    render () {
        return (
            <WebView
                userAgent="formslider-android"
                ref={x => (this.webView = x)}
                source={{uri: `file://${DocumentDirectoryPath}/${folderForm}/${folderBuild}/index.html`}}
                onNavigationStateChange={this.onNavigationStateChange}
                onLoad={this.onLoad}
                allowUniversalAccessFromFileURLs
                allowFileAccess
                onMessage={this.onMessage}
            />
        );
    }
}

WebForm.propTypes = {
    spreadWebView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
        flowStatus: state.FormRender.flowStatus,
        dataNextStep: state.FormRender.nextStep.data,
        pathNextStep: state.FormRender.nextStep.path,
        errorNextStep: state.FormRender.nextStep.error,
        formPath: state.FormRender.formPath,
        formDataPath: state.FormRender.formDataPath,
        stepData: state.FormRender.stepData,
        fileInput: state.FormRender.fileInput,
        fileVersions: state.FormRender.fileVersions,
        fileUploaded: state.FormRender.dataFile,
        location: state.FormRender.location
    }),
    mapDispatchToProps = dispatch => ({
        onMessage: (data) => {
            if (Actions.formRender.bridge[data.type]) {
                dispatch(Actions.formRender.bridge[data.type](data));
            }
        },
        finishLoadWebView: () => {
            dispatch(Actions.screens.all.disableItemList(true));
        },
        clearWebForm () {
            dispatch(Actions.formRender.nextStep.reset());
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(WebForm);
