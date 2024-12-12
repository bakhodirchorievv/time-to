import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
	return (
		<div style={{ maxWidth: "1520px", margin: "0 auto" }} className="container">
			{children}
		</div>
	);
};

export default Container;
