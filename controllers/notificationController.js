

import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/successResponse.js";

import {
  findNotificationsRepo,
} from "../repositories/notificationRepo.js";

export const getNotificationsController = asyncHandler(
  async (req, res) => {
    const userId = req.user.id;

    const notifications = await findNotificationsRepo(userId);

    const data = notifications.map((notification) => {
      const order = notification.orderId;

      return {
        notificationId: notification._id,
        title: notification.title,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,

        order: order
          ? {
            orderId: order._id,
            status: order.status,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              productId: item.product,
              productTitle: item.productTitle,
              productImage: item.productImage,
              price: item.price,
              quantity: item.quantity,
            })),
          }
          : null,
      };
    });

    return successResponse(
      res,
      200,
      "Notifications fetched successfully",
      null,
      null,
      data
    );
  }
);
