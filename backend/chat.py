from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)  

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key = OPENAI_API_KEY)
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
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

if __name__ == '__main__':
    app.run(debug=True , port=5000)