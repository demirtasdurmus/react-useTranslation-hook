import './App.css';
import { LanguageProvider } from "./context/LanguageContext";
import Home from './pages/Home';


export default function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  )
};
