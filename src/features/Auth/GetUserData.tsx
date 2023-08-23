import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../api/usersService.ts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import Loader from "../UI/Loader.tsx";

const GetUserData = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const getUser = useMutation({
        mutationFn: async () => {
            const { data } = await usersService.idLogin(id || "");
            return data;
        },
        onSuccess: (res) => {
            navigate('/change-password', { state: { user: { email: res.email, token: res.token }, from: 'getUserData' }, replace: true });
        },
        onError: (err) => {
            console.log(err);
            toast.error("Something went wrong please try again later");
            navigate('/');
        }
    });

    useEffect(() => {
        if (id) {
            getUser.mutateAsync();
        }
    }, [id]);

    return (
        <Box mx='auto' my={10}>
            <Loader/>
        </Box>
    );
};

export default GetUserData;
