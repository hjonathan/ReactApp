import _ from "lodash";
import moment from "moment";
import {DATE} from "../../Libs/Const";
import RegServices from "./Registry";
import * as Models from "../../Model";

export default () => ({
    /**
     * Uploads coordinates
     * Connects to /light/case/{app_uid}/upload/location
     * @param keys
     * @param params
     */
    uploadLocation (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "UPLOAD_LOCATION");
        let body = JSON.stringify({
                latitude: params.latitude,
                longitude: params.longitude
            }),
            fakeName = "Location.png",
            fakeId = `FK_${moment().format(DATE.SIMPLE)}_${moment().valueOf()}`;

        if (keys.isConnected) {
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body
            }).then(response => response.json());
        }
        Models.MobileControl.addLocation({
            idField: params.idField,
            caseId: params.caseIdTmp,
            data: JSON.stringify(params),
            delIndex: _.parseInt(params.delIndex),
            type: "geoMap",
            service: "uploadLocation"
        });
        return [{
            appDocFilename: fakeName,
            appDocUid: fakeId
        }];
    }
});
