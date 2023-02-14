import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Rootlayout from "./components/Rootlayout";
import Post from "./pages/Post";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Rootlayout/>}>
        <Route index element={<Profile/>}></Route>
        <Route path="friend" element={<Friends/>}></Route>
        <Route path="post" element={<Post/>}></Route>
      </Route>
      {/* <Route path='/root' element = {<Menubar/>}>  
        <Route index element = {<Profile/>}></Route>
        <Route path="/friend" element={<Friends/>}></Route>
      </Route>
       */}
    </Route>
  )
);



function App() {
  return (
    <>
     <RouterProvider router={router} /> 
    </>
  );
}

export default App;
