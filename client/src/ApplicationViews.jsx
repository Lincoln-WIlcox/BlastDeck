import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import AllPosts from "./pages/AllPosts";

export default function ApplicationViews({ loggedInUser, setLoggedInUser })
{
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <>Welcome to Blast Deck!</>
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="card">
          <Route index element={<AllPosts />} />
        </Route>
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route >
    </Routes>
  );
}
