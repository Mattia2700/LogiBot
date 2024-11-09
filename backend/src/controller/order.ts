import {Order, OrderModel} from "../models/order";

import {Request, Response} from "express";
import {Suppliers} from "../types/suppliers";
import {ChatsModel} from "../models/chats";
import {CandidateDealsModel} from "../models/candidate_deals";

const create = async (req: Request, res: Response) => {
    // ensure that the request has the correct query parameters
    let body = req.body;
    body.id = Math.floor(Math.random() * 1000000);
    if (!body.maxAllowedPrice) {
        res.json('Missing required query parameter maxAllowedPrice');
        return;
    }
    if (!body.loadingAddress) {
        res.json('Missing required query parameter loadingAddress');
        return;
    }
    if (!body.unloadingAddress) {
        res.json('Missing required query parameter unloadingAddress');
        return;
    }
    if (!body.loadingDate) {
        res.json('Missing required query parameter loadingDate');
        return;
    }
    if (!body.unloadingDate) {
        res.json('Missing required query parameter unloadingDate');
        return;
    }
    if (!body.goodsType) {
        res.json('Missing required query parameter goodsType');
        return;
    }

    const order = new OrderModel({
        id: body.id,
        maxAllowedPrice: body.maxAllowedPrice,
        loadingAddress: body.loadingAddress,
        unloadingAddress: body.unloadingAddress,
        loadingDate: body.loadingDate,
        unloadingDate: body.unloadingDate,
        goodsType: body.goodsType,
    });

    console.log("order", order);

    let result = await order.save();
    await createChatAndDeal(result as Order);

}

async function createChatAndDeal(order: Order) {
    const url = `https://hackathon-2024.gruber-logistics.dev/Transport/GetTransportHistory?city1=${order.loadingAddress}&city2=${order.unloadingAddress}`;

    const response = await fetch(url);
    let suppliers = await response.json() as Suppliers[];

    // sort by performance score first and then by price
    // suppliers.sort((a, b) => {
    //     if (a.performanceScore === b.performanceScore) {
    //         return a.price - b.price;
    //     }
    //     return b.performanceScore - a.performanceScore;
    // });

    for (const supplier of suppliers) {
        const chat = new ChatsModel({
            id: Math.floor(Math.random() * 1000000),
            orderId: order.id,
            supplierId: supplier.id,
            messages: [`You have a new order request! 🚚 Here are the details:\nThe maximum price is ${order.maxAllowedPrice}.\nLoading will take place in ${order.loadingAddress} on ${order.loadingDate}, and unloading is scheduled in ${order.unloadingAddress} on ${order.unloadingDate}.\nThe goods being transported are ${order.goodsType}.`]
        });
        await chat.save();

        const candidateDeal = new CandidateDealsModel({
            id: Math.floor(Math.random() * 1000000),
            orderId: order.id,
            supplierId: supplier.id,
            accordedPrice: -1,
        })
        await candidateDeal.save();
    }
}

const read = async (req: Request, res: Response) => {
    let result = await OrderModel.find().exec();
    res.json(result);
}



export default {
    create,
    read
}