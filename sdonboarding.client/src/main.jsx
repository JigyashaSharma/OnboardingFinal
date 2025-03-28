import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import './styles/tailwind.css';
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>  {/* Wrap with Provider */}
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
