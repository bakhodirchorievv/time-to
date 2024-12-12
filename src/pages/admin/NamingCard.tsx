import AdminAuth from "../AdminAuth";
// import "./NamingCard.css";
import "../../styles/AdminDashboard/NamingCard/NamingCard.css";

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

interface NamingCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const NamingCard = () => {
	const [NamingCardList, setNamingCardList] = useState<NamingCard[]>([]);

	//new NamingCard states
	const [newNamingCardTitle, setnewNamingCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newNamingCardImage, setNewNamingCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const NamingCardsCollectionRef = collection(db, "NamingCards");
	const [isLoading, setIsLoading] = useState(true);
	const getNamingCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(NamingCardsCollectionRef);
			const filteredData: NamingCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<NamingCard, "id">),
				id: doc.id,
			}));
			setNamingCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getNamingCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitNamingCard = async () => {
		if (newNamingCardImage && newdesc && newNamingCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newNamingCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newNamingCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(NamingCardsCollectionRef, {
					title: newNamingCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getNamingCardList();
				setnewNamingCardTitle("");
				setNewdesc("");
				setNewNamingCardImage(null);

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
	const deleteNamingCard = async (id: string, imageUrl: string) => {
		try {
			const NamingCardDoc = doc(db, "NamingCards", id);
			await deleteDoc(NamingCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getNamingCardList();
			console.log("NamingCard and image deleted");
		} catch (error) {
			console.error("Error deleting NamingCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const NamingCardDoc = doc(db, "NamingCards", id);
			await updateDoc(NamingCardDoc, { title: updatedTitle });
			getNamingCardList();
			setUpdatedTitle("");
			console.log("NamingCard updated");
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

				const NamingCardDoc = doc(db, "NamingCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(NamingCardDoc, { imageUrl });
				getNamingCardList();
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

			const NamingCardDoc = doc(db, "NamingCards", id);
			await updateDoc(NamingCardDoc, { imageUrl: "" });

			getNamingCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const NamingCardDoc = doc(db, "NamingCards", id);
			await updateDoc(NamingCardDoc, { desc: updatedDesc });
			getNamingCardList();
			setupdatedDesc("");
			console.log("NamingCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="NamingCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addNamingCardTitle">Add New Naming Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Naming Card title..."
							value={newNamingCardTitle}
							onChange={(e) => setnewNamingCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Naming Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewNamingCardImage(e.target.files ? e.target.files[0] : null)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitNamingCard}
							disabled={isLoading}
						>
							Submit Naming Card
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
							{NamingCardList.map((NamingCard) => (
								<div className="NamingCardItemWrapperFire" key={NamingCard.id}>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{NamingCard.title}</h1>
											<p>{NamingCard.desc}</p>
											{NamingCard.imageUrl && (
												<img
													className="NamingCardImgFire"
													src={NamingCard.imageUrl}
													alt={NamingCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteNamingCard(NamingCard.id, NamingCard.imageUrl)
												}
											>
												Delete Naming Card
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
												onClick={() => onUpdateTitle(NamingCard.id)}
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
													onUpdateImage(NamingCard.id, NamingCard.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(NamingCard.id, NamingCard.imageUrl)
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
												onClick={() => onUpDatedesc(NamingCard.id)}
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

export default NamingCard;
