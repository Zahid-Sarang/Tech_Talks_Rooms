import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isAuth = false;
const user = {
    activated: false,
};

// Guest routes
export function GuestRoute({ component: Component }) {
	// const { isAuth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate("/rooms");
		}
	}, [navigate]);

	if (isAuth) {
		return null;
	}

	return <Component />;
}

// SemiProtected Routes
export function SemiProtectedRoute({ component: Component }) {
	// const { user, isAuth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate("/");
		} else if (isAuth && user.activated) {
			navigate("/rooms");
		}
	}, [navigate]);

	if (!isAuth || (isAuth && user.activated)) {
		return null;
	}

	return <Component />;
}

// Protected Route
 export function ProtectedRoute({ component: Component }) {
	// const { user, isAuth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate("/");
		} else if (isAuth && !user.activated) {
			navigate("/activate");
		}
	}, [navigate]);

	if (!isAuth || (isAuth && !user.activated)) {
		return null;
	}

	return <Component />;
}
