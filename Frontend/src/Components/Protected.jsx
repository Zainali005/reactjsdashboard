import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                let login = localStorage.getItem("token");
                if (!login) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [navigate]);


    return (
        <>
            {isLoading ? (
                <div
                    className="d-flex justify-content-center"
                    style={{ fontSize: "40px" }}
                >
                    Loading...
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default Protected;
