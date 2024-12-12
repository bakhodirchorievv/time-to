import AdminAuth from "../AdminAuth";
// import "./ExpertCard.css";
import "../../styles/AdminDashboard/ExpertCard/ExpertCard.css";

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

interface ExpertCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const ExpertCard = () => {
	const [ExpertCardList, setExpertCardList] = useState<ExpertCard[]>([]);

	//new ExpertCard states
	const [newExpertCardTitle, setnewExpertCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newExpertCardImage, setNewExpertCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const ExpertCardsCollectionRef = collection(db, "ExpertCards");
	const [isLoading, setIsLoading] = useState(true);
	const getExpertCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(ExpertCardsCollectionRef);
			const filteredData: ExpertCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<ExpertCard, "id">),
				id: doc.id,
			}));
			setExpertCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getExpertCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitExpertCard = async () => {
		if (newExpertCardImage && newdesc && newExpertCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newExpertCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newExpertCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(ExpertCardsCollectionRef, {
					title: newExpertCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getExpertCardList();
				setnewExpertCardTitle("");
				setNewdesc("");
				setNewExpertCardImage(null);

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
	const deleteExpertCard = async (id: string, imageUrl: string) => {
		try {
			const ExpertCardDoc = doc(db, "ExpertCards", id);
			await deleteDoc(ExpertCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getExpertCardList();
			console.log("ExpertCard and image deleted");
		} catch (error) {
			console.error("Error deleting ExpertCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const ExpertCardDoc = doc(db, "ExpertCards", id);
			await updateDoc(ExpertCardDoc, { title: updatedTitle });
			getExpertCardList();
			setUpdatedTitle("");
			console.log("ExpertCard updated");
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

				const ExpertCardDoc = doc(db, "ExpertCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(ExpertCardDoc, { imageUrl });
				getExpertCardList();
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

			const ExpertCardDoc = doc(db, "ExpertCards", id);
			await updateDoc(ExpertCardDoc, { imageUrl: "" });

			getExpertCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const ExpertCardDoc = doc(db, "ExpertCards", id);
			await updateDoc(ExpertCardDoc, { desc: updatedDesc });
			getExpertCardList();
			setupdatedDesc("");
			console.log("ExpertCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="ExpertCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addExpertCardTitle">Add New Expert Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Expert Card title..."
							value={newExpertCardTitle}
							onChange={(e) => setnewExpertCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Expert Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewExpertCardImage(e.target.files ? e.target.files[0] : null)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitExpertCard}
							disabled={isLoading}
						>
							Submit Expert Card
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
							{ExpertCardList.map((ExpertCard) => (
								<div className="ExpertCardItemWrapperFire" key={ExpertCard.id}>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{ExpertCard.title}</h1>
											<p>{ExpertCard.desc}</p>
											{ExpertCard.imageUrl && (
												<img
													className="ExpertCardImgFire"
													src={ExpertCard.imageUrl}
													alt={ExpertCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteExpertCard(ExpertCard.id, ExpertCard.imageUrl)
												}
											>
												Delete Expert Card
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
												onClick={() => onUpdateTitle(ExpertCard.id)}
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
													onUpdateImage(ExpertCard.id, ExpertCard.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(ExpertCard.id, ExpertCard.imageUrl)
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
												onClick={() => onUpDatedesc(ExpertCard.id)}
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

export default ExpertCard;
