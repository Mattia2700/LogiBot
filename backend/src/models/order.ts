import {InferSchemaType, model, Schema, Types} from "mongoose";

export const orderSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        maxAllowedPrice: {
            type: Number,
            required: true,
        },
        loadingAddress: {
            type: String,
            required: true,
        },
        unloadingAddress: {
            type: String,
            required: true,
        },
        loadingDate: {
            type: Date,
            required: true,
        },
        unloadingDate: {
            type: Date,
            required: true,
        },
        goodsType: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
    },
    { minimize: false }
);

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model<Order>("Order", orderSchema);
