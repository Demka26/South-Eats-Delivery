import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/units';

const styles = StyleSheet.create({
    container: {
        width: vw * 90,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: vh * 1.5,
    },
    headerContainer: {
        width: vw * 85,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderStatusContainer: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: vw * 3.5,
    },
    orderStatusText: {
        fontSize: vw * 3.5,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    boldText: {
        fontSize: vw * 3.5,
        fontWeight: 'bold',
    },
    itemTitleText: {
        fontSize: vw * 3.5,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    customerNameText: {
        width: vw * 85,
        fontSize: vw * 5,
        marginTop: vh * 2,
        fontWeight: 'bold',
        marginBottom: vh * 0.5,
    },
    bodyContainer: {
        flexDirection: 'row',
    },
    rowContainer: {
        width: vw * 42,
    },
    footerContainer: {
        width: vw * 85,
        marginTop: vh * 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    readyTextButton: {
        backgroundColor: "green"
    },
    cancelTextButton: {
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: "white"
    },
    cancelText: {
        color: "red"
    }
});

export default styles;