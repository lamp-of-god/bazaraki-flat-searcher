export declare enum FlatType {
    Studio = "Studio",
    OneBedroom = "OneBedroom",
    TwoBedrooms = "TwoBedrooms",
    Unknown = "Unknown"
}
export declare class FlatInfo {
    price: number;
    link: string;
    dateAndLocation: string;
    get flatType(): FlatType;
    constructor(price: number, link: string, dateAndLocation: string);
}
