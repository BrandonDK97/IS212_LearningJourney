import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    Navigate
} from "react-router-dom";

import StaffRolePage from './pages/StaffRolePage.jsx'
import RolePlanner from './pages/RolePlanner.jsx'
import SuccessPage from './pages/SuccessPage'
import StaffHomePage from './pages/StaffHomePage'
import LearningJourneySkills from './pages/LearningJourneySkills'
import LearningJourneyCourses from './pages/LearningJourneyCourses'
import AddCourses from './pages/AddCourses'

import AdminRolePage from "./pages/AdminRolePage"
import AdminEditRole from './components/AdminEditRole'
import AdminCreateRole from './pages/AdminCreateRole'

import AdminSkillPage from './pages/AdminSkillPage'
import AdminEditSkill from './components/AdminEditSkill'
import AdminCreateSkill from './pages/AdminCreateSkill'
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin'
function App() {

    return (
        <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        {/* <Route use exact path="/staffhomepage"element={<StaffHomePage />}></Route> */}
                        {/* <Route exact path="/staffhomepage">
                            {isAdmin ? <StaffHomePage /> :<Navigate to="/errorpage" />}
                        </Route> */}
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/adminlogin" element={<AdminLogin />}></Route>
                        <Route path="/staffhomepage" element={<StaffHomePage />}></Route>
                        <Route path="/staffhomepage/:roleid" element={<LearningJourneySkills />}></Route>
                        <Route path="/staffhomepage/:roleid/:skillid" element={<LearningJourneyCourses />}></Route>
                        <Route path="/addcourses/:roleid/:skillid" element={<AddCourses />}></Route>
                        <Route path="/staffrolepage" element={<StaffRolePage />}></Route>
                        <Route path="/roleplanner/:staffid/:roleid" element={<RolePlanner />}></Route>
                        <Route path="/successPage/:rolename" element={<SuccessPage />}></Route>
                        <Route path="/adminrolepage/" element={<AdminRolePage />}></Route>
                        <Route path="/admineditrole/:roleid" element={<AdminEditRole />}></Route>
                        <Route path="/AdminCreateRole" element={<AdminCreateRole />}></Route>
                        <Route path="/adminskillpage/" element={<AdminSkillPage />}></Route>
                        <Route path="/admineditskill/:skillid" element={<AdminEditSkill />}></Route>
                        <Route path="/admincreateskill" element={<AdminCreateSkill />}></Route>
                    </Routes>
                </BrowserRouter>
        </React.StrictMode>
    )

}

export default App;




