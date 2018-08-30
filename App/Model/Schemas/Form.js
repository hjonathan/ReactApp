/**
 * Schema for model Forms
 */
export default class FormSchema {
    /**
     * Returns the formContent in json format
     * @returns {any}
     */
    get formContentJSON () {
        return JSON.parse(this.formContent);
    }

    static schema = {
        name: "FormSchema",
        primaryKey: "formId",
        properties: {
            formId: {type: "string"},
            formTitle: {type: "string"},
            formDescription: {type: "string?"},
            formContent: {type: "string"},
            formUpdateDate: {type: "string"}
        }
    };
}
