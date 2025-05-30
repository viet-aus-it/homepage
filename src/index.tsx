import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';

async function renderRoot() {
  const RootComponent = (
    <StrictMode>
      <App />
    </StrictMode>
  );

  const rootElement = document.getElementById('root') as HTMLElement;
  const root = createRoot(rootElement);
  root.render(RootComponent);
}

renderRoot();
