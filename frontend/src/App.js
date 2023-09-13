import { BrowserRouter, Routes, Route} from "react-router-dom";

// Components import
import Navigation from "./components/Shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import Authentication from "./pages/Authentication/Authentication";
import Activate from "./pages/Activate/Activate";

function App() {
	return (
		<BrowserRouter>
			{/* Nav Component */}
			<Navigation />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/authenticate" element={<Authentication />} />
				<Route path="/activate" element={<Activate />} />
				<Route path="/rooms" element={<Rooms />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
