import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TopicProvider } from './context/TopicContext.jsx';

createRoot(document.getElementById('root')).render(
    <TopicProvider> 
      <App />
    </TopicProvider>
);
