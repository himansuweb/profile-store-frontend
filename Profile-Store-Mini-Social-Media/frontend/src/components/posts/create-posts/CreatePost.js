import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/utils";
import PopupEdit from "../../Popup-edit/PopupEdit";
import "./CreatePost.css";

function CreatePost() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [popupMessage, setPopupMessage] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!selectedFile) {
			alert("Please select a file to upload");
			return;
		}

		const formData = new FormData();
		formData.append("avatar", selectedFile);

		try {
			const response = await fetch(`${apiUrl}/api/posts/images`, {
				method: "post",
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				console.log("File uploaded successfully:", data);
				setPopupMessage(data.message);
				// Redirect or handle success as needed
			} else {
				console.error("Failed to upload file");
			}
		} catch (error) {
			console.error("Error during file upload:", error);
		}
	};

	return (
		<div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 z-[100] flex justify-center items-center">
			<div className="w-[500px] h-[500px] bg-[rgba(10,0,0,0.3)] p-[10px] flex justify-center items-center rounded-[20px] text-center text-white">
				<form onSubmit={handleSubmit}>
					<input
						type="file"
						name="avatar"
						onChange={handleFileChange}
					/>
					<button
						className="w-[100px] h-[30px] m-[5px] text-blue-500 bg-white rounded-[5px]"
						type="submit"
					>
						Upload
					</button>
					<button className="w-[100px] h-[30px] m-[5px] text-blue-500 bg-white rounded-[5px]">
						<Link
							className="text-blue-500 no-underline"
							to="/admin"
						>
							Back
						</Link>
					</button>
					{popupMessage && (
						<PopupEdit msg={popupMessage} redirect="/posts" />
					)}
				</form>
			</div>
		</div>
	);
}

export default CreatePost;
