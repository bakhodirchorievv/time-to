import AdminAuth from "../AdminAuth";
// import "./SouvenirCard.css";
import "../../styles/AdminDashboard/SouvenirCard/SouvenirCard.css";

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

interface SouvenirCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const SouvenirCard = () => {
	const [SouvenirCardList, setSouvenirCardList] = useState<SouvenirCard[]>([]);

	//new SouvenirCard states
	const [newSouvenirCardTitle, setnewSouvenirCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newSouvenirCardImage, setNewSouvenirCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const SouvenirCardsCollectionRef = collection(db, "SouvenirCards");
	const [isLoading, setIsLoading] = useState(true);
	const getSouvenirCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(SouvenirCardsCollectionRef);
			const filteredData: SouvenirCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<SouvenirCard, "id">),
				id: doc.id,
			}));
			setSouvenirCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSouvenirCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitSouvenirCard = async () => {
		if (newSouvenirCardImage && newdesc && newSouvenirCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newSouvenirCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newSouvenirCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(SouvenirCardsCollectionRef, {
					title: newSouvenirCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getSouvenirCardList();
				setnewSouvenirCardTitle("");
				setNewdesc("");
				setNewSouvenirCardImage(null);

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

	const deleteSouvenirCard = async (id: string, imageUrl: string) => {
		try {
			const SouvenirCardDoc = doc(db, "SouvenirCards", id);
			await deleteDoc(SouvenirCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getSouvenirCardList();
			console.log("SouvenirCard and image deleted");
		} catch (error) {
			console.error("Error deleting SouvenirCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const SouvenirCardDoc = doc(db, "SouvenirCards", id);
			await updateDoc(SouvenirCardDoc, { title: updatedTitle });
			getSouvenirCardList();
			setUpdatedTitle("");
			console.log("SouvenirCard updated");
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

				const SouvenirCardDoc = doc(db, "SouvenirCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(SouvenirCardDoc, { imageUrl });
				getSouvenirCardList();
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

			const SouvenirCardDoc = doc(db, "SouvenirCards", id);
			await updateDoc(SouvenirCardDoc, { imageUrl: "" });

			getSouvenirCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const SouvenirCardDoc = doc(db, "SouvenirCards", id);
			await updateDoc(SouvenirCardDoc, { desc: updatedDesc });
			getSouvenirCardList();
			setupdatedDesc("");
			console.log("SouvenirCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="SouvenirCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addSouvenirCardTitle">Add New Souvenir Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Souvenir Card title..."
							value={newSouvenirCardTitle}
							onChange={(e) => setnewSouvenirCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Souvenir Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewSouvenirCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitSouvenirCard}
							disabled={isLoading}
						>
							Submit Souvenir Card
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
							{SouvenirCardList.map((SouvenirCard) => (
								<div
									className="SouvenirCardItemWrapperFire"
									key={SouvenirCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{SouvenirCard.title}</h1>
											<p>{SouvenirCard.desc}</p>
											{SouvenirCard.imageUrl && (
												<img
													className="SouvenirCardImgFire"
													src={SouvenirCard.imageUrl}
													alt={SouvenirCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteSouvenirCard(
														SouvenirCard.id,
														SouvenirCard.imageUrl
													)
												}
											>
												Delete Souvenir Card
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
												onClick={() => onUpdateTitle(SouvenirCard.id)}
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
													onUpdateImage(SouvenirCard.id, SouvenirCard.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(SouvenirCard.id, SouvenirCard.imageUrl)
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
												onClick={() => onUpDatedesc(SouvenirCard.id)}
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

export default SouvenirCard;
