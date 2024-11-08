import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./About.css";

function About() {
	const [about, setAbout] = useState("");
	const [aboutId, setAboutId] = useState("");
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const pathname = location.pathname;
	useEffect(() => {
		fetch(`${apiUrl}/api/about`)
			.then((res) => res.json())
			.then((aboutData) => {
				console.log("about location", location);
				console.log("about data", aboutData);
				setTimeout(() => {
					setAbout(aboutData[0].description);
					setAboutId(aboutData[0].id);
					setLoading(false);
				}, 1000);
			});
	});

	return (
		<div>
			<div className="sub-admin-container flex flex-col">
				<div className="flex justify-between items-center bg-[#092635] p-[5px] mt-[10px] rounded-[10px]">
					<h3>About</h3>
					<Link
						className="cursor-pointer"
						to={`/admin/about/${aboutId}`}
					>
						<img
							className="editpencil"
							src="/assets/images/pencil.png"
							alt="editinfo"
						/>
					</Link>
				</div>
				{/*<p>{about}</p>*/}

				{loading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<CircularProgress
							sx={{
								color: "primary", // Set the desired color here
							}}
						/>
					</Box>
				) : (
					<p style={{ color: "white", wordBreak: "break-word" }}>
						{about}
					</p>
				)}
			</div>
		</div>
	);
}

export default About;
