import './App.css';
import { LanguageProvider } from "./context/LanguageContext";
import Home from './pages/Home';

function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
}

export default App;
