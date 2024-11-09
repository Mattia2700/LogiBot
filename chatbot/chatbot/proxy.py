from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_ollama import OllamaLLM, ChatOllama


class Proxy:
    llm: ChatOllama

    def __init__(self, id):
        self.llm = ChatOllama(
            model="llama3.1:8b",
            temperature=0
        )
        self.history = []
        self.first = True
        self.id = id

    def chat(self):
        initial_message = """You have a new order request! 🚚 Here are the details:\nThe maximum price is 3000 euros.\nLoading will take place at X on saturday, and unloading is scheduled for Y on sunday.\nThe goods being transported are Z."""
        self.history.append({"role": "bot", "message": initial_message})
        print(f"Bot: {initial_message}")
        while True:
            message = input("You: ")
            self.history.append({"role": "user", "message": message})
            res = self.get_user_intention(message)
            if res["intent"] == "price_negotiation":
                if self.first:
                    message = self.first_price_negotiation()
                    self.first = False
                else:
                    message = self.other_price_negotiation()
                self.history.append({"role": "bot", "message": message})
                print(f"Bot: {message}")
            elif res["intent"] == "positive_confirmation":
                message = self.positive_confirmation()
                self.history.append({"role": "bot", "message": message})
                print(f"Bot: {message}")
                break  # per ricapitolare parliamo di questo ordine, i giorni x y, il prezzo z
            elif res["intent"] == "negative_confirmation":
                break

    def get_history(self):
        return "\n".join([f"{msg['role']}: {msg['message']}" for msg in self.history])

    def get_user_intention(self, user_input):
        response_schema = [
            ResponseSchema(name="intent", output_variables=["intent"], description="User's intention")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Classify the user's intent into one of the following categories:
            - price_negotiation
            - positive_confirmation
            - negative_confirmation
            
            Use the following schema: "{intent}"
            User's message: "{message}"
            Intent:
            """,
            input_variables=["message", "history"],
            partial_variables={"intent": format_instructions}
        )

        chain = prompt_template | self.llm | output_parser

        res = chain.invoke({"message": user_input})

        return res

    def first_price_negotiation(self, average_price=2000, max_price=3000):
        response_schema = [
            ResponseSchema(name="message", output_variables=["message"], description="Bot's message"),
            ResponseSchema(name="price", output_variables=["price"], description="Proposed price")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Generate a message to negotiate the price, based on the chat history. You want to lower the proposed price, but not too much.
            Consider that the average price for this type of order is {average_price} euros.
            User wants to spend less than {max_price} euros.
            Try to find a compromise.
            
            Chat history: {history}
            Use the following schema: "{schema}"
            Response:
            """,
            input_variables=["history"],
            partial_variables={"schema": format_instructions}
        )
        chain = prompt_template | self.llm | output_parser
        res = chain.invoke({"history": self.get_history(), "average_price": average_price, "max_price": max_price})
        return res

    def other_price_negotiation(self, average_price=2000, max_price=3000):
        response_schema = [
            ResponseSchema(name="message", output_variables=["message"], description="Bot's message"),
            ResponseSchema(name="price", output_variables=["price"], description="Proposed price")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Generate a message to negotiate the price, based on the chat history. You want to lower the proposed price, but not too much.
            Consider that the average price for this type of order is {average_price} euros.
            User wants to spend less than {max_price} euros.
            Try to find a compromise. 
            If the last proposed price is not so far from the user's budget, you can propose the same price.
            
            Chat history: {history}
            Use the following schema: "{schema}"
            Response:
            """,
            input_variables=["history"],
            partial_variables={"schema": format_instructions}
        )
        chain = prompt_template | self.llm | output_parser
        res = chain.invoke({"history": self.get_history(), "average_price": average_price, "max_price": max_price})
        return res


    def positive_confirmation(self, price, loading_address, loading_data, unloading_address, unloading_date, goods_type):
        # response_schema = [
        #     ResponseSchema(name="message", output_variables=["message"], description="Bot's message")
        # ]
        # output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        # format_instructions = output_parser.get_format_instructions()
        # prompt_template = PromptTemplate(
        #     template="""
        #     Generate a message to confirm the order details, based on the chat history.
        #     It should be similar to:
        #     Chat history: {history}
        #     Use the following schema: "{schema}"
        #     Response:
        #     """,
        #     input_variables=["history"],
        #     partial_variables={"schema": format_instructions}
        # )
        #
        # chain = prompt_template | self.llm | output_parser
        #
        # res = chain.invoke({"history": self.get_history()})

        message = f"Great! Let's finalize the details.\nThe proposed price is {price}.\nLoading will take place at {loading_address} on {loading_data}, and unloading is scheduled for {unloading_address} at {unloading_date}.\nThe goods being transported are {goods_type}."
        message += " Our support team will contact you soon to confirm the order."

        return message
