import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export const AuthCheck = () => {
    const { isAuthorised } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthorised) navigate('/login');
        else navigate('/');
        //eslint-disable-next-line
    }, [isAuthorised]);

};

