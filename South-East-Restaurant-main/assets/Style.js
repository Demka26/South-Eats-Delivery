import { FONTS, COLORS, SIZES } from "../constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cartButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightOrange2,
    },
    cartImage: {
        width: 20,
        height: 20,
        tintColor: COLORS.black,
    },
    cartQuantity: {
        position: 'absolute',
        top: 5,
        right: 5,
        height: 15,
        width: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary
    },
    cartQuantityText: {
        color: COLORS.white,
        ...FONTS.body5,
        lineHeight: 0,
        fontSize: 10
    },
    gridItem: {
        padding: 10,
        paddingBottom: 20,
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.9,
        elevation: 3,
    },
    bgImage: {
        width: 80,
        height: 80,
    },
    // 2. Add style to container:
    container: {
        width: 95,
        height: 110,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    screen: {
        margin: 15,
    },
    foodItemImage: {
        height: 200,
        width: '100%',
        borderRadius: 25
    },
    foodItemPriceContainer: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        width: 120,
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "black",
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    footerTotalContainer: {
        padding: SIZES.padding,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.white
    },
    footerTotalInnerContainer: {
        flexDirection: 'row',
        marginTop: SIZES.base,
        marginBottom: SIZES.padding
    },
    formInputContainer: {
        flexDirection: 'row',
        height: SIZES.height > 800 ? 55 : 45,
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.height > 800 ? SIZES.base : 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,

    },
    footerTotalInnerContainer: {
        flexDirection: 'row',
        marginTop: SIZES.base,
        marginBottom: SIZES.padding
    },
    headerContainerStyle: {
        height: 20,
        marginVertical: 60,
        flexDirection: 'row',
    },
    headerCartStyle: {
        height: 50,
        marginHorizontal: SIZES.padding,
        marginTop: 80

    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        height: 100,
        backgroundColor: COLORS.lightGray2,
    },
    cartIconHeader: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.lightOrange2,

    },
    categoryFoodContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    detailsImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        justifyContent: 'center'
    },
    detailsContainer: {
        marginBottom: SIZES.padding,
        paddingHorizontal: SIZES.padding
    },
    details2: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 20
    },
    details3: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    details4: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 40
    },
    reviews: {
        flex: 2,
        flexDirection: 'row',
        height: 70,
        marginTop: 20,
        marginLeft: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2
    },
    addToCartButton: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        marginLeft: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary
    },
    addToCartContainer: {
        flexDirection: 'row',
        height: 120,
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.radius
    },
    paymentContainer: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        alignContent: 'center',
        justifyContent: 'center'
    },
    successContainer: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white
    },
    successCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    doneButton: {
        height: 55,
        marginBottom: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary
    }





})