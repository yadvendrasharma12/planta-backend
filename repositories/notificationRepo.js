
import Notification from "../model/notification.js";

export const createNotificationRepo = async (data) => {
  return await Notification.create(data);
};

export const findNotificationsRepo = async (userId) => {
  return await Notification.find({ userId })
    .select("-userId -__v")
    .populate({
      path: "orderId",
      select: "items totalAmount status createdAt",
    })
    .sort({ createdAt: -1 });
};
