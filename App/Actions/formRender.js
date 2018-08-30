const actions = {
    /**
     * Actions for formRender with communicate PMDynaform
     */
    formRender: {
        newCase: x => x,
        openCase: x => x,
        render: x => x,
        routeCase: x => x,
        backButtonPressed: x => x,
        routeOffline: x => x,
        dataAvailable: x => x,
        sendSignature: x => x,
        openMap: x => x,
        sendCoordinates: x => x,
        working: x => x,
        routeOffLine: x => x,
        routed: {
            route: x => x,
            users: x => x
        },
        bridge: {
            continueStep: x => x,
            nextStep: x => x,
            getForm: x => x,
            getFormData: x => x,
            getFile: x => x,
            getFileVersions: x => x,
            getPicture: x => x,
            getVideo: x => x,
            getAudio: x => x,
            getGeoTag: x => x,
            getSignature: x => x,
            receiveFormData: x => x,
            askWhichDataToUse: x => x,
            downloadFile: x => x
        },
        inject: {
            continueStep: x => x,
            loadForm: x => x,
            setFormData: x => x,
            getFormData: x => x,
            hideFieldLoading: x => x,
            setFiles: x => x,
            setFileVersions: x => x,
            setLocation: x => x,
            getWhichDataToUse: x => x,
            setCacheLibraryMap: x => x
        },
        nextStep: {
            request: x => x,
            success: status => ({status}),
            error: error => ({error}),
            reset: x => x
        },
        signature: {
            show: x => x,
            data: x => x,
            request: x => x
        },
        audio: {
            openMenu: x => x,
            openControls: x => x,
            infoAudio: x => x,
            selectAudio: x => x
        },
        download: {
            show: x => x,
            progress: x => x,
            file: x => x
        },
        reset: x => x
    }
};

export default actions;
