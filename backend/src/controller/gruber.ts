import {Request, Response} from "express";
import {ChatsModel} from "../models/chats";
import {CandidateDealsModel} from "../models/candidate_deals";
import chatbot from "../utils/chatbot";

const get_chats = async (req: Request, res: Response) => {
    const chats = await ChatsModel.find();
    res.json(chats);
}

const get_chats_by_id = async (req: Request, res: Response) => {
    let result = await ChatsModel.findOne({ id: req.params.id }).exec();
    res.json(result);
}

const get_deals = async (req: Request, res: Response) => {
    const deals = await CandidateDealsModel.find();
    res.json(deals);
}

const new_message = async (req: Request, res: Response) => {
    console.log(req.body);
    const { chatId, message } = req.body;
    await ChatsModel.findOneAndUpdate(
        { id: chatId },
        { $push: { messages: {role: "user", text: message} } },
        { new: true }
    );
    await chatbot.getMessageFromChatbot(chatId);
}

export default {
    get_chats,
    get_chats_by_id,
    get_deals,
    new_message,
}