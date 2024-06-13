import { Link } from "react-router-dom"
import React from "react"

const ToProfile: React.FC = () => {
    return (
        <div>
           <Link to="/profile" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                User Profile
            </Link>
        </div>
    );
}

export default ToProfile