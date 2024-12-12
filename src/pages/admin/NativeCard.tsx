import AdminAuth from "../AdminAuth";
// import "./NativeCard.css";
import "../../styles/AdminDashboard/NativeCard/NativeCard.css";

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

interface NativeCard {
	id: string;
	title: string;
	desc: number;
	imageUrl: string;
	userId?: string;
}

const NativeCard = () => {
	const [NativeCardList, setNativeCardList] = useState<NativeCard[]>([]);

	//new NativeCard states
	const [newNativeCardTitle, setnewNativeCardTitle] = useState("");
	const [newdesc, setNewdesc] = useState("");
	const [updatedDesc, setupdatedDesc] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [newNativeCardImage, setNewNativeCardImage] = useState<File | null>(
		null
	);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updatedImageFile = useRef<HTMLInputElement>(null);

	const NativeCardsCollectionRef = collection(db, "NativeCards");
	const [isLoading, setIsLoading] = useState(true);
	const getNativeCardList = async () => {
		setIsLoading(true);
		try {
			const data = await getDocs(NativeCardsCollectionRef);
			const filteredData: NativeCard[] = data.docs.map((doc) => ({
				...(doc.data() as Omit<NativeCard, "id">),
				id: doc.id,
			}));
			setNativeCardList(filteredData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getNativeCardList();

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserEmail(user.email);
			} else {
				setUserEmail(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const onSubmitNativeCard = async () => {
		if (newNativeCardImage && newdesc && newNativeCardTitle) {
			setIsLoading(true);
			const uniqueImageName = `${Date.now()}-${newNativeCardImage.name}`;
			const imageRef = ref(storage, `images/${uniqueImageName}`);
			await uploadBytes(imageRef, newNativeCardImage);
			const imageUrl = await getDownloadURL(imageRef);

			try {
				await addDoc(NativeCardsCollectionRef, {
					title: newNativeCardTitle,
					desc: newdesc,
					imageUrl: imageUrl,
					userId: auth?.currentUser?.uid,
				});

				getNativeCardList();
				setnewNativeCardTitle("");
				setNewdesc("");
				setNewNativeCardImage(null);

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

	const deleteNativeCard = async (id: string, imageUrl: string) => {
		try {
			const NativeCardDoc = doc(db, "NativeCards", id);
			await deleteDoc(NativeCardDoc);

			if (imageUrl) {
				const imageRef = ref(storage, imageUrl);
				try {
					await deleteObject(imageRef);
					console.log("Image deleted successfully");
				} catch (imageError) {
					console.error("Error deleting image: ", imageError);
				}
			}

			getNativeCardList();
			console.log("NativeCard and image deleted");
		} catch (error) {
			console.error("Error deleting NativeCard or image: ", error);
		}
	};

	const onUpdateTitle = async (id: string) => {
		try {
			const NativeCardDoc = doc(db, "NativeCards", id);
			await updateDoc(NativeCardDoc, { title: updatedTitle });
			getNativeCardList();
			setUpdatedTitle("");
			console.log("NativeCard updated");
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

				const NativeCardDoc = doc(db, "NativeCards", id);

				// Delete the old image from Firebase Storage if it exists
				if (currentImageUrl) {
					const oldImageRef = ref(storage, currentImageUrl);
					await deleteObject(oldImageRef);
				}

				await updateDoc(NativeCardDoc, { imageUrl });
				getNativeCardList();
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

			const NativeCardDoc = doc(db, "NativeCards", id);
			await updateDoc(NativeCardDoc, { imageUrl: "" });

			getNativeCardList();
			console.log("Image deleted");
		} catch (error) {
			console.error("Error deleting image: ", error);
		}
	};

	const onUpDatedesc = async (id: string) => {
		try {
			const NativeCardDoc = doc(db, "NativeCards", id);
			await updateDoc(NativeCardDoc, { desc: updatedDesc });
			getNativeCardList();
			setupdatedDesc("");
			console.log("NativeCard date updated");
		} catch (error) {
			console.error("while updating release date", error);
		}
	};

	return (
		<div className="NativeCard-admin-wrapper">
			{userEmail && <NavBar />}
			<div className="right-side-wrapper">
				<AdminAuth />

				{userEmail && (
					<div className="controlAuthWrapper">
						<h2 className="addNativeCardTitle">Add New Native Card</h2>
						<input
							className="admin-input"
							type="text"
							placeholder="Native Card title..."
							value={newNativeCardTitle}
							onChange={(e) => setnewNativeCardTitle(e.target.value)}
						/>
						<input
							className="admin-input"
							type="text"
							placeholder="Native Card desc..."
							value={newdesc}
							onChange={(e) => setNewdesc(e.target.value)}
						/>
						<input
							className="admin-input"
							type="file"
							ref={fileInputRef}
							onChange={(e) =>
								setNewNativeCardImage(e.target.files ? e.target.files[0] : null)
							}
						/>
						<button
							className="admin-btn"
							onClick={onSubmitNativeCard}
							disabled={isLoading}
						>
							Submit Native Card
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
							{NativeCardList.map((NativeCard) => (
								<div className="NativeCardItemWrapperFire" key={NativeCard.id}>
									{userEmail && (
										<>
											<h1 style={{ color: "white" }}>{NativeCard.title}</h1>
											<p>{NativeCard.desc}</p>
											{NativeCard.imageUrl && (
												<img
													className="NativeCardImgFire"
													src={NativeCard.imageUrl}
													alt={NativeCard.title}
													width="500"
												/>
											)}
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													deleteNativeCard(NativeCard.id, NativeCard.imageUrl)
												}
											>
												Delete Native Card
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
												onClick={() => onUpdateTitle(NativeCard.id)}
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
													onUpdateImage(NativeCard.id, NativeCard.imageUrl)
												}
											>
												Update Image
											</button>
											<br />
											<button
												className="admin-btn deleteBtn"
												onClick={() =>
													onDeleteImage(NativeCard.id, NativeCard.imageUrl)
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
												onClick={() => onUpDatedesc(NativeCard.id)}
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

export default NativeCard;
