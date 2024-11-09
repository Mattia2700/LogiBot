import {InferSchemaType, model, Schema} from "mongoose";

export const candidateDeals = new Schema(
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
        accordedPrice: {
            type: Number,
            required: false,
            default: null,
        },
    },
    { minimize: false }
);

export type CandidateDeals = InferSchemaType<typeof candidateDeals>;

export const CandidateDealsModel = model<CandidateDeals>("CandidateDeals", candidateDeals);
