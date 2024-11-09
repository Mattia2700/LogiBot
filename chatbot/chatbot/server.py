import uvicorn
from fastapi import FastAPI

from chatbot.chat import ChatInstance

app = FastAPI()
app.instances = []

@app.get("/newchat")
async def chat(id: str, max_price: int, loading_address: str, unloading_address: str, loading_date: str, unloading_date: str, goods_type: str):
    new_instance = ChatInstance(id, max_price, loading_address, unloading_address, loading_date, unloading_date, goods_type)
    app.instances.append(new_instance)
    return {"messages": new_instance.messages}

@app.get("/chat/{id}")
async def continue_chat(id: str, message: str):
    instance: ChatInstance = next((i for i in app.instances if i.id == id), None)
    if instance is None:
        return {"error": "Chat not found"}

    instance.proxy.history.append({"role": "user", "message": message})
    print(f"User: {message}")
    res = instance.proxy.get_user_intention(message)
    print(res["intent"])

    if res["intent"] == "price_negotiation":
        if instance.proxy.first:
            message = instance.proxy.first_price_negotiation(2000, instance.max_price)

            instance.proxy.history.append({"role": "bot", "message": message["message"]})
            instance.messages.append(message["message"])
            instance.price = message["price"]
            instance.first = False
        else:
            message = instance.proxy.other_price_negotiation()
            instance.proxy.history.append({"role": "bot", "message": message["message"]})
            instance.messages.append(message["message"])
            instance.price = message["price"]

        return {"messages": instance.messages}

    elif res["intent"] == "positive_confirmation":
        message = instance.proxy.positive_confirmation(instance.price, instance.loading_address, instance.loading_date, instance.unloading_address, instance.unloading_date, instance.goods_type)
        instance.proxy.history.append({"role": "bot", "message": message})
        instance.messages.append(message)

        return {"finish": instance.messages[-1]}

    elif res["intent"] == "negative_confirmation":
        message = "Goodbye!"
        instance.proxy.history.append({"role": "bot", "message": message})
        instance.messages.append(message)

        return {"finish": instance.messages[-1]}

uvicorn.run(app, host="0.0.0.0", port=8000)