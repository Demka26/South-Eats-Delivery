import validationCheck from "./ValidationCheck";

const getOrderStatus = (status) => {
    console.log("status", status);
    switch (status) {
        case "placed":
            return ""
        case "accepted":
            return "Your order is accepted by the restaurant"
        case "ready":
            return "Your order is ready for pickup"
        case "inProgress":
            return "Your order is on the way"
        case "delivered":
            return "Your order is has been delivered"
        default:
            return ""
    }
};

export {
    getOrderStatus,
    validationCheck,
};