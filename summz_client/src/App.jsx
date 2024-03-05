// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videoId, setVideoId] = useState('');
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/get_transcript', {
        videoId,
      });

      setTranscript(response.data.transcript);
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };

  const handleSummarize = () => {
    // Call the API with the user's input
    axios
      .post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          inputs: transcript,
        },
        {
          headers: { Authorization: "Bearer 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" },
        }
      )
      .then((response) => {
        // Update the state with the summarized result
        setSummary(response.data[0]?.summary_text || "No summary available");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="App">
    <div className="container">
      <h1>YouTube Transcript Summarizer </h1>
      <form onSubmit={handleSubmit}>
        <label>
          YouTube Video ID:
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
        </label>
        <button type="submit">Get Transcript</button>
      </form>
      {transcript && (
        <div>
          <h2>Transcript:</h2>
          <textarea
            rows="10"
            cols="50"
            value={transcript}
            readOnly
          />
          <button onClick={handleSummarize}>Summarize</button>
        </div>
      )}
      {summary && (
        <div>
          <h2>Summary:</h2>
          <textarea
            rows="5"
            cols="50"
            value={summary}
            readOnly
          />
        </div>
      )}
    </div>
  </div>
  );
}

export default App;
