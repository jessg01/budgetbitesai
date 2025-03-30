import React, { useState } from 'react';

export default function Dashboard() {
  const [output, setOutput] = useState('');

  const runPythonScript = async () => {
    try {
      const response = await fetch('/run-python-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.result) {
        setOutput(data.result);
      } else {
        setOutput('Error executing Python script.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while calling the backend.');
    }
  };

  return (
    <div>
      <button onClick={runPythonScript}>Run Python Script</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}