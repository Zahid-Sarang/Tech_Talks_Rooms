import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components import
import Navigation from "./components/Shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import Authentication from "./pages/Authentication/Authentication";
import Activate from "./pages/Activate/Activate";

// protected routes
import {
	GuestRoute,
	SemiProtectedRoute,
	ProtectedRoute,
} from "./protected_Routes/Protected_Routes";

function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			{/* Nav Component */}
			<Navigation />

			<Routes>
				<Route path="/" element={<GuestRoute component={Home} />} />
				<Route
					path="/authenticate"
					element={<GuestRoute component={Authentication} />}
				/>
				<Route
					path="/activate"
					element={<SemiProtectedRoute component={Activate} />}
				/>
				<Route path="/rooms" element={<ProtectedRoute component={Rooms} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
