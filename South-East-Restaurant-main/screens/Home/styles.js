import { StyleSheet } from "react-native";
import { vh, vw } from "../../utils/units";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        width: vw * 100,
        height: vh * 12,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: vh * 2
    },
    welcomeText: {
        fontSize: vh * 3,
        fontWeight: 'bold',
    },
    logoutContainer: {
        width: vw * 14,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    logoutIcon: {
        width: vw * 5,
        height: vw * 6,
        resizeMode: 'contain',
    },
    listContainer: {
    },
    listContentContainer: {
        width: vw * 100,
        alignItems: 'center',
        marginTop: vh * 2,
        paddingBottom: vh * 6,
    },
    listItemSeparator: {
        height: vh * 2.5,
    }
})

export default styles;