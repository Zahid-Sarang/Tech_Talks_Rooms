import Navigation from "./components/Shared/Navigation/Navigation";
import Home from "./pages/Home/Home"
import Rooms from "./pages/Rooms/Rooms"

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    {/* Nav Component */}
    <Navigation />

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/rooms" element={<Rooms />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
