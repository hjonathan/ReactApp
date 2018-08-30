import {StyleSheet} from 'react-native';
import * as Res from '../../Assets/resources';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: Res.colors.mainColor,
    },
    logoContainer: {
        justifyContent: 'center',
        margin: 16,
        width: 240,
        height: 60
    },
    logo: {
        width: '100%',
        resizeMode: 'contain'
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 8
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.25)',
        borderRadius: 8,
        margin: 3,
        width: 8,
        height: 8
    },
    activeDot: {
        backgroundColor: '#FFFFFF',
    },
    button: {
        alignItems: 'center'
    }
});