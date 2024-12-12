import AdminAuth from "../AdminAuth";
// import "./PartnerCard.css";
// import "../../styles/AdminDashboard/PartnerCard/PartnerCard.css";

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
import Head from "next/head";

interface PartnerCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const PartnerCard = () => {
	const [PartnerCardList, setPartnerCardList] = useState<PartnerCard[]>([]);

	//new PartnerCard states
	const [newPartnerCardTitle, setnewPartnerCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newPartnerCardImage, setNewPartnerCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const PartnerCardsCollectionRef = collection(db, "PartnerCards");
	const [isLoading, setIsLoading] = useState(true);
	const getPartnerCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(PartnerCardsCollectionRef);
			const filteredData: PartnerCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<PartnerCard, "id">),
				id: doc.id,
			}));
			setPartnerCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPartnerCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitPartnerCard = async () => {
		if (newPartnerCardImage && newdesc && newPartnerCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newPartnerCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newPartnerCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(PartnerCardsCollectionRef, {
					title: newPartnerCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getPartnerCardList();
				setnewPartnerCardTitle("");
				setNewdesc("");
				setNewPartnerCardImage(null);

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

	const deletePartnerCard = async (id: string, imageUrl: string) => {
		try {
			const PartnerCardDoc = doc(db, "PartnerCards", id);
			await deleteDoc(PartnerCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getPartnerCardList();
			console.log("PartnerCard and image deleted");
		} catch (error) {
			console.error("Error deleting PartnerCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const PartnerCardDoc = doc(db, "PartnerCards", id);
			await updateDoc(PartnerCardDoc, { title: updatedTitle });
			getPartnerCardList();
			setUpdatedTitle("");
			console.log("PartnerCard updated");
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

				const PartnerCardDoc = doc(db, "PartnerCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(PartnerCardDoc, { imageUrl });
				getPartnerCardList();
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

			const PartnerCardDoc = doc(db, "PartnerCards", id);
			await updateDoc(PartnerCardDoc, { imageUrl: "" });

			getPartnerCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const PartnerCardDoc = doc(db, "PartnerCards", id);
			await updateDoc(PartnerCardDoc, { desc: updatedDesc });
			getPartnerCardList();
			setupdatedDesc("");
			console.log("PartnerCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/PartnerCard/PartnerCard.css"
				/>
			</Head>
			<div className="PartnerCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addPartnerCardTitle">Add New Partner Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Partner Card title..."
								value={newPartnerCardTitle}
								onChange={(e) => setnewPartnerCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Partner Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewPartnerCardImage(
										e.target.files ? e.target.files[0] : null
									)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitPartnerCard}
								disabled={isLoading}
							>
								Submit Partner Card
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
								{PartnerCardList.map((PartnerCard) => (
									<div
										className="PartnerCardItemWrapperFire"
										key={PartnerCard.id}
									>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{PartnerCard.title}</h1>
												<p>{PartnerCard.desc}</p>
												{PartnerCard.imageUrl && (
													<img
														className="PartnerCardImgFire"
														src={PartnerCard.imageUrl}
														alt={PartnerCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deletePartnerCard(
															PartnerCard.id,
															PartnerCard.imageUrl
														)
													}
												>
													Delete Partner Card
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
													onClick={() => onUpdateTitle(PartnerCard.id)}
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
														onUpdateImage(PartnerCard.id, PartnerCard.imageUrl)
													}
												>
													Update Image
												</button>
												<br />
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														onDeleteImage(PartnerCard.id, PartnerCard.imageUrl)
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
													onClick={() => onUpDatedesc(PartnerCard.id)}
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
		</>
	);
};

export default PartnerCard;
