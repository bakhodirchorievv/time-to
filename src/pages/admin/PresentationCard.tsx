import AdminAuth from "../AdminAuth";
// import "./PresentationCard.css";
import "../../styles/AdminDashboard/PresentationCard/PresentationCard.css";

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

interface PresentationCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const PresentationCard = () => {
	const [PresentationCardList, setPresentationCardList] = useState<
		PresentationCard[]
	>([]);

	//new PresentationCard states
	const [newPresentationCardTitle, setnewPresentationCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newPresentationCardImage, setNewPresentationCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const PresentationCardsCollectionRef = collection(db, "PresentationCards");
	const [isLoading, setIsLoading] = useState(true);
	const getPresentationCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(PresentationCardsCollectionRef);
			const filteredData: PresentationCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<PresentationCard, "id">),
				id: doc.id,
			}));
			setPresentationCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPresentationCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitPresentationCard = async () => {
		if (newPresentationCardImage && newdesc && newPresentationCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newPresentationCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newPresentationCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(PresentationCardsCollectionRef, {
					title: newPresentationCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getPresentationCardList();
				setnewPresentationCardTitle("");
				setNewdesc("");
				setNewPresentationCardImage(null);

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

	const deletePresentationCard = async (id: string, imageUrl: string) => {
		try {
			const PresentationCardDoc = doc(db, "PresentationCards", id);
			await deleteDoc(PresentationCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getPresentationCardList();
			console.log("PresentationCard and image deleted");
		} catch (error) {
			console.error("Error deleting PresentationCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const PresentationCardDoc = doc(db, "PresentationCards", id);
			await updateDoc(PresentationCardDoc, { title: updatedTitle });
			getPresentationCardList();
			setUpdatedTitle("");
			console.log("PresentationCard updated");
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

				const PresentationCardDoc = doc(db, "PresentationCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(PresentationCardDoc, { imageUrl });
				getPresentationCardList();
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

			const PresentationCardDoc = doc(db, "PresentationCards", id);
			await updateDoc(PresentationCardDoc, { imageUrl: "" });

			getPresentationCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const PresentationCardDoc = doc(db, "PresentationCards", id);
			await updateDoc(PresentationCardDoc, { desc: updatedDesc });
			getPresentationCardList();
			setupdatedDesc("");
			console.log("PresentationCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="PresentationCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addPresentationCardTitle">
							Add New Presentation Card
						</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Presentation Card title..."
							value={newPresentationCardTitle}
							onChange={(e) => setnewPresentationCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Presentation Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewPresentationCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitPresentationCard}
							disabled={isLoading}
						>
							Submit Presentation Card
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
							{PresentationCardList.map((PresentationCard) => (
								<div
									className="PresentationCardItemWrapperFire"
									key={PresentationCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>
												{PresentationCard.title}
											</h1>
											<p>{PresentationCard.desc}</p>
											{PresentationCard.imageUrl && (
												<img
													className="PresentationCardImgFire"
													src={PresentationCard.imageUrl}
													alt={PresentationCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deletePresentationCard(
														PresentationCard.id,
														PresentationCard.imageUrl
													)
												}
											>
												Delete Presentation Card
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
												onClick={() => onUpdateTitle(PresentationCard.id)}
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
														PresentationCard.id,
														PresentationCard.imageUrl
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
														PresentationCard.id,
														PresentationCard.imageUrl
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
												onClick={() => onUpDatedesc(PresentationCard.id)}
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

export default PresentationCard;
