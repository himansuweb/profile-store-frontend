import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Skills.css";

function Skills() {
	const [skills, setSkills] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		fetch(`${apiUrl}/api/skills`)
			.then((res) => res.json())
			.then((skills) => {
				if (skills.Error) {
					setError(skills.Error);
					setSkills([]);
					setLoading(false);
				} else {
					setTimeout(() => {
						setSkills(skills);
						setError("");
						setLoading(false);
					}, 1000);
				}
			});
	}, [location]);
	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center mt-[10px] bg-[#092635] rounded-[10px] p-[5px]">
				<h3>Skills</h3>
				<div>
					<Link
						className="text-white bg-[#257180] ml-[5px] p-[10px] rounded-[10px] no-underline "
						to="/admin/skill/post"
					>
						Post
					</Link>
					<Link
						className="text-white bg-[#257180] ml-[5px] p-[10px] rounded-[10px] no-underline"
						to="/admin/skill/edit"
					>
						Edit
					</Link>
				</div>
			</div>

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
				<div className="h-[200px] overflow-auto mt-[20px] bg-[#092635] p-[5px]">
					{skills.length === 0 ? (
						<p>{error}</p>
					) : (
						<>
							{skills.map((skill) => (
								<div
									className="w-full h-auto overflow-auto m-auto bg-[#232d3f] rounded-[10px] text-white text-center text-[1.5rem] font-bold mb-[10px]"
									key={skill.id}
								>
									<p>{skill.skill}</p>
								</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Skills;
