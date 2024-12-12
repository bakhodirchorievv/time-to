import AdminAuth from "../AdminAuth";
// import "./VizitkaCard.css";
import "../../styles/AdminDashboard/VizitkaCard/VizitkaCard.css";

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

interface VizitkaCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const VizitkaCard = () => {
	const [VizitkaCardList, setVizitkaCardList] = useState<VizitkaCard[]>([]);

	//new VizitkaCard states
	const [newVizitkaCardTitle, setnewVizitkaCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newVizitkaCardImage, setNewVizitkaCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const VizitkaCardsCollectionRef = collection(db, "VizitkaCards");
	const [isLoading, setIsLoading] = useState(true);
	const getVizitkaCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(VizitkaCardsCollectionRef);
			const filteredData: VizitkaCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<VizitkaCard, "id">),
				id: doc.id,
			}));
			setVizitkaCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getVizitkaCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitVizitkaCard = async () => {
		if (newVizitkaCardImage && newdesc && newVizitkaCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newVizitkaCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newVizitkaCardImage);
			const imageUrl = await getDownloadURL(imageRef);
			try {
				await addDoc(VizitkaCardsCollectionRef, {
					title: newVizitkaCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getVizitkaCardList();
				setnewVizitkaCardTitle("");
				setNewdesc("");
				setNewVizitkaCardImage(null);

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

	const deleteVizitkaCard = async (id: string, imageUrl: string) => {
		try {
			const VizitkaCardDoc = doc(db, "VizitkaCards", id);
			await deleteDoc(VizitkaCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getVizitkaCardList();
			console.log("VizitkaCard and image deleted");
		} catch (error) {
			console.error("Error deleting VizitkaCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const VizitkaCardDoc = doc(db, "VizitkaCards", id);
			await updateDoc(VizitkaCardDoc, { title: updatedTitle });
			getVizitkaCardList();
			setUpdatedTitle("");
			console.log("VizitkaCard updated");
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

				const VizitkaCardDoc = doc(db, "VizitkaCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(VizitkaCardDoc, { imageUrl });
				getVizitkaCardList();
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

			const VizitkaCardDoc = doc(db, "VizitkaCards", id);
			await updateDoc(VizitkaCardDoc, { imageUrl: "" });

			getVizitkaCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const VizitkaCardDoc = doc(db, "VizitkaCards", id);
			await updateDoc(VizitkaCardDoc, { desc: updatedDesc });
			getVizitkaCardList();
			setupdatedDesc("");
			console.log("VizitkaCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="VizitkaCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addVizitkaCardTitle">Add New Vizitka Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Vizitka Card title..."
							value={newVizitkaCardTitle}
							onChange={(e) => setnewVizitkaCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Vizitka Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewVizitkaCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitVizitkaCard}
							disabled={isLoading}
						>
							Submit Vizitka Card
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
							{VizitkaCardList.map((VizitkaCard) => (
								<div
									className="VizitkaCardItemWrapperFire"
									key={VizitkaCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{VizitkaCard.title}</h1>
											<p>{VizitkaCard.desc}</p>
											{VizitkaCard.imageUrl && (
												<img
													className="VizitkaCardImgFire"
													src={VizitkaCard.imageUrl}
													alt={VizitkaCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteVizitkaCard(
														VizitkaCard.id,
														VizitkaCard.imageUrl
													)
												}
											>
												Delete Vizitka Card
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
												onClick={() => onUpdateTitle(VizitkaCard.id)}
											>
												Update Title
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
													onUpdateImage(VizitkaCard.id, VizitkaCard.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(VizitkaCard.id, VizitkaCard.imageUrl)
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
												onClick={() => onUpDatedesc(VizitkaCard.id)}
											>
												Update Desc
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

export default VizitkaCard;
