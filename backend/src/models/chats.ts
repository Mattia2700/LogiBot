import { model, Schema, InferSchemaType, Types } from "mongoose";
import {Message} from "../types/message";

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
            type: [Object<Message>],
            required: true,
        }
    },
    { minimize: false }
);

export type Chats = InferSchemaType<typeof chatsSchema>;

export const ChatsModel = model<Chats>("Chats", chatsSchema);
