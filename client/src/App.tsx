import "@style/base.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { Route } from "wouter";
import Main from "./pages/Main";
import UserPage from "./pages/UserPage";
import EditProfile from "./components/user/EditProfile";

function App() {
  return (
    <>
      <Route path="/edit/">
        <EditProfile />
      </Route>
      <Route path="/user/:username/">
        {(params) => <UserPage username={params.username} />}
      </Route>
      <Route path="/">
        <Main />
        {/*<ChatPrev user={{ Username: "nickname", Name: "Биточкин Егор Иванович" }} notification={true} /> */}
      </Route>
      <Route path="/login/">
        <Login />
      </Route>
      <Route path="/register/">
        <Register />
      </Route>
    </>
  );
}

export default App;
