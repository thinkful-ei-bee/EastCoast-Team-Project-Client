import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {UserProvider} from './contexts/UserContext'
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

ReactDOM.render(
<BrowserRouter>
  <UserProvider>
    <App />
  </UserProvider>
</BrowserRouter>, document.getElementById('root'));

