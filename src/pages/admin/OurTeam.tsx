import AdminAuth from "../AdminAuth";
// import "./OurTeam.css";
import "../../styles/AdminDashboard/OurTeam/OurTeam.css";

import { db, auth, storage } from "../FirebaseConfig";
import { useEffect, useRef, useState } from "react";
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import NavBar from "./NavBar";
import { ClipLoader } from "react-spinners";

interface OurTeam {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const OurTeam = () => {
	const [OurTeamList, setOurTeamList] = useState<OurTeam[]>([]);

	//new OurTeam states
	const [newOurTeamTitle, setnewOurTeamTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newOurTeamImage, setNewOurTeamImage] = useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const OurTeamsCollectionRef = collection(db, "OurTeams");
	const [isLoading, setIsLoading] = useState(true);
	const getOurTeamList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(OurTeamsCollectionRef);
			const filteredData: OurTeam[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<OurTeam, "id">),
				id: doc.id,
			}));
			setOurTeamList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getOurTeamList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitOurTeam = async () => {
		if (newOurTeamImage && newdesc && newOurTeamTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newOurTeamImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newOurTeamImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(OurTeamsCollectionRef, {
					title: newOurTeamTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getOurTeamList();
				setnewOurTeamTitle("");
				setNewdesc("");
				setNewOurTeamImage(null);

				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		} else {
			console.error("Something is not selected (image or title or desc)");
		}
	};

	const deleteOurTeam = async (id: string, imageUrl: string) => {
		try {
			const OurTeamDoc = doc(db, "OurTeams", id);
			await deleteDoc(OurTeamDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getOurTeamList();
			console.log("OurTeam and image deleted");
		} catch (error) {
			console.error("Error deleting OurTeam or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const OurTeamDoc = doc(db, "OurTeams", id);
			await updateDoc(OurTeamDoc, { title: updatedTitle });
			getOurTeamList();
			setUpdatedTitle("");
			console.log("OurTeam updated");
		} catch (error) {
			console.error("while updating title", error);
		}
	};

	const onUpdateImage = async (id: string, currentImageUrl: string) => {
		if (updatedImage) {
			try {
				const uniqueImageName = `${Date.now()}-${updatedImage.name}`;
				const imageRef = ref(storage, `images/${uniqueImageName}`);
				await uploadBytes(imageRef, updatedImage);
				const imageUrl = await getDownloadURL(imageRef);

				const OurTeamDoc = doc(db, "OurTeams", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(OurTeamDoc, { imageUrl });
				getOurTeamList();
				setUpdatedImage(null);

				if (updatedImageFile.current) {
					updatedImageFile.current.value = "";
				}
				console.log("Image updated");
			} catch (error) {
				console.error("Error updating image: ", error);
			}
		} else {
			console.error("No image selected for update");
		}
	};

	const onDeleteImage = async (id: string, imageUrl: string) => {
		const imageRef = ref(storage, imageUrl);

		try {
			await deleteObject(imageRef);

			const OurTeamDoc = doc(db, "OurTeams", id);
			await updateDoc(OurTeamDoc, { imageUrl: "" });

			getOurTeamList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const OurTeamDoc = doc(db, "OurTeams", id);
			await updateDoc(OurTeamDoc, { desc: updatedDesc });
			getOurTeamList();
			setupdatedDesc("");
			console.log("OurTeam date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="OurTeam-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addOurTeamTitle">Add New Team Member</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Team Member Name..."
							value={newOurTeamTitle}
							onChange={(e) => setnewOurTeamTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Team Member job..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewOurTeamImage(e.target.files ? e.target.files[0] : null)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitOurTeam}
							disabled={isLoading}
						>
							Submit Team Member
						</button>
					</div>
				)}

				{userEmail &&
					(isLoading ? (
						<div className="loading-indicator">
							<ClipLoader size={50} color={"#eee"} loading={isLoading} />
						</div>
					) : (
						<div className="controlDataWrapper">
							{OurTeamList.map((OurTeam) => (
								<div className="OurTeamItemWrapperFire" key={OurTeam.id}>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{OurTeam.title}</h1>
											<p>{OurTeam.desc}</p>
											{OurTeam.imageUrl && (
												<img
													className="OurTeamImgFire"
													src={OurTeam.imageUrl}
													alt={OurTeam.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteOurTeam(OurTeam.id, OurTeam.imageUrl)
												}
											>
												Delete Team Member
											</button>
											<br />
											<input
												className="admin-input"
												onChange={(e) => setUpdatedTitle(e.target.value)}
												type="text"
												value={updatedTitle}
												placeholder="new title..."
											/>
											<button
												className="admin-btn"
												onClick={() => onUpdateTitle(OurTeam.id)}
											>
												Update Name
											</button>
											<br />
											<input
												className="admin-input"
												type="file"
												ref={updatedImageFile}
												onChange={(e) =>
													setUpdatedImage(
														e.target.files ? e.target.files[0] : null
													)
												}
											/>
											<button
												className="admin-btn"
												onClick={() =>
													onUpdateImage(OurTeam.id, OurTeam.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(OurTeam.id, OurTeam.imageUrl)
												}
											>
												Delete Image
											</button>
											<br />
											<input
												className="admin-input"
												type="text"
												onChange={(e) => setupdatedDesc(e.target.value)}
												value={updatedDesc}
												placeholder="new desc..."
											/>
											<button
												className="admin-btn"
												onClick={() => onUpDatedesc(OurTeam.id)}
											>
												Update Job
											</button>
										</>
									)}
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
};

export default OurTeam;
