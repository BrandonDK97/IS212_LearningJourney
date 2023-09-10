import LoginForm from "../components/LoginForm"
import LoginNavbar from "../components/LoginNavbar"

const Login = () => {
    return (
        <div>
            <LoginNavbar type='user'></LoginNavbar>
            <LoginForm title='Log In to LJPS' subtitle='Enter your userID below' type='user'></LoginForm>
        </div>
    )
}

export default Login