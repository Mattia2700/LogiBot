import {Order, OrderModel} from "../models/order";

import {Request, Response} from "express";

const create = async (req: Request, res: Response) => {
    // ensure that the request has the correct query parameters
    const body = req.body;
    if (!body.id) {
        res.json('Missing required query parameter id');
        return;
    }
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
    res.json(result);
}

const read = async (req: Request, res: Response) => {
    let result = await OrderModel.find().exec();
    res.json(result);
}

export default {
    create,
    read
}