import AdminAuth from "../AdminAuth";
// import "./TelevisionCard.css";
import "../../styles/AdminDashboard/TelevisionCard/TelevisionCard.css";

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

interface TelevisionCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const TelevisionCard = () => {
	const [TelevisionCardList, setTelevisionCardList] = useState<
		TelevisionCard[]
	>([]);

	//new TelevisionCard states
	const [newTelevisionCardTitle, setnewTelevisionCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newTelevisionCardImage, setNewTelevisionCardImage] =
		useState<File | null>(null);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const TelevisionCardsCollectionRef = collection(db, "TelevisionCards");
	const [isLoading, setIsLoading] = useState(true);
	const getTelevisionCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(TelevisionCardsCollectionRef);
			const filteredData: TelevisionCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<TelevisionCard, "id">),
				id: doc.id,
			}));
			setTelevisionCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getTelevisionCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitTelevisionCard = async () => {
		if (newTelevisionCardImage && newdesc && newTelevisionCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newTelevisionCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newTelevisionCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(TelevisionCardsCollectionRef, {
					title: newTelevisionCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getTelevisionCardList();
				setnewTelevisionCardTitle("");
				setNewdesc("");
				setNewTelevisionCardImage(null);

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
	const deleteTelevisionCard = async (id: string, imageUrl: string) => {
		try {
			const TelevisionCardDoc = doc(db, "TelevisionCards", id);
			await deleteDoc(TelevisionCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getTelevisionCardList();
			console.log("TelevisionCard and image deleted");
		} catch (error) {
			console.error("Error deleting TelevisionCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const TelevisionCardDoc = doc(db, "TelevisionCards", id);
			await updateDoc(TelevisionCardDoc, { title: updatedTitle });
			getTelevisionCardList();
			setUpdatedTitle("");
			console.log("TelevisionCard updated");
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

				const TelevisionCardDoc = doc(db, "TelevisionCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(TelevisionCardDoc, { imageUrl });
				getTelevisionCardList();
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

			const TelevisionCardDoc = doc(db, "TelevisionCards", id);
			await updateDoc(TelevisionCardDoc, { imageUrl: "" });

			getTelevisionCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const TelevisionCardDoc = doc(db, "TelevisionCards", id);
			await updateDoc(TelevisionCardDoc, { desc: updatedDesc });
			getTelevisionCardList();
			setupdatedDesc("");
			console.log("TelevisionCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="TelevisionCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addTelevisionCardTitle">Add New Television Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Television Card title..."
							value={newTelevisionCardTitle}
							onChange={(e) => setnewTelevisionCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Television Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewTelevisionCardImage(
									e.target.files ? e.target.files[0] : null
								)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitTelevisionCard}
							disabled={isLoading}
						>
							Submit Television Card
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
							{TelevisionCardList.map((TelevisionCard) => (
								<div
									className="TelevisionCardItemWrapperFire"
									key={TelevisionCard.id}
								>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{TelevisionCard.title}</h1>
											<p>{TelevisionCard.desc}</p>
											{TelevisionCard.imageUrl && (
												<img
													className="TelevisionCardImgFire"
													src={TelevisionCard.imageUrl}
													alt={TelevisionCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteTelevisionCard(
														TelevisionCard.id,
														TelevisionCard.imageUrl
													)
												}
											>
												Delete Television Card
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
												onClick={() => onUpdateTitle(TelevisionCard.id)}
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
														TelevisionCard.id,
														TelevisionCard.imageUrl
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
														TelevisionCard.id,
														TelevisionCard.imageUrl
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
												onClick={() => onUpDatedesc(TelevisionCard.id)}
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

export default TelevisionCard;
