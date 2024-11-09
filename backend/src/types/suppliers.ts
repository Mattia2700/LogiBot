export interface Address {
    city: String,
    country: String,
    latitude: Number,
    longitude: Number,
}

export interface Suppliers {
    id: String,
    supplierId: Number,
    loadingAddress: Address,
    unloadingAddress: Address,
    goods: Number,
    goodsStr: String,
    price: Number,
    performanceScore: Number,
}

export interface SupplierRequest {
    loadingAddress: String,
    unloadingAddress: String
}