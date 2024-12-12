import AdminAuth from "../AdminAuth";
// import "./CorporateCard.css";
import "../../styles/AdminDashboard/CorporateCard/CorporateCard.css";
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

interface CorporateCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const CorporateCard = () => {
	const [CorporateCardList, setCorporateCardList] = useState<CorporateCard[]>(
		[]
	);

	//new CorporateCard states
	const [newCorporateCardTitle, setnewCorporateCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newCorporateCardImage, setNewCorporateCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const CorporateCardsCollectionRef = collection(db, "CorporateCards");

	const [isLoading, setIsLoading] = useState(true);

	const getCorporateCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(CorporateCardsCollectionRef);
			const filteredData: CorporateCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<CorporateCard, "id">),
				id: doc.id,
			}));
			setCorporateCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCorporateCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitCorporateCard = async () => {
		setIsLoading(true);
		if (newCorporateCardImage && newdesc && newCorporateCardTitle) {
			const uniqueImageName = `${Date.now()}-${newCorporateCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newCorporateCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(CorporateCardsCollectionRef, {
					title: newCorporateCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getCorporateCardList();
				setnewCorporateCardTitle("");
				setNewdesc("");
				setNewCorporateCardImage(null);

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

	const deleteCorporateCard = async (id: string, imageUrl: string) => {
		try {
			const CorporateCardDoc = doc(db, "CorporateCards", id);
			await deleteDoc(CorporateCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getCorporateCardList();
			console.log("CorporateCard and image deleted");
		} catch (error) {
			console.error("Error deleting CorporateCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const CorporateCardDoc = doc(db, "CorporateCards", id);
			await updateDoc(CorporateCardDoc, { title: updatedTitle });
			getCorporateCardList();
			setUpdatedTitle("");
			console.log("CorporateCard updated");
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

				const CorporateCardDoc = doc(db, "CorporateCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(CorporateCardDoc, { imageUrl });
				getCorporateCardList();
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

			const CorporateCardDoc = doc(db, "CorporateCards", id);
			await updateDoc(CorporateCardDoc, { imageUrl: "" });

			getCorporateCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const CorporateCardDoc = doc(db, "CorporateCards", id);
			await updateDoc(CorporateCardDoc, { desc: updatedDesc });
			getCorporateCardList();
			setupdatedDesc("");
			console.log("CorporateCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="CorporateCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addCorporateCardTitle">Add New Corporate Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Corporate Card title..."
							value={newCorporateCardTitle}
							onChange={(e) => setnewCorporateCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Corporate Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewCorporateCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitCorporateCard}
							disabled={isLoading}
						>
							Submit Corporate Card
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
							{CorporateCardList.map((CorporateCard) => (
								<div
									className="CorporateCardItemWrapperFire"
									key={CorporateCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{CorporateCard.title}</h1>
											<p>{CorporateCard.desc}</p>
											{CorporateCard.imageUrl && (
												<img
													className="CorporateCardImgFire"
													src={CorporateCard.imageUrl}
													alt={CorporateCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteCorporateCard(
														CorporateCard.id,
														CorporateCard.imageUrl
													)
												}
											>
												Delete Corporate Card
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
												onClick={() => onUpdateTitle(CorporateCard.id)}
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
														CorporateCard.id,
														CorporateCard.imageUrl
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
														CorporateCard.id,
														CorporateCard.imageUrl
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
												onClick={() => onUpDatedesc(CorporateCard.id)}
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

export default CorporateCard;
