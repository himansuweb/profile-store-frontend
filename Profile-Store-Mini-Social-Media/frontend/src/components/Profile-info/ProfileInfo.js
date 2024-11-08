import React, { useState, useEffect, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ProfileInfo.css";
import { apiUrl } from "../../utils/utils";
import ProfileLinks from "../Profile-links/ProfileLinks";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ProfileInfo() {
	const [name, setName] = useState("");
	const [headline, setHeadline] = useState("");
	const [loader, setLoader] = useState(true);

	const [profileId, setProfileId] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const profileInfo = await fetch(`${apiUrl}/api/profile-info`);
				const profileInfoData = await profileInfo.json();
				// if (!profileInfoData.ok) {
				// 	alert("You are Offline");
				// }
				setTimeout(() => {
					setName(profileInfoData[0].name);
					setHeadline(profileInfoData[0].headline);
					setProfileId(profileInfoData[0].id);
					setLoader(false);
				}, 1000);
			} catch (error) {
				console.error("Error fetching profile-info:", error);
			}
		};
		fetchProfileInfo();
	}, [setProfileId, location]);

	return (
		<div className="max-w-[400px] h-auto text-center text-[1.5rem] text-white break-words flex justify-center flex-col">
			<Link to={`/admin/profile-info/${profileId}/edit`}>
				<img
					className="editpencil"
					src="/assets/images/pencil.png"
					alt="editinfo"
				/>
			</Link>
			{loader ? (
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
				<>
					<h1 className="leading-[0.1]">{name}</h1>
					<h3 className="leading-[0.1]">{headline}</h3>
					<ProfileLinks />
				</>
			)}
		</div>
	);
}

export default ProfileInfo;
