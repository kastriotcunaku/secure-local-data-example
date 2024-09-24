import { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Notes from "./pages/Notes";
import useDocumentVisibility from "./lib/hooks/useDocumentVisibility";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDocumentVisible = useDocumentVisibility();


  useEffect(() => {
    const name = localStorage.getItem("name");
    const password = localStorage.getItem("password");
    if (name && password) {
      setIsRegistered(true);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isDocumentVisible) {
      setIsLoggedIn(false);
    }
  }, [isDocumentVisible]);

  const onSignUp = () => {
    setIsRegistered(true);
    setIsLoggedIn(true);
  }

  const onSignIn = () => {
    setIsLoggedIn(true);
  }

  const onSignInFailure = () => {
    setIsRegistered(false);
    setIsLoggedIn(false);
  }


  if (!isRegistered) {
    return <SignUp onSuccess={onSignUp} />;
  }

  if (!isLoggedIn) {
    return <SignIn onSuccess={onSignIn} onFailure={onSignInFailure} />;
  }
  
  return <Notes />
}

export default App;
