import React, { useState } from 'react';
import axios from 'axios';

const AiAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/tasks/ai-suggest', { prompt });
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error(err);
      setSuggestion('Failed to fetch AI suggestions.');
    }
    setLoading(false);
  };

  return (
    <div className="card mb-4 p-4 bg-white border border-secondary border-opacity-25">
      <h5 className="card-title fw-bold text-primary mb-2">
        <i className="bi bi-cpu me-2"></i> Groq AI Strategic Planner
      </h5>
      <p className="text-muted small">Input a major objective to receive an AI-generated actionable breakdown.</p>
      <form onSubmit={handleGenerate} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="e.g., Plan enterprise migration to cloud infrastructure..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn btn-outline-primary fw-semibold" type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Generate Plan'}
        </button>
      </form>
      {suggestion && (
        <div className="p-3 bg-light rounded border small" style={{ whiteSpace: 'pre-wrap' }}>
          <strong>AI Recommendations:</strong>
          <div>{suggestion}</div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;