export interface Chat {
  id: string;
  orderId: string;
  supplierId: string;
  messages: Message[];
}

export interface Message {
  role: 'user' | 'bot';
  text: string;
}
