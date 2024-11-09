import { model, Schema, InferSchemaType, Types } from "mongoose";

export const messageSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { minimize: false }
);

export const chatsSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        supplierId: {
            type: String,
            required: true,
        },
        messages: {
            type: [messageSchema],
            required: false,
            default: [],
        }
    },
    { minimize: false }
);

export type Chats = InferSchemaType<typeof chatsSchema>;

export const ChatsModel = model<Chats>("Chats", chatsSchema);
