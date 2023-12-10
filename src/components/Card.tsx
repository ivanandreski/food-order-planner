import { FC } from "react";

interface CardProps {
    children: React.ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
    return (
        <div className="w-full bg-gray-400 border-2 rounded border-gray-500 px-4 py-2 mb-3 mt-3">
            {children}
        </div>
    );
};

export default Card;
