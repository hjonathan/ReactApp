import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    slide: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        alignItems: 'center',
        padding: 16
    },
    icon: {
        width: 180,
        height: 180
    },
    content: {
        paddingVertical: 16,
        paddingHorizontal: 28
    },
    title: {
        color: '#FFFFFF',
        fontSize: 22,
        paddingBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 17,
        textAlign: 'center'
    }
});