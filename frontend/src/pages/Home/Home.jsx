import React from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import Button from "../../components/Shared/Button/Button";
import Card from "../../components/Shared/Card/Card";


const Home = () => {
	const navigate = useNavigate();

	function startRegister() {
		navigate("/authenticate");
	}
	return (
		<div className="flex items-center justify-center mt-24">
			<Card title="Welcome to Tech-Talks-Rooms!" icon="Home">
				<p className="mb-8 text-xl leading-relaxed text-center text-secondary-text">
					Dive into Tech-Talk-Rooms, the prime hub for coders. Engage in
					dedicated spaces, discussing coding challenges, projects, and latest
					trends. A platform where tech voices unite, collaborate, and inspire.
					Shape the future of coding with every conversation. Join our dynamic
					coding community now.
				</p>
				<div>
					<Button onClick={startRegister} text="Let's Go" />
				</div>
				{/* <div className="mt-5">
					<span className="text-Active-text">Have an invite text?</span>
				</div> */}
			</Card>
		</div>
	);
};

export default Home;
