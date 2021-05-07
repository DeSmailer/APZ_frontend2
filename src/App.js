import React from 'react';
//import Chat from './Chat/Chat';
import { BrowserRouter } from 'react-router-dom';
import Main from './MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Main></Main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;