import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import AllCards from "./pages/AllCards";
import CreateCard from "./pages/CreateCard";
import EditCard from "./pages/EditCard";
import MyCards from "./pages/MyCards";
import UserIsCreatorOfCard from "./components/cardform/UserIsAuthor";

export default function ApplicationViews({ loggedInUser, setLoggedInUser })
{
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p className="my-text">Welcome to Blast Deck!</p>
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
          <Route index element={<AllCards />} />
          <Route path="mine" element={<MyCards />} />
          <Route path="create" element={<CreateCard />} />
          <Route path="edit/:cardId" element={
            <UserIsCreatorOfCard>
              <EditCard />
            </UserIsCreatorOfCard>
          } />
        </Route>
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route >
    </Routes>
  );
}
