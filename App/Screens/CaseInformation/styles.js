import {StyleSheet} from 'react-native';
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
        paddingVertical: 1
    },
    caseInfoTitle: {
        margin: 5,
        fontSize: 15,
        color: '#009999'
    },
    containerForDates: {
        flexDirection: 'row',
        marginTop: 10,
        margin:5,
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    containerInsideDate: {
        flexDirection: 'column'
    },
    containerData: {
        flexDirection: 'row'
    },
    imageStyles: {
        width: 30,
        height: 30,
    },
    textNumber: {
        margin: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#466592',
        marginTop: 10
    },
    textTitle: {
        fontSize: 18,
        marginTop: 10,
        margin: 5,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textGenericTitles: {
        margin: 5,
        fontSize: 14,
        marginTop: 0,
        fontWeight: 'bold'
    },
    textBold: {
        fontWeight: 'bold',
        width: '50%'
    },
    textMarginLeft: {
        marginTop: 2,
        margin: 5, 
        width: '50%',
        fontWeight: 'bold'
    },
    textMargin: {
        marginTop: 2,
        margin: 5, 
        width: '50%'
    },
    textBoxDate: {
        marginTop:10,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewComponent:{
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10
    },
    textTaskTitle: {
        marginTop: 10,
        fontSize: 17,
        marginTop: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    containerForCaseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        margin:5,
        borderBottomWidth: 1, 
        borderBottomColor: 'lightgray',
        borderTopWidth: 1,
        borderTopColor: 'lightgray', 
        minHeight: 20
    },
    containerHalfDates: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '50%'
    },
    internalDateText: {
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        marginLeft: 5
    },
    marginTextDate: {
        marginRight: 30
    },
    flexTextDirection: {
        flexDirection: 'row'
    },
    widthHalf: {
        width: '50%'
    },
    styleToast: {
        margin: 20, 
        backgroundColor: '#3397e1'
    },
    marginGeneric: {
        margin: 5,
        marginTop: 0
    },
    rootView: {
        flex: 1, 
        backgroundColor: "#466592"
    },
    scrollStyle: {
        flexGrow: 1
    }
});