import './App.css';
import Header from './components/Header';
import Main from './components/Main';

export default function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
} 

/* 
FLOW SUMMARAY

  React (frontend)
    ⬇
  http://localhost:5000/api/recipe
    ⬇
  Express backend (adds SYSTEM_PROMPT + token)
    ⬇
  Groq's model (returns recipe)
    ⬇
  Frontend displays it 
*/