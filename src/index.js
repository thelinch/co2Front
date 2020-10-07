import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import TravelPage from './pages/Travel/TravelPage';
import "./styles/main.scss"
import M from "materialize-css/dist/js/materialize"
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});
ReactDOM.render(<TravelPage />, document.getElementById('root'));