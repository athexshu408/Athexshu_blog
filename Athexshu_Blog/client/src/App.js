import Home from "./pages/home/Home";

import TopBar from "./components/topbar/TopBar";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write"
import Setting from "./pages/settings/Setting"
//import Post from "./components/post/Post";
import Single from "./pages/single/Single";
import { useContext } from "react";
import { Context } from "./context/Context";




function App() {

  const {user} = useContext(Context)
  return (
   <BrowserRouter>
   <TopBar/>
   <Routes>
    <Route exact path="/"element={<Home/>}/>
    <Route path="/register"element={user ? <Home /> :<Register />}/>
    <Route path="/login"element={user ? <Home />: <Login/>}/>
    <Route path="/write"element={user? <Write/>:<Register />}/>
    <Route path="/setting"element={user?<Setting/>:<Register />}/>
    <Route path="/post/:postId"element={<Single />}/>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
