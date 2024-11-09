from dataclasses import dataclass

from chatbot.proxy import Proxy


@dataclass
class ChatInstance:
    id: str
    max_price: str
    loading_address: str
    unloading_address: str
    loading_date: str
    unloading_date: str
    goods_type: str
    price: int = None
    messages: list = None
    proxy: Proxy = None

    def __post_init__(self):
        self.messages = [
            f"You have a new order request! 🚚 Here are the details:\nThe maximum price is {self.max_price}.\nLoading will take place in {self.loading_address} on {self.loading_date}, and unloading is scheduled in {self.unloading_address} on {self.unloading_date}.\nThe goods being transported are {self.goods_type}."]
        self.proxy = Proxy(self.id)

