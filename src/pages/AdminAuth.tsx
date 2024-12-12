import { useState, useEffect } from "react";
import { auth } from "./FirebaseConfig";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

import { addDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

// import "./AdminAuth.css";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

const AdminAuth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [newLoginValue, setNewLoginValue] = useState("");
	const [newPasswordValue, setNewPasswordValue] = useState("");

	const [newLogin, setNewLogin] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const theRest = "@gmail.com";
	const notRealLogin = newLogin;
	const realLogin = notRealLogin + theRest;
	const realPassword = newPassword;

	const loginPassword = collection(db, "loginPassword");
	const [isLoading, setIsLoading] = useState(false);

	const fetchLoginPassword = async () => {
		try {
			const data = await getDocs(loginPassword);
			const loginPasswordData = data.docs.map((doc) => doc.data());

			if (loginPasswordData.length > 0) {
				setNewLogin(loginPasswordData[0].login);
				setNewPassword(loginPasswordData[0].password);
			}
		} catch (error) {
			console.log("Error fetching initial login and password:", error);
		}
	};
	useEffect(() => {
		fetchLoginPassword();
	}, []);

	const handleLoginChange = async () => {
		console.log(realLogin, realPassword);

		if (newLoginValue && newPasswordValue) {
			if (newLoginValue.length > 5) {
				if (confirm("Do you really want to change the login and password?")) {
					setIsLoading(true);
					const querySnapshot = await getDocs(loginPassword);

					const deletePromises = querySnapshot.docs.map((doc) =>
						deleteDoc(doc.ref)
					);
					await Promise.all(deletePromises);

					try {
						await addDoc(loginPassword, {
							login: newLoginValue,
							password: newPasswordValue,
						});
						setIsLoading(false);
					} catch (error) {
						console.log(error);
					}

					try {
						const data = await getDocs(loginPassword);
						const loginPasswordData = data.docs.map((doc) => doc.data());
						setNewLogin(loginPasswordData[0].login);
						setNewPassword(loginPasswordData[0].password);
					} catch (err) {
						console.log(err);
					}
					// setNewLogin(newLoginValue);
					// setNewPassword(newPasswordValue);

					setNewLoginValue("");
					setNewPasswordValue("");
					setMessage("login and password successfully changed!");
				}
			} else {
				setMessage("Enter a valid login!");
			}
		} else {
			setMessage("New login or password is not filled!");
		}
	};

	const signIn = async () => {
		fetchLoginPassword();
		console.log(newLogin, newPassword);
		if (email === notRealLogin && password === realPassword) {
			console.log(realLogin, realPassword);
			try {
				await signInWithEmailAndPassword(auth, realLogin, password);
				setMessage("Successfully logged in!");
				setEmail("");
				setPassword("");
			} catch (error) {
				console.error(error);
				// setMessage("Error logging in");
				try {
					await createUserWithEmailAndPassword(auth, realLogin, password);
					setMessage("Successfully logged in!");
					setEmail("");
					setPassword("");
				} catch (error) {
					console.error(error);
					setMessage("Error logging in");
				}
			}
		} else {
			setMessage("Incorrect password or login!");
		}
	};

	// const signInWithGoogle = async () => {
	// 	try {
	// 		await signInWithPopup(auth, googleProvider);
	// 		setMessage("Successfully logged in!");
	// 	} catch (error) {
	// 		console.error(error);
	// 		setMessage("Error logging in!");
	// 	}
	// };

	const logOut = async () => {
		if (confirm("Do you really want to log out?"))
			try {
				await signOut(auth);
				setMessage("Successfully logged out!");
			} catch (error) {
				console.error(error);
				setMessage("Error logging out!");
			}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="/styles/AdminDashboard/AdminAuth.css" />
			</Head>

			{isLoggedIn ? (
				<div>
					<>
						<button className="logOutFire admin-btn" onClick={logOut}>
							Log Out
						</button>

						{message && <div className="message">{message}</div>}

						{/* login change starts here */}
						<div className="login-change">
							<h3 className="login-change-title">
								You can change Login and Password here.
							</h3>
							<input
								type="text"
								className="newLogin"
								placeholder="New Login"
								onChange={(e) => setNewLoginValue(e.target.value)}
								value={newLoginValue}
							/>
							<input
								type="text"
								className="newPasword"
								placeholder="New Password"
								onChange={(e) => setNewPasswordValue(e.target.value)}
								value={newPasswordValue}
							/>
							<button
								disabled={isLoading}
								className="changeBtn"
								onClick={handleLoginChange}
							>
								Change
							</button>

							{isLoading && (
								<div className="loading-indicator">
									<ClipLoader size={50} color={"#eee"} loading={isLoading} />
								</div>
							)}
						</div>
					</>
				</div>
			) : (
				<div style={{ backgroundColor: "#333" }}>
					{message && <div className="message">{message}</div>}
					<input
						className="signInInput signInInputLogin"
						placeholder="Login..."
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="signInInput signInInputPassword"
						placeholder="Password..."
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<button className="signInBtn" onClick={signIn}>
						Sign In
					</button>
					{/* <button onClick={signInWithGoogle}>Sign In With Google</button> */}
				</div>
			)}
		</>
	);
};

export default AdminAuth;
