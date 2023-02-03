import {useNavigate} from "react-router-dom";
import {setIsLogged} from "/src/store/slices/isLogged.slice";
import {useDispatch} from "react-redux";

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("token");
	dispatch(setIsLogged());
        navigate("/");
    }

    return <a style={{cursor: "pointer"}} onClick={() => logout()}>Logout</a>;
}
