import React, { useState } from 'react';
import ChatBot from './ChatBot';
import HtmlDisplay from './ShowHtml';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:7000/upload', {
        method: 'POST',
        body: formData,
        headers: {
        },
        mode: 'cors', 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setHtmlContent(result.htmlContent); // Update state with HTML content

      setUploaded(true);
    } catch (error) {
      console.error('Error during file upload:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploaded && (
        <div className="split-screen-container">
          <div className="right-pane">
            <ChatBot />
          </div>
          <div className="left-panel">
            <HtmlDisplay />
            </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
