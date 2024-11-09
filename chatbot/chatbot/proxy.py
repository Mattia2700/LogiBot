from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_ollama import OllamaLLM, ChatOllama


class Proxy:
    llm: ChatOllama

    @classmethod
    def init(cls):
        cls.llm = ChatOllama(
            model="llama3.1:8b",
            temperature=0,
            base_url="http://ollama:11434"
        )
        cls.first = True

    @classmethod
    def chat(cls, history):
        message = history[-1]["text"]
        res = cls.get_user_intention(message)
        return res["intent"]
        # if res["intent"] == "price_negotiation":
        #     if cls.first:
        #         message = cls.first_price_negotiation()
        #         cls.first = False
        #     else:
        #         message = cls.other_price_negotiation()
        #     cls.history.append({"role": "bot", "message": message})
        #     print(f"Bot: {message}")
        # elif res["intent"] == "positive_confirmation":
        #     message = cls.positive_confirmation()
        #     cls.history.append({"role": "bot", "message": message})
        #     print(f"Bot: {message}")
        #     break  # per ricapitolare parliamo di questo ordine, i giorni x y, il prezzo z
        # elif res["intent"] == "negative_confirmation":
        #     break

    @classmethod
    def get_history(cls, messages):
        return "\n".join([f"{msg['role']}: {msg['text']}" for msg in messages])

    @classmethod
    def get_user_intention(cls, user_input):
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

        chain = prompt_template | cls.llm | output_parser

        res = chain.invoke({"message": user_input})

        return res

    @classmethod
    def introduction(cls, order, language):
        response_schema = [
            ResponseSchema(name="message", output_variables=["message"], description="Bot's message"),
            # ResponseSchema(name="price", output_variables=["price"], description="Proposed price")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Generate a message to introduce the shipping order.
            The message should be similar to this standard response:
            'You have a new order request! 🚚 Here are the details:\nThe average price is (price).\nLoading will take place in (loading_address) on (loading_date), and unloading is scheduled in (unloading address) on (unloading date).\nThe goods being transported are (goods_typ)."
            Get the needed information from the following order information:
            Order information: {order}
            Generate the response using the the language described by this language code: "{language}"
            Use the following schema: "{schema}"
            Response:
            """,
            input_variables=["order", "language"],
            partial_variables={"schema": format_instructions}
        )
        chain = prompt_template | cls.llm | output_parser
        res = chain.invoke({"order": order, "language": language})

        return res["message"]
        

    @classmethod
    def price_negotiation(cls, messages, language):
        response_schema = [
            ResponseSchema(name="message", output_variables=["message"], description="Bot's message"),
            # ResponseSchema(name="price", output_variables=["price"], description="Proposed price")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Generate a message to negotiate the price, based on the chat history. You want to lower the last proposed price a bit.
            Try to find a compromise. If the last user price is close to the last bot price, you can make it a deal, asking for confirmation.
            Last proposed price: {price}
            Chat history: {history}
            Generate the response using the the language described by this language code: "{language}"
            Use the following schema: "{schema}"
            Response:
            """,
            input_variables=["history", "price", "language"],
            partial_variables={"schema": format_instructions}
        )
        chain = prompt_template | cls.llm | output_parser
        res = chain.invoke({"history": cls.get_history(messages), "price": messages[-1]["text"], "language": language})
        return res['message']


    @classmethod
    def positive_confirmation(cls, messages, language):
        response_schema = [
            ResponseSchema(name="message", output_variables=["message"], description="Bot's message")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Generate a message to confirm the order details, based on the chat history.
            It should be similar to the first message, but describing the final price.
            First message: {first_message}
            But it has to consider chat history:
            Chat history: {history}
            Change the first sentence to confirm the order.
            Generate the response using the the language described by this language code: "{language}"
            Use the following schema: "{schema}"
            Response:
            """,
            input_variables=["history", "first_message", "language"],
            partial_variables={"schema": format_instructions}
        )

        chain = prompt_template | cls.llm | output_parser

        res = chain.invoke({"history": cls.get_history(messages), "first_message": messages[0]['text'], "language": language})

        # message = f"Great! Let's finalize the details.\nThe proposed price is {price}.\nLoading will take place at {loading_address} on {loading_data}, and unloading is scheduled for {unloading_address} at {unloading_date}.\nThe goods being transported are {goods_type}."
        # message += " Our support team will contact you soon to confirm the order."

        return res["message"]

    @classmethod
    def negative_confirmation(cls, language):
        response_schema = [
            ResponseSchema(name="message", output_variables=["message"], description="Bot's message")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schema)
        format_instructions = output_parser.get_format_instructions()
        prompt_template = PromptTemplate(
            template="""
            Generate a message expressing disappointment for the user's decision to not continue with the order, but thanking them for their time.
            Generate the response using the the language described by this language code: "{language}"
            Use the following schema: {schema}
            """,
            input_variables=["language"],
            partial_variables={"schema": format_instructions}
        )

        chain = prompt_template | cls.llm | output_parser

        res = chain.invoke({"language": language})

        # message = f"Great! Let's finalize the details.\nThe proposed price is {price}.\nLoading will take place at {loading_address} on {loading_data}, and unloading is scheduled for {unloading_address} at {unloading_date}.\nThe goods being transported are {goods_type}."
        # message += " Our support team will contact you soon to confirm the order."

        return res["message"]