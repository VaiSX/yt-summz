# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get_transcript', methods=['POST'])
def get_transcript():
    data = request.get_json()
    video_id = data.get('videoId')

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([entry['text'] for entry in transcript])
        return jsonify({'transcript': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
