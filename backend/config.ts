import { connect } from "mongoose";

export const connectToDatabase = async () => {
    return new Promise((resolve, reject) => {
        connect("mongodb://admin:logibot2024@db:27017/logibot?authSource=admin")
            .then(() => resolve(true))
            .catch((err) => reject(err));
    });
};