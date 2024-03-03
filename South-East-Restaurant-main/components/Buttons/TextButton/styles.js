import { StyleSheet } from 'react-native';
import { vh, vw } from '../../../utils/units';

const styles = StyleSheet.create({
    container: {
        width: vw * 27,
        height: vh * 4.5,
        alignItems: 'center',
        borderRadius: vw * 2,
        justifyContent: 'center',
        backgroundColor: "blue"
    },
    titleText: {
        fontSize: 14,
        color: "white",
    }
});

export default styles;