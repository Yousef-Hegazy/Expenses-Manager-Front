import { EditProfile, User, UserLogin, UserRegister, } from "../models/userModels";
import agent, { HTTPS_API } from "./agent";
import axios from "axios";

const usersService = {
    login: (data: UserLogin) => agent.post<User>("/Account/login", data),
    idLogin: (id: string) => agent.post<User>("/Account/id-login", { id }),
    register: (data: UserRegister) => agent.post<User>("/Account/register", data),
    getCurrentUser: () => agent.get<User>("/Account"),
    confirmEmail: (token: string) => axios.patch<User>(`${HTTPS_API}/Account/confirm-email`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
    editProfile: (data: EditProfile) => agent.put<User>("/Account/edit-profile", data),
    sendConfirmationEmail: (link: string) => agent.post("/Account/send-confirmation-email", { link }),
    sendPasswordEmail: (email: string, link: string) => agent.post("/Account/send-password-email", {
        email,
        link
    }),
    changePassword: (newPassword: string, token: string) => axios.post<User>(
        `${HTTPS_API}/Account/change-password`,
        { newPassword: newPassword },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ),
};

export default usersService;
