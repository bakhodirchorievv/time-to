import AdminAuth from "../AdminAuth";
// import "./MotionDesignCard.css";
// import "../../styles/AdminDashboard/MotionDesignCard/MotionDesignCard.css";

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

interface MotionDesignCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const MotionDesignCard = () => {
	const [MotionDesignCardList, setMotionDesignCardList] = useState<
		MotionDesignCard[]
	>([]);

	//new MotionDesignCard states
	const [newMotionDesignCardTitle, setnewMotionDesignCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newMotionDesignCardImage, setNewMotionDesignCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const MotionDesignCardsCollectionRef = collection(db, "MotionDesignCards");
	const [isLoading, setIsLoading] = useState(true);
	const getMotionDesignCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(MotionDesignCardsCollectionRef);
			const filteredData: MotionDesignCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<MotionDesignCard, "id">),
				id: doc.id,
			}));
			setMotionDesignCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMotionDesignCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitMotionDesignCard = async () => {
		if (newMotionDesignCardImage && newdesc && newMotionDesignCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newMotionDesignCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newMotionDesignCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(MotionDesignCardsCollectionRef, {
					title: newMotionDesignCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getMotionDesignCardList();
				setnewMotionDesignCardTitle("");
				setNewdesc("");
				setNewMotionDesignCardImage(null);

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
	const deleteMotionDesignCard = async (id: string, imageUrl: string) => {
		try {
			const MotionDesignCardDoc = doc(db, "MotionDesignCards", id);
			await deleteDoc(MotionDesignCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getMotionDesignCardList();
			console.log("MotionDesignCard and image deleted");
		} catch (error) {
			console.error("Error deleting MotionDesignCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const MotionDesignCardDoc = doc(db, "MotionDesignCards", id);
			await updateDoc(MotionDesignCardDoc, { title: updatedTitle });
			getMotionDesignCardList();
			setUpdatedTitle("");
			console.log("MotionDesignCard updated");
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

				const MotionDesignCardDoc = doc(db, "MotionDesignCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(MotionDesignCardDoc, { imageUrl });
				getMotionDesignCardList();
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

			const MotionDesignCardDoc = doc(db, "MotionDesignCards", id);
			await updateDoc(MotionDesignCardDoc, { imageUrl: "" });

			getMotionDesignCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const MotionDesignCardDoc = doc(db, "MotionDesignCards", id);
			await updateDoc(MotionDesignCardDoc, { desc: updatedDesc });
			getMotionDesignCardList();
			setupdatedDesc("");
			console.log("MotionDesignCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/MotionDesignCard/MotionDesignCard.css"
				/>
			</Head>
			<div className="MotionDesignCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addMotionDesignCardTitle">
								Add New MotionDesign Card
							</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="MotionDesign Card title..."
								value={newMotionDesignCardTitle}
								onChange={(e) => setnewMotionDesignCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="MotionDesign Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewMotionDesignCardImage(
										e.target.files ? e.target.files[0] : null
									)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitMotionDesignCard}
								disabled={isLoading}
							>
								Submit MotionDesign Card
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
								{MotionDesignCardList.map((MotionDesignCard) => (
									<div
										className="MotionDesignCardItemWrapperFire"
										key={MotionDesignCard.id}
									>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>
													{MotionDesignCard.title}
												</h1>
												<p>{MotionDesignCard.desc}</p>
												{MotionDesignCard.imageUrl && (
													<img
														className="MotionDesignCardImgFire"
														src={MotionDesignCard.imageUrl}
														alt={MotionDesignCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteMotionDesignCard(
															MotionDesignCard.id,
															MotionDesignCard.imageUrl
														)
													}
												>
													Delete MotionDesign Card
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
													onClick={() => onUpdateTitle(MotionDesignCard.id)}
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
															MotionDesignCard.id,
															MotionDesignCard.imageUrl
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
															MotionDesignCard.id,
															MotionDesignCard.imageUrl
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
													onClick={() => onUpDatedesc(MotionDesignCard.id)}
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
			</div>{" "}
		</>
	);
};

export default MotionDesignCard;
