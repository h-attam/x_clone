import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Protected from "./components/Protected";

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route element={<Protected/>}>
      <Route path="/" element={<Login/>} />
      <Route path="/feed" element={<Feed/>} />
      <Route path="/ayarlar" element={<h1>AYARLAR</h1>} />
      <Route path="/profil" element={<h1>PROFİL</h1>} />
      <Route path="/admin" element={<h1>ADMİN</h1>} />
      </Route>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
