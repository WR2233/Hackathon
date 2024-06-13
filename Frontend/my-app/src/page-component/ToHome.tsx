import React from "react";
import { Link } from "react-router-dom";

const ToHome: React.FC = () => {
    return (
        <div>
            <Link to="/" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                TO HOME
            </Link>
        </div>
    );
}

export default ToHome;
