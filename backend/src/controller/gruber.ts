import {Order, OrderModel} from "../models/order";

import {Request, Response} from "express";
import {Suppliers} from "../types/suppliers";
import {ChatsModel} from "../models/chats";
import {CandidateDealsModel} from "../models/candidate_deals";

const get_chats = async (req: Request, res: Response) => {
    const chats = await ChatsModel.find();
    res.json(chats);
}

const get_deals = async (req: Request, res: Response) => {
    const deals = await CandidateDealsModel.find();
    res.json(deals);
}

const send_message = async (req: Request, res: Response) => {
    return res.json({message: "Not implemented"});
}

export default {
    get_chats,
    get_deals,
    send_message,
}