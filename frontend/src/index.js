import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./Redux/store";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/yeti/bootstrap.min.css"

import 'katex/dist/katex.min.css'


ReactDOM.render(<Provider store={store}><App /></Provider> ,
  document.getElementById('root')
);


