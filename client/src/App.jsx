import { createContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "./components/Navbar";
import ApplicationViews from "./ApplicationViews";

export const UserContext = createContext()

function App()
{
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() =>
  {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) =>
    {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if(loggedInUser === undefined)
  {
    return <Spinner />;
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </UserContext.Provider>
  );
}

export default App;
