from flask import Blueprint, jsonify, request 
from bson import Binary,ObjectId, json_util
from pymongo import MongoClient
from extension import store_collection, patient_collection
from flask import send_file
import io

store_bp = Blueprint('store', __name__)

@store_bp.route('/report', methods=['POST'])
def store_report():
    if 'pdf' not in request.files:
        print(request.files)
        return jsonify({'error': 'No file part'})
    
    selected_patient = request.form.get('selectedPatient')
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



@store_bp.route('/open_pdf/<filename>', methods=['GET'])
def open_pdf(filename):
    # Fetch the PDF data based on the filename
    print(filename)
    pdf_data = store_collection.find_one({'filename': filename})

    if pdf_data:
        return send_file(io.BytesIO(pdf_data['data']), mimetype='application/pdf')
    else:
        return jsonify({'error': 'PDF not found'})

@store_bp.route('/get_pdf_pid/<patientId>', methods=['GET'])
def get_pdf(patientId):
    patient = patient_collection.find_one({'_id': ObjectId(patientId)})
    patient['_id'] = str(patient['_id'])
    
    if not patient:
        return jsonify({'error': 'Patient not found'})

    patient_name = patient.get('name')
    if not patient_name:
        return jsonify({'error': 'Patient name not found'})

    pdf_data_cursor = store_collection.find({'filename': {'$regex': f"{patient_name}_"}})

    pdf_data_list = []
    for document in pdf_data_cursor:
        filename = document['filename']
        print(filename)
        pdf_data_list.append(filename)

    if patient:
        return jsonify({"document":pdf_data_list , "patient" : patient})
    else:
        return jsonify({'error': 'No PDFs found for the patient'})
