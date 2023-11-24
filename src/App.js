import React, { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';


function App() {
    const [iepContent, setIepContent] = useState('');

    useEffect(() => {
        // Fetch the content of public/iep.html
        fetch('.*/uploads/iep_copy.html')
            .then(response => response.text())
            .then(content => setIepContent(content))
            .catch(error => console.error('Error fetching iep.html:', error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React OpenAI App</h1>
                <FileUpload />
            </header>
        </div>
    );
}

export default App;




