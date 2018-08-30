import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, FormSchema} from "./Schemas";

/**
 * Model for Form
 */
class FormCase extends BaseModel {
    constructor () {
        super(FormSchema.schema.name);
    }

    /**
     * Save the list when the action dynaform/processed/success is executed
     * @param forms
     */
    saveList (forms) {
        RealmObject.write(() => {
            let form = forms.status.response;
            if (!forms.status.params.app_uid && !forms.status.params.del_index) {
                RealmObject.create(FormSchema.schema.name, Object.assign({}, form, {
                    formContent: JSON.stringify(form.formContent)
                }), true);
            }
        });
    }

    /**
     * Returns all the forms that match the formId
     */
    getFormOffline (formId) {
        let forms = _.values(RealmObject.objects(FormSchema.schema.name).filtered(`formId = "${formId}"`))[0],
            response = {};
        if (forms) {
            response.formId = forms.formId;
            response.formTitle = forms.formTitle;
            response.formDescription = forms.formDescription;
            response.formContent = forms.formContentJSON;
            response.formUpdateDate = forms.formUpdateDate;
        }
        return _.isEmpty(response) ? null : response;
    }

    /**
     * Delete multiple Form
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(FormSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all Forms
        });
    }
}

export default new FormCase();
