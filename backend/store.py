from flask import Blueprint, jsonify, request 
from bson import Binary
from pymongo import MongoClient
from extension import store_collection
from flask import send_file
import io

store_bp = Blueprint('store', __name__)

@store_bp.route('/report', methods=['POST'])
def store_report():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part'})

    pdf_file = request.files['pdf']

    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        # Read the PDF content and convert it to binary
        pdf_data = pdf_file.read()
        pdf_binary = Binary(pdf_data)

        # Save the binary data to MongoDB
        store_collection.insert_one({'data': pdf_binary, 'filename': pdf_file.filename})

        return jsonify({'message': 'File stored in MongoDB successfully'})
    except Exception as e:
        return jsonify({'error': f'Error storing PDF in MongoDB: {str(e)}'})



@store_bp.route('/get_pdf/<filename>', methods=['GET'])
def get_pdf(filename):
    # Fetch the PDF data based on the filename
    print(filename)
    pdf_data = store_collection.find_one({'filename': filename})

    if pdf_data:
        return send_file(io.BytesIO(pdf_data['data']), mimetype='application/pdf')
    else:
        return jsonify({'error': 'PDF not found'})
