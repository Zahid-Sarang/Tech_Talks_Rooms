import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components import
import Navigation from "./components/Shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import Authentication from "./pages/Authentication/Authentication";
import Activate from "./pages/Activate/Activate";
import Loader from "./components/Shared/Loader/Loader";
// protected routes
import {
	GuestRoute,
	SemiProtectedRoute,
	ProtectedRoute,
} from "./protected_Routes/Protected_Routes";

function App() {
	// call refresh endpoint
	const { loading } = useLoadingWithRefresh();
	return loading ? (
		<Loader message="Loading,Please Wait" />
	) : (
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
