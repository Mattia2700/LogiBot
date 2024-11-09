export interface Message {
    role: "bot" | "user";
    text: string;
}