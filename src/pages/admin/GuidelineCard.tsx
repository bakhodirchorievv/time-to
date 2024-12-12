import AdminAuth from "../AdminAuth";
// import "./GuidelineCard.css";
import "../../styles/AdminDashboard/GuidelineCard/GuidelineCard.css";

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

interface GuidelineCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const GuidelineCard = () => {
	const [GuidelineCardList, setGuidelineCardList] = useState<GuidelineCard[]>(
		[]
	);

	//new GuidelineCard states
	const [newGuidelineCardTitle, setnewGuidelineCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newGuidelineCardImage, setNewGuidelineCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const GuidelineCardsCollectionRef = collection(db, "GuidelineCards");
	const [isLoading, setIsLoading] = useState(true);
	const getGuidelineCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(GuidelineCardsCollectionRef);
			const filteredData: GuidelineCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<GuidelineCard, "id">),
				id: doc.id,
			}));
			setGuidelineCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getGuidelineCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitGuidelineCard = async () => {
		if (newGuidelineCardImage && newdesc && newGuidelineCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newGuidelineCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newGuidelineCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(GuidelineCardsCollectionRef, {
					title: newGuidelineCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getGuidelineCardList();
				setnewGuidelineCardTitle("");
				setNewdesc("");
				setNewGuidelineCardImage(null);

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

	const deleteGuidelineCard = async (id: string, imageUrl: string) => {
		try {
			const GuidelineCardDoc = doc(db, "GuidelineCards", id);
			await deleteDoc(GuidelineCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getGuidelineCardList();
			console.log("GuidelineCard and image deleted");
		} catch (error) {
			console.error("Error deleting GuidelineCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const GuidelineCardDoc = doc(db, "GuidelineCards", id);
			await updateDoc(GuidelineCardDoc, { title: updatedTitle });
			getGuidelineCardList();
			setUpdatedTitle("");
			console.log("GuidelineCard updated");
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

				const GuidelineCardDoc = doc(db, "GuidelineCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(GuidelineCardDoc, { imageUrl });
				getGuidelineCardList();
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

			const GuidelineCardDoc = doc(db, "GuidelineCards", id);
			await updateDoc(GuidelineCardDoc, { imageUrl: "" });

			getGuidelineCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const GuidelineCardDoc = doc(db, "GuidelineCards", id);
			await updateDoc(GuidelineCardDoc, { desc: updatedDesc });
			getGuidelineCardList();
			setupdatedDesc("");
			console.log("GuidelineCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="GuidelineCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addGuidelineCardTitle">Add New Guideline Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Guideline Card title..."
							value={newGuidelineCardTitle}
							onChange={(e) => setnewGuidelineCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Guideline Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewGuidelineCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitGuidelineCard}
							disabled={isLoading}
						>
							Submit Guideline Card
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
							{GuidelineCardList.map((GuidelineCard) => (
								<div
									className="GuidelineCardItemWrapperFire"
									key={GuidelineCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{GuidelineCard.title}</h1>
											<p>{GuidelineCard.desc}</p>
											{GuidelineCard.imageUrl && (
												<img
													className="GuidelineCardImgFire"
													src={GuidelineCard.imageUrl}
													alt={GuidelineCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteGuidelineCard(
														GuidelineCard.id,
														GuidelineCard.imageUrl
													)
												}
											>
												Delete Guideline Card
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
												onClick={() => onUpdateTitle(GuidelineCard.id)}
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
													onUpdateImage(
														GuidelineCard.id,
														GuidelineCard.imageUrl
													)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(
														GuidelineCard.id,
														GuidelineCard.imageUrl
													)
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
												onClick={() => onUpDatedesc(GuidelineCard.id)}
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

export default GuidelineCard;
