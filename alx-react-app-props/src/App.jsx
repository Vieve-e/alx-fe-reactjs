import ProfilePage from './components/ProfilePage';
import UserContext from './components/UserContext';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  function App() {
  return (
    <UserContext.Provider value = {{...userData}}>
     <ProfilePage />
    </UserContext.Provider>
  );
  
}

export default App;