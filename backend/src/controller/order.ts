import {Order, OrderModel} from "../models/order";

import {Request, Response} from "express";
import {Suppliers} from "../types/suppliers";
import {ChatsModel} from "../models/chats";

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

    let result = await order.save();
    const provaResult = await prova(result as Order);

}

async function prova(order: Order) {
    const url = `https://hackathon-2024.gruber-logistics.dev/Transport/GetTransportHistory?city1=${order.loadingAddress}&city2=${order.unloadingAddress}`;
    console.log(url);

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
            messages: [],
        });
        await chat.save();
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