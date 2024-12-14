import React from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from "./components/Search";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container text-center mt-8">
      <h1 className="text-3xl font-bold mb-4">GitHub User Search</h1>
      {/* Render the Search component */}
      <Search />
    </div>
  );
}

export default App;