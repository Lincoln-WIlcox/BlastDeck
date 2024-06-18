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
import CreateSet from "./pages/CreateSet";
import AddCardToSet from "./pages/AddCardToSet";
import PracticePage from "./pages/Practice";
import ViewStarredCards from "./pages/ViewStarredCards";
import PracticeAll from "./pages/PracticeAll";
import Practice from "./pages/Practice";

export default function ApplicationViews({ loggedInUser, setLoggedInUser })
{
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<AuthorizedRoute />}>
          <Route
            index
            element={<p className="my-text">Welcome to Blast Deck!</p>} />
          <Route path="card">
            <Route index element={<AllCards />} />
            <Route path="mine" element={<MyCards />} />
            <Route path="create" element={<CreateCard />} />
            <Route path=":cardId/edit" element={
              <UserIsCreatorOfCard>
                <EditCard />
              </UserIsCreatorOfCard>
            } />
            <Route path="starred" element={<ViewStarredCards />} />
          </Route>
          <Route path="set">
            <Route index element={<AllSets />} />
            <Route path=":setId">
              <Route index element={<SetDetails />} />
              <Route path="add-card" element={<AddCardToSet />} />
            </Route>
            <Route path="create" element={<CreateSet />} />
          </Route>
          <Route path="practice">
            <Route index element={<Practice />} />
            <Route path="all" element={<PracticeAll />} />
          </Route>
        </Route>

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />

        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route >
    </Routes>
  );
}
