import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import AllCards from "./pages/AllCards";
import CreateCard from "./pages/CreateCard";
import EditCard from "./pages/EditCard";
import MyCards from "./pages/MyCards";
import UserIsCreatorOfCard from "./components/cardform/UserIsAuthor";
import AllSets from "./pages/AllSets";
import SetDetails from "./pages/SetDetails/SetDetails";

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
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllCards />
            </AuthorizedRoute>
          } />
          <Route path="mine" element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyCards />
            </AuthorizedRoute>}
          />
          <Route path="create" element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateCard />
            </AuthorizedRoute>
          } />
          <Route path=":cardId/edit" element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <UserIsCreatorOfCard>
                <EditCard />
              </UserIsCreatorOfCard>
            </AuthorizedRoute>
          } />
        </Route>
        <Route path="set">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllSets />
            </AuthorizedRoute>
          } />
          <Route path=":setId" element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <SetDetails />
            </AuthorizedRoute>
          } />
        </Route>
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route >
    </Routes>
  );
}
