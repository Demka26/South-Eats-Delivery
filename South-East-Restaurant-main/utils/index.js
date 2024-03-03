export const getStatus = (status) => {
    switch (status) {
        case "placed":
            return "Placed";
        case "accepted":
            return "Accepted";
        case "cancelled":
            return "Cancelled";
        case "ready":
            return "Ready";
        case "inProgress":
            return "Order is on the way";
        case "delivered":
            return "Completed"
        default:
            return "Completed";
    }
}