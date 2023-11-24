// HtmlDisplay.js
import React, { useState, useEffect } from 'react';

const HtmlDisplay = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch HTML content from your server or source
    fetchHtmlContent();
  }, []);

  const fetchHtmlContent = async () => {
    try {
      const response = await fetch('http://localhost:7000/get-html-content');
      if (response.ok) {
        const content = await response.text();
        setHtmlContent(content);
      } else {
        console.error(`Error fetching HTML content. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  return (
    <div className="html-display">
      <div className="html-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default HtmlDisplay;

