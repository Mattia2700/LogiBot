import {Order, OrderModel} from "../models/order";

import {Request, Response} from "express";
import {Suppliers} from "../types/suppliers";
import {ChatsModel} from "../models/chats";

const list = async (req: Request, res: Response) => {
    const chats = await ChatsModel.find();
    res.json(chats);
}

export default {
    list,
}