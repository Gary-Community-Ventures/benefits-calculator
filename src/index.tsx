import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './Components/Wrapper/Wrapper';
import './index.css';
import { initializeGTM } from './Assets/analytics';;

initializeGTM();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Wrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Wrapper>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
