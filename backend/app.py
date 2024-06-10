from flask import Flask, request, jsonify
from flask_cors import CORS
import algorithms
app = Flask(__name__)
CORS(app)

@app.route('/genetic', methods=['POST'])
def genetic():
	dataset = request.get_json()
	result = algorithms.genetic_algorithm(dataset)
	return jsonify(result), 200

@app.route('/decision_tree', methods=['POST'])
def decision_tree():
	file = request.files['dataset']
	dataset = file.read()
	result = algorithms.decision_tree_algorithm(dataset)

	return jsonify(result), 200

@app.route('/knn', methods=['POST'])
def knn():
	file = request.files['dataset']
	dataset = file.read()
	result = algorithms.knn_algorithm(dataset)

	return jsonify(result), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
