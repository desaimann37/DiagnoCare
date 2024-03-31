from flask import Blueprint , request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

chat_bp = Blueprint('chat' , __name__)

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key = OPENAI_API_KEY)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    # response = client.chat.completions.create(
    #     model="gpt-4-vision-preview",
    #     messages=[
    #         {
    #             "role": "user",
    #             "content": [
    #                 {"type": "text", "text": "What’s in this image?"},
    #                 {
    #                     "type": "image_url",
    #                     "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
    #                 },
    #             ],
    #         }
    #     ],
    #     max_tokens=300,
    # )

    # print(response.choices[0])
    print(data.get('question'))
    question = data.get('question')
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "user", "content": question}
        ]
    )   

    print(completion.choices[0].message)
    return jsonify({'response': completion.choices[0].message.content})
    # response = openai.Completion.create(
    #     engine="text-davinci-002",
    #     prompt=question,
    #     max_tokens=1024,
    #     n=1,
    #     stop=None,
    #     temprature=0.7
    # )