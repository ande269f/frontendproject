import { HeroUIProvider } from "@heroui/system";
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import reduxStore from './store';

export const store = reduxStore;

createRoot(document.getElementById('root')!).render(
    <HeroUIProvider>
    <Provider store={store}>
        <App />
    </Provider>
    </HeroUIProvider>,
);