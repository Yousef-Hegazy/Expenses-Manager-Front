import { EditRounded, } from "@mui/icons-material";
import { useState } from "react";
import ExpenseMenuItem from "../ExpenseMenuItem";
import EditForm from "./EditForm.tsx";

const EditUserForm = () => {
    const [userFormOpen, setUserFormOpen] = useState(false);

    const toggleUserForm = () => {
        setUserFormOpen((prev) => !prev);
    };
    
    return (
        <>
            <ExpenseMenuItem
                icon={<EditRounded fontSize="small"/>}
                text="Edit"
                onClick={toggleUserForm}
            />

            {userFormOpen ? <EditForm onClose={toggleUserForm} open={userFormOpen}/> : null}
        </>
    );
};

export default EditUserForm;
