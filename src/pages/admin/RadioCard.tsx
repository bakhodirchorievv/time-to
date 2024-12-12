import AdminAuth from "../AdminAuth";
// import "./RadioCard.css";
// import "../../styles/AdminDashboard/RadioCard/RadioCard.css";

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

interface RadioCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const RadioCard = () => {
	const [RadioCardList, setRadioCardList] = useState<RadioCard[]>([]);

	//new RadioCard states
	const [newRadioCardTitle, setnewRadioCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newRadioCardImage, setNewRadioCardImage] = useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const RadioCardsCollectionRef = collection(db, "RadioCards");
	const [isLoading, setIsLoading] = useState(true);
	const getRadioCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(RadioCardsCollectionRef);
			const filteredData: RadioCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<RadioCard, "id">),
				id: doc.id,
			}));
			setRadioCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getRadioCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitRadioCard = async () => {
		if (newRadioCardImage && newdesc && newRadioCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newRadioCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newRadioCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(RadioCardsCollectionRef, {
					title: newRadioCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getRadioCardList();
				setnewRadioCardTitle("");
				setNewdesc("");
				setNewRadioCardImage(null);

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
	const deleteRadioCard = async (id: string, imageUrl: string) => {
		try {
			const RadioCardDoc = doc(db, "RadioCards", id);
			await deleteDoc(RadioCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getRadioCardList();
			console.log("RadioCard and image deleted");
		} catch (error) {
			console.error("Error deleting RadioCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const RadioCardDoc = doc(db, "RadioCards", id);
			await updateDoc(RadioCardDoc, { title: updatedTitle });
			getRadioCardList();
			setUpdatedTitle("");
			console.log("RadioCard updated");
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

				const RadioCardDoc = doc(db, "RadioCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(RadioCardDoc, { imageUrl });
				getRadioCardList();
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

			const RadioCardDoc = doc(db, "RadioCards", id);
			await updateDoc(RadioCardDoc, { imageUrl: "" });

			getRadioCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const RadioCardDoc = doc(db, "RadioCards", id);
			await updateDoc(RadioCardDoc, { desc: updatedDesc });
			getRadioCardList();
			setupdatedDesc("");
			console.log("RadioCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/styles/AdminDashboard/RadioCard/RadioCard.css"
				/>
			</Head>
			<div className="RadioCard-admin-wrapper">
				{userEmail && <NavBar />}
				<div className="right-side-wrapper">
					<AdminAuth />

					{userEmail && (
						<div className="controlAuthWrapper">
							<h2 className="addRadioCardTitle">Add New Radio Card</h2>
							<input
								className="admin-input"
								type="text"
								placeholder="Radio Card title..."
								value={newRadioCardTitle}
								onChange={(e) => setnewRadioCardTitle(e.target.value)}
							/>
							<input
								className="admin-input"
								type="text"
								placeholder="Radio Card desc..."
								value={newdesc}
								onChange={(e) => setNewdesc(e.target.value)}
							/>
							<input
								className="admin-input"
								type="file"
								ref={fileInputRef}
								onChange={(e) =>
									setNewRadioCardImage(
										e.target.files ? e.target.files[0] : null
									)
								}
							/>
							<button
								className="admin-btn"
								onClick={onSubmitRadioCard}
								disabled={isLoading}
							>
								Submit Radio Card
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
								{RadioCardList.map((RadioCard) => (
									<div className="RadioCardItemWrapperFire" key={RadioCard.id}>
										{userEmail && (
											<>
												<h1 style={{ color: "white" }}>{RadioCard.title}</h1>
												<p>{RadioCard.desc}</p>
												{RadioCard.imageUrl && (
													<img
														className="RadioCardImgFire"
														src={RadioCard.imageUrl}
														alt={RadioCard.title}
														width="500"
													/>
												)}
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														deleteRadioCard(RadioCard.id, RadioCard.imageUrl)
													}
												>
													Delete Radio Card
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
													onClick={() => onUpdateTitle(RadioCard.id)}
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
														onUpdateImage(RadioCard.id, RadioCard.imageUrl)
													}
												>
													Update Image
												</button>
												<br />
												<button
													className="admin-btn deleteBtn"
													onClick={() =>
														onDeleteImage(RadioCard.id, RadioCard.imageUrl)
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
													onClick={() => onUpDatedesc(RadioCard.id)}
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

export default RadioCard;
