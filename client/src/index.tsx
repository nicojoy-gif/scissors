import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './Assets/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; //
import { firebaseConfig } from './Components/Firebase/Firebase';
import AuthContextProvider from './Components/Context/AuthContext';

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
