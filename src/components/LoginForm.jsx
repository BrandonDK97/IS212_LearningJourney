import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from 'react-router-dom';


const LoginForm = (props) => {
    const title = props.title
    const subtitle = props.subtitle
    const permission = props.type
    const [uid, setUid] = useState("")
    const [loading, setLoading] = useState(true)
    const [tmp, setTmp] = useState(0)
    const [loginError, setLoginError] = useState('')
    let navigate = useNavigate();
    function routeChange(uid) {
        const adminRoles = ['1','3']
        if (permission == 'user') {
            sessionStorage.clear();
            sessionStorage.setItem('uid', uid)
            const backend_url = "http://localhost:5000"
            const tmp1 = { 'data': {} }

            fetch(backend_url + "/staff/" + uid)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw response;
                })
                .then(data => {
                    tmp1['data'] = data.data
                    setTmp(data.data.Role)
                    sessionStorage.setItem("user", JSON.stringify(tmp1));
                    let path = `/staffhomepage`;
                    navigate(path);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setLoginError('Userid Does Not Exist')
                })
        }
        else {
            sessionStorage.clear();
            const backend_url = "http://localhost:5000"
            const tmp1 = { 'data': {} }

            fetch(backend_url + "/staff/" + uid)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw response;
                })
                .then(data => {
                    tmp1['data'] = data.data
                    setTmp(data.data.Role)
                    if(adminRoles.includes(tmp1['data'].Role)){
                        sessionStorage.setItem('uid', uid)
                        sessionStorage.setItem("user", JSON.stringify(tmp1));
                        let path = `/adminrolepage`;
                        navigate(path);
                    }
                    else{
                        console.log('FAIL, NO ADMIN RIGHTS')
                    }
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setLoginError('Userid Does Not Exist')
                })
        }


    }


    return (
        <div>

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">

                    <form action="" className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">

                        <h1 className="text-center text-2xl font-bold text-black-600 sm:text-3xl">
                            {title}
                        </h1>

                        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                            {subtitle}
                        </p>

                        {/* <p className="text-lg font-medium">Sign in to your account</p> */}

                        <div>
                            <label className="text-sm font-medium">User ID</label>

                            <div className="relative mt-1">
                                <input
                                    id="uid"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter User ID"
                                    onChange={event => setUid(event.target.value)}
                                />

                                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <a
                            // type="submit"
                            className="cursor-pointer block w-full rounded-lg bg-gray-600 px-5 py-3 text-sm font-medium text-white"
                            onClick={() => routeChange(uid)}
                        >
                            Sign in
                        </a>

                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?&nbsp;
                            <a className="underline" href="">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )

}

export default LoginForm