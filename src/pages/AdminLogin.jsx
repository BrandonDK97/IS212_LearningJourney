import LoginForm from "../components/LoginForm"
import LoginNavbar from "../components/LoginNavbar"

const AdminLogin = () => {
    return (
        <div>
            <LoginNavbar></LoginNavbar>
            <LoginForm title='Log In to LJPS Admin Dashboard' subtitle='Enter your userID below' type='admin'></LoginForm>
        </div>
    )
}

export default AdminLogin