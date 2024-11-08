import { useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import ProfilePhoto from "../../Profile-photo/ProfilePhoto";
import PopupEdit from "../../Popup-edit/PopupEdit";
import CommentBox from "../comments/CommentBox";
import { ThemeContext } from "../../../ThemeContext";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Images.css";

const shareData = {
	title: "Profile-Store",
	url: "https://profile-store-mini-social-media.onrender.com",
};

function Images() {
	const [postImages, setPostImages] = useState([]);
	const [like, setLike] = useState("");
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const [loader, setLoader] = useState(true);
	const [loader2, setLoader2] = useState(true);
	const location = useLocation();
	useEffect(() => {
		fetch(`${apiUrl}/api/posts/images`)
			.then((res) => res.json())
			.then((images) => {
				console.log(images);
				setTimeout(() => {
					setPostImages(images);
					setLoader(false);
				}, 1000);
			});
	}, [location]);

	useEffect(() => {
		setTimeout(() => {
			setLoader2(false);
		}, 5000);
	});

	// function shareHandler() {
	// 	navigator.share(shareData);
	// }

	function handleShare() {
		if (navigator.share) {
			navigator
				.share(shareData)
				.then(() => console.log("Share successful"))
				.catch((error) => console.error("Error sharing:", error));
		} else {
			alert("Sharing is not supported on this device.");
		}
	}

	useEffect(() => {
		fetch(`${apiUrl}/api/profiles`)
			.then((res) => res.json())
			.then((peopleLikes) => {
				setLike(peopleLikes[3].likes_count);
			});
	}, []);

	function likebtn() {
		fetch(`${apiUrl}/api/posts/likes`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ profile_id: 1 }),
		})
			.then((res) => res.json())
			.then(() => {
				fetch(`${apiUrl}/api/profiles`)
					.then((res) => res.json())
					.then((peopleLikes) => {
						setLike(peopleLikes[3].likes_count);
					});
			});
	}

	return (
		<div
			style={{ color: isDarkMode ? "black" : "white" }}
			className="max-w-[400px] h-auto m-auto mt-[20px] p-[10px]"
		>
			<div
				style={{
					background: isDarkMode ? "#2C4E80" : "#00215E",
				}}
				className="max-w-full h-auto border border-white rounded-[10px] flex justify-around items-center mb-[10px]"
			>
				<h1 style={{ color: isDarkMode ? "white" : "white" }}>
					Create Posts
				</h1>
				<Link
					className="text-white no-underline"
					to="/posts/create-post"
				>
					<img
						className="add-button"
						src="/assets/images/add-button.png"
						alt="create-img"
					/>
				</Link>
			</div>

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
					{postImages.map((img) => (
						<div
							// style={{
							// 	border: isDarkMode
							// 		? "1px solid black"
							// 		: "1px solid white",
							// }}
							className="max-w-full h-full p-[10px] mt-[20px] rounded-[20px]"
							key={img.id}
						>
							{loader2 ? (
								<Stack spacing={1}>
									<Skeleton
										animation="wave"
										variant="rectangular"
										maxWidth={400}
										height={400}
										sx={{
											borderRadius: "10px",
											background: isDarkMode
												? "primary"
												: "#E4E0E1",
										}}
									/>
								</Stack>
							) : (
								<div
									style={{
										background: isDarkMode
											? "white"
											: "white",
										color: isDarkMode ? "black" : "black",
									}}
									className="max-w-full h-auto mt-[20px] rounded-[10px] shadow-[0.5px_0.5px_0.8px_0.5px_black] p-[10px]"
								>
									<div
										// style={{
										// 	background: isDarkMode ? "#31363F" : "#87A2FF",
										// }}
										className="max-w-full h-[50px] flex justify-between p-[10px] mb-[20px]"
									>
										<div className="max-w-[60px] h-auto">
											<ProfilePhoto
												imgSrc="/assets/images/user.png"
												className="max-w-full aspect-[1/1] rounded-full h-auto"
											/>
										</div>
										<div>
											<Link to={`/posts/${img.id}`}>
												<img
													className="w-[50px] max-h-[50px]"
													src="/assets/images/menu.png"
													alt="triple dot"
												/>
											</Link>
											<Outlet />
										</div>
									</div>
									<hr className="border border-black-900" />
									<div className="max-w-full h-auto">
										<img
											className="w-full h-[300px] border border-white rounded-[10px]"
											src={img.image_url}
											alt="posted image"
										/>
									</div>
									<hr className="border border-black-900" />
									<div
										// style={{
										// 	background: isDarkMode ? "#0B192C" : "#F5EFFF",
										// }}
										className="max-w-full h-auto flex justify-around"
									>
										<div className="flex justify-center flex-col items-center">
											<div>
												<img
													onClick={likebtn}
													className="max-w-[30px] h-[30px]"
													src="/assets/images/like.png"
													alt="like"
												/>
												<span className="ml-[10px] text-[1.4rem] text-shadow-[1px_5px_1px_yellow]">
													{like}
												</span>
											</div>
											<h4>Like</h4>
										</div>
										<div className="flex justify-center flex-col items-center">
											<Link to="/posts/comments">
												<img
													className="max-w-[30px] h-[30px]"
													src="/assets/images/comment.png"
													alt="comment"
												/>
											</Link>
											<h4>Comment</h4>
										</div>
										<div className="flex justify-center flex-col items-center">
											<img
												onClick={handleShare}
												className="max-w-[30px] h-[30px]"
												src="/assets/images/share.png"
												alt="share"
											/>
											<h4>Share</h4>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</>
			)}
		</div>
	);
}

export default Images;
