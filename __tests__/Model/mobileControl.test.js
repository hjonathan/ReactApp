import {RealmObject, MobileControlSchema} from "../../App/Model/Schemas";
import Mobile from '../../App/Model/MobileControl';

describe("Testing Mobile Control realm", () => {

    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll();
        });
    });

    beforeEach(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll();
        });
    });

    test("Realm object", () => {
        let data = null,
            mobileControl = {
                idField: "0001",
                caseId: "123456789",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            };
        RealmObject.write(() => {
            data = RealmObject.create(MobileControlSchema.schema.name, mobileControl, true);
        });
        expect(data.idField).toBe("0001");
    });

    test("MobileControl -> addLocation", () => {
        let mobileControl = {
                idField: "0001",
                caseId: "123456789",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            data;
        Mobile.addLocation(mobileControl);
        data = Mobile.getLocations();
        expect(data.length).toEqual(1);
        expect(JSON.stringify(data[0])).toEqual(JSON.stringify(mobileControl));
    });

    test("MobileControl -> filterBy", () => {
        let control1 = {
                idField: "0001",
                caseId: "1111",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            control2 = {
                idField: "0002",
                caseId: "2222",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            data,
            item;
        Mobile.addLocation(control1);
        Mobile.addLocation(control2);
        data = Mobile.getLocations();
        expect(data.length).toEqual(2);
        item = Mobile.filterBy(control2.caseId);
        expect(JSON.stringify(item[0])).toEqual(JSON.stringify(control2));
    });

    test("MobileControl -> removeLocation", () => {
        let mobileControl = {
                idField: "0001",
                caseId: "123456789",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            data;
        Mobile.addLocation(mobileControl);
        data = Mobile.getLocations();
        expect(data.length).toEqual(1);
        Mobile.removeLocation(mobileControl.idField);
        data = Mobile.getLocations();
        expect(data.length).toEqual(0);
    });

    test("MobileControl -> removeLocation", () => {
        let control1 = {
                idField: "0001",
                caseId: "1111",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            control2 = {
                idField: "0002",
                caseId: "2222",
                data: "",
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            data;
        Mobile.addLocation(control1);
        Mobile.addLocation(control2);
        data = Mobile.getLocations();
        expect(data.length).toEqual(2);
        Mobile.destroyControl();
        data = Mobile.getLocations();
        expect(data.length).toEqual(0);
    });
});