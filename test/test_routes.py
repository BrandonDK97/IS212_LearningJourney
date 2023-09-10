import unittest
import flask_testing
import json
from app import *

# TestApp for route testing
class TestApp(flask_testing.TestCase):
    maxDiff = None
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {}
    app.config["TESTING"] = True

    def setUp(self):
        db.create_all()

    def create_app(self):
        return app

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def createStaffUserID123(self):
        s1 = Staff(
            Staff_ID=123,
            Staff_FName="Test",
            Staff_LName="Ter",
            Dept="Sales",
            Email="test@gmail.com",
            Role=1,
        )
        db.session.add(s1)
        db.session.commit()

        c1 = Course(
            "COR001", "Course_Name", "Course_Desc", "Active", "Internal", "Core"
        )
        db.session.add(c1)
        db.session.commit()

        c2 = Course(
            "COR002", "Course_Name", "Course_Desc", "Active", "Internal", "Core"
        )
        db.session.add(c2)
        db.session.commit()

        r1 = Registration(
            Reg_ID=1,
            Course_ID="COR001",
            Staff_ID=123,
            Reg_Status="Registered",
            Completion_Status="Completed",
        )
        db.session.add(r1)
        db.session.commit()

        r2 = Registration(
            Reg_ID=2,
            Course_ID="COR002",
            Staff_ID=123,
            Reg_Status="Registered",
            Completion_Status="Completed",
        )
        db.session.add(r2)
        db.session.commit()

        j1 = Job(1, "Sales Person")
        db.session.add(j1)
        db.session.commit()

        j2 = Job(2, "Project Owner")
        db.session.add(j2)
        db.session.commit()

        s1 = Skill(Skill_ID=1, Skill_name="Skill_name_1")
        db.session.add(s1)
        db.session.commit()

        s1 = Skill(Skill_ID=2, Skill_name="Skill_name_2")
        db.session.add(s1)
        db.session.commit()

        js1 = JobSkill(JobSkill_ID=1, Job_ID=1, Skill_ID=1)
        db.session.add(js1)
        db.session.commit()

        js2 = JobSkill(JobSkill_ID=2, Job_ID=1, Skill_ID=2)
        db.session.add(js2)
        db.session.commit()

        js3 = JobSkill(JobSkill_ID=3, Job_ID=2, Skill_ID=2)
        db.session.add(js3)
        db.session.commit()

        cs1 = CourseSkill(CourseSkill_ID=1, Course_ID="COR001", Skill_ID=1)
        db.session.add(cs1)
        db.session.commit()
        cs2 = CourseSkill(CourseSkill_ID=2, Course_ID="COR002", Skill_ID=2)
        db.session.add(cs2)
        db.session.commit()

        lj1 = LearningJounery(LearningJounery_ID=1, Job_ID=1, Staff_ID=123)
        db.session.add(lj1)
        db.session.commit()

        lj2 = LearningJounery(LearningJounery_ID=2, Job_ID=2, Staff_ID=123)
        db.session.add(lj2)
        db.session.commit()

        lj_c1 = LearningJouneryCourses(
            LearningJouneryCourses_ID=1, LearningJounery_ID=1, Course_ID="COR001"
        )
        db.session.add(lj_c1)
        db.session.commit()

        lj_c2 = LearningJouneryCourses(
            LearningJouneryCourses_ID=2, LearningJounery_ID=1, Course_ID="COR002"
        )
        db.session.add(lj_c2)
        db.session.commit()

        lj_c3 = LearningJouneryCourses(
            LearningJouneryCourses_ID=3, LearningJounery_ID=2, Course_ID="COR002"
        )
        db.session.add(lj_c3)
        db.session.commit()


######################################################################
# test for Get All Staffs - GET /staff
class TestGetAllStaffs(TestApp):
    def test_GetAllStaffs(self):
        s1 = Staff(
            Staff_ID=999997,
            Staff_FName="Test",
            Staff_LName="Ter",
            Dept="Sales",
            Email="test@gmail.com",
            Role=1,
        )

        s2 = Staff(
            Staff_ID=999998,
            Staff_FName="Test",
            Staff_LName="Ter2",
            Dept="HR",
            Email="test2@gmail.com",
            Role=2,
        )

        # Create 2 Staff and commit to DB
        db.session.add(s1)
        db.session.commit()
        db.session.add(s2)
        db.session.commit()

        response = self.client.get("/staff")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": [
                    {
                        "Staff_ID": 999997,
                        "Staff_FName": "Test",
                        "Staff_LName": "Ter",
                        "Dept": "Sales",
                        "Email": "test@gmail.com",
                        "Role": 1,
                    },
                    {
                        "Staff_ID": 999998,
                        "Staff_FName": "Test",
                        "Staff_LName": "Ter2",
                        "Dept": "HR",
                        "Email": "test2@gmail.com",
                        "Role": 2,
                    },
                ]
            },
        )

    def test_GetAllStaffsNegative(self):
        response = self.client.get("/staff")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No Staff can be found."})


# Test for Get Staff by ID - GET /staff/<int:staff_ID>
class TestGetStaffByID(TestApp):
    def test_getStaffByID(self):
        self.createStaffUserID123()

        response = self.client.get("/staff/123")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {
                    "Completed_Courses": ["COR001", "COR002"],
                    "Completed_Skills": ["1", "2"],
                    "Dept": "Sales",
                    "Email": "test@gmail.com",
                    "Inprogress_Courses": [],
                    "Learning_Journeys": [
                        {
                            "Courses": ["COR001", "COR002"],
                            "Job_ID": 1,
                            "Job_name": "Sales Person",
                            "LearningJounery_ID": 1,
                            "Progress": "In-Progress",
                            "Skills": [1, 2],
                        },
                        {
                            "Courses": ["COR002"],
                            "Job_ID": 2,
                            "Job_name": "Project Owner",
                            "LearningJounery_ID": 2,
                            "Progress": "In-Progress",
                            "Skills": [2],
                        },
                    ],
                    "Role": "1",
                    "Staff_FName": "Test",
                    "Staff_ID": "123",
                    "Staff_LName": "Ter",
                }
            },
        )

    def test_getStaffByID_Negative(self):
        self.createStaffUserID123()
        response = self.client.get("/staff/1234")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No staff can be found."})


# Test for Get All Courses - GET /course
class TestGetAllCourses(TestApp):
    def test_GetAllCourses(self):
        c1 = Course(
            Course_ID="1000",
            Course_Name="Test1",
            Course_Desc="This is a test course",
            Course_Status="Active",
            Course_Type="Internal",
            Course_Category="Tech",
        )

        c2 = Course(
            Course_ID="1001",
            Course_Name="Test2",
            Course_Desc="This is a test course",
            Course_Status="Retired",
            Course_Type="External",
            Course_Category="Finance",
        )
        # Create and add 2 courses into DB
        db.session.add(c1)
        db.session.commit()
        db.session.add(c2)
        db.session.commit()

        # Run api call
        response = self.client.get("/course")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {
                    "1000": {
                        "Course_ID": "1000",
                        "Course_Name": "Test1",
                        "Course_Desc": "This is a test course",
                        "Course_Status": "Active",
                        "Course_Type": "Internal",
                        "Course_Category": "Tech",
                    },
                    "1001": {
                        "Course_ID": "1001",
                        "Course_Name": "Test2",
                        "Course_Desc": "This is a test course",
                        "Course_Status": "Retired",
                        "Course_Type": "External",
                        "Course_Category": "Finance",
                    },
                }
            },
        )

    # Negative Test for Get All Courses - GET /course
    def test_GetAllCourses_Negative(self):
        response = self.client.get("/course")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No courses can be found."})


# Test for Get Course by ID - GET /course/<string:course_ID>
class TestGetCourseByID(TestApp):
    def test_GetCourseByID(self):
        c1 = Course(
            Course_ID="1000",
            Course_Name="Test1",
            Course_Desc="This is a test course",
            Course_Status="Active",
            Course_Type="Internal",
            Course_Category="Tech",
        )

        c2 = Course(
            Course_ID="1001",
            Course_Name="Test2",
            Course_Desc="This is a test course",
            Course_Status="Retired",
            Course_Type="External",
            Course_Category="Finance",
        )
        # Create and add 2 courses into DB
        db.session.add(c1)
        db.session.commit()
        db.session.add(c2)
        db.session.commit()

        # Run api call
        response = self.client.get("/course/1000")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {
                    "1000": {
                        "Course_ID": "1000",
                        "Course_Name": "Test1",
                        "Course_Desc": "This is a test course",
                        "Course_Status": "Active",
                        "Course_Type": "Internal",
                        "Course_Category": "Tech",
                    }
                }
            },
        )

    # Negative Test for Get Course by ID - GET /course/<string:course_ID>
    def test_GetCourseByID_Negative(self):
        c1 = Course(
            Course_ID="1000",
            Course_Name="Test1",
            Course_Desc="This is a test course",
            Course_Status="Active",
            Course_Type="Internal",
            Course_Category="Tech",
        )

        # Create and add 2 courses into DB
        db.session.add(c1)
        db.session.commit()

        # Run api call
        response = self.client.get("/course/1002")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "Course not found."})


# Test for Get all Roles - GET /role
class TestGetAllRoles(TestApp):
    def test_GetAllRoles(self):
        r1 = Role(Role_ID=1, Role_Name="Admin")

        r2 = Role(Role_ID=2, Role_Name="Staff")
        # Create and add 2 roles into DB
        db.session.add(r1)
        db.session.commit()
        db.session.add(r2)
        db.session.commit()

        # Run api call
        response = self.client.get("/role")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": [
                    {"Role_ID": 1, "Role_Name": "Admin"},
                    {"Role_ID": 2, "Role_Name": "Staff"},
                ]
            },
        )

    def test_GetAllRoles_Negative(self):
        response = self.client.get("/role")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No roles can be found."})


# Test for Get Role by ID - GET /role/<int:role_ID>
class TestGetRoleByID(TestApp):
    def test_GetRoleByID(self):
        r1 = Role(Role_ID=1, Role_Name="Admin")
        r2 = Role(Role_ID=2, Role_Name="Staff")
        # Create and add 2 roles into DB
        db.session.add(r1)
        db.session.commit()
        db.session.add(r2)
        db.session.commit()

        # Run api call
        response = self.client.get("/role/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"data": {"Role_ID": 1, "Role_Name": "Admin"}})

    # Negative Test for Get Role by ID - GET /role/<int:role_ID>
    def test_GetRoleByID_Negative(self):
        r1 = Role(Role_ID=1, Role_Name="Admin")

        db.session.add(r1)
        db.session.commit()

        # Run api call
        response = self.client.get("/role/2")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "Staff not found."})


# Test for Update Role by Role ID - POST /role/update
class TestUpdateRoleByID(TestApp):
    def test_UpdateRoleByID(self):
        r1 = Role(1, "Role 1 Name")
        db.session.add(r1)
        db.session.commit()

        request_body = {"role_id": 1, "new_role_name": "Tester"}

        # Run api call
        response = self.client.post(
            "/role/update",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"data": {"Role_ID": 1, "Role_Name": "Tester"}})


# Test for Get all registration - GET /registration
class TestGetAllRegistration(TestApp):
    def test_GetAllRegistration(self):
        r1 = Registration(
            Reg_ID=1,
            Course_ID="1000",
            Staff_ID=999997,
            Reg_Status="Registered",
            Completion_Status="Ongoing",
        )
        r2 = Registration(
            Reg_ID=2,
            Course_ID="1001",
            Staff_ID=999997,
            Reg_Status="Registered",
            Completion_Status="Completed",
        )

        db.session.add(r1)
        db.session.commit()
        db.session.add(r2)
        db.session.commit()

        # Run api call
        response = self.client.get("/registration")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": [
                    {
                        "Reg_ID": 1,
                        "Course_ID": "1000",
                        "Staff_ID": 999997,
                        "Reg_Status": "Registered",
                        "Completion_Status": "Ongoing",
                    },
                    {
                        "Reg_ID": 2,
                        "Course_ID": "1001",
                        "Staff_ID": 999997,
                        "Reg_Status": "Registered",
                        "Completion_Status": "Completed",
                    },
                ]
            },
        )

    def test_GetAllRegistration_Negative(self):
        response = self.client.get("/registration")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No registrations can be found."})


# Test for Get Registration by ID - GET /registration/<int:reg_ID>
class TestGetRegistrationByID(TestApp):
    def test_GetAllRegistrationbyID(self):
        r1 = Registration(
            Reg_ID=1,
            Course_ID="1000",
            Staff_ID=999997,
            Reg_Status="Registered",
            Completion_Status="Ongoing",
        )

        db.session.add(r1)
        db.session.commit()

        # Run api call
        response = self.client.get("/registration/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {
                    "Reg_ID": 1,
                    "Course_ID": "1000",
                    "Staff_ID": 999997,
                    "Reg_Status": "Registered",
                    "Completion_Status": "Ongoing",
                }
            },
        )

    # Negative Test for Get Registration by ID - GET /registration/<int:reg_ID>
    def test_GetAllRegistrationByID_Negative(self):
        r1 = Registration(
            Reg_ID=1,
            Course_ID=1000,
            Staff_ID=999997,
            Reg_Status="Registered",
            Completion_Status="Ongoing",
        )

        db.session.add(r1)
        db.session.commit()

        # Run api call
        response = self.client.get("/registration/2")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "Registration not found."})


# Test for Get All Skills - GET /skills
class TestGetAllSkills(TestApp):
    def test_GetAllSkills(self):
        s1 = Skill(Skill_ID=1, Skill_name="Python")
        s2 = Skill(Skill_ID=2, Skill_name="Javascript")

        cs1 = CourseSkill(CourseSkill_ID=1, Course_ID="1000", Skill_ID=1)
        cs2 = CourseSkill(CourseSkill_ID=2, Course_ID="1002", Skill_ID=2)

        db.session.add(s1)
        db.session.commit()
        db.session.add(s2)
        db.session.commit()
        db.session.add(cs1)
        db.session.commit()
        db.session.add(cs2)
        db.session.commit()

        # Run api call
        response = self.client.get("/skills")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {
                    "1": {
                        "Skill_ID": "1",
                        "Skill_name": "Python",
                        "Skill_courses": ["1000"],
                    },
                    "2": {
                        "Skill_ID": "2",
                        "Skill_name": "Javascript",
                        "Skill_courses": ["1002"],
                    },
                }
            },
        )

    def test_GetAllSkills_Negative(self):
        response = self.client.get("/skills")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No Skills can be found."})


# Test for Get Skills by Job ID - GET /skill/job/<int:job_ID>
class TestGetSkillsByJobID(TestApp):
    def test_GetSkillsByJobID(self):
        s1 = Skill(Skill_ID=1, Skill_name="Python")
        s2 = Skill(Skill_ID=2, Skill_name="Javascript")

        js1 = JobSkill(JobSkill_ID=1, Job_ID=1, Skill_ID=1)
        js2 = JobSkill(JobSkill_ID=2, Job_ID=1, Skill_ID=2)

        db.session.add(s1)
        db.session.commit()
        db.session.add(s2)
        db.session.commit()
        db.session.add(js1)
        db.session.commit()
        db.session.add(js2)
        db.session.commit()

        # Run api call
        response = self.client.get("/skill/job/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"data": [1, 2]})

    def test_GetSkillsByJobID_Negative(self):
        self.createStaffUserID123()
        response = self.client.get("/skill/job/9909099")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No skills can be found."})


# Test for Get All Jobs - GET /jobs
class TestGetAllJobs(TestApp):
    def test_GetAllJobs(self):
        self.createStaffUserID123()

        response = self.client.get("/jobs")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {
                    "1": {
                        "Job_ID": "1",
                        "Job_courses": ["COR001", "COR002"],
                        "Job_name": "Sales Person",
                        "Job_skills": [1, 2],
                    },
                    "2": {
                        "Job_ID": "2",
                        "Job_courses": ["COR002"],
                        "Job_name": "Project Owner",
                        "Job_skills": [2],
                    },
                }
            },
        )

    def test_GetAllJobs_Negative(self):
        response = self.client.get("/jobs")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"message": "No Jobs can be found."})


# Test for create learning jounery - POST /learningjounery/create
class TestCreateLearningJourney(TestApp):
    def test_CreateLearningJourney(self):
        request_body = {
            "staff_id": 999997,
            "job_id": 1,
            "courses": ["COR001", "COR002"],
        }
        response = self.client.post(
            "/learningjounery/create",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json, {"message": "Sucessfully created new learning jounery."}
        )

    def test_CreateLearningJourney_Negative(self):
        request_body = {
            "staff_id": 999997,
            "job_id": 1,
            "courses": 12341,  # error cause this is suppose to be list
        }
        response = self.client.post(
            "/learningjounery/create",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json,
            {
                "error": "'int' object is not iterable",
                "message": "Creating new LearningJouneryCourses failed.",
            },
        )


# Test for update jobskill - PUT /jobskill/edit
class TestUpdateJobSkill(TestApp):
    def test_UpdateJobSkill(self):
        self.createStaffUserID123()

        request_body = {"job_id": 1, "new_job_skills": "99"}
        response = self.client.put(
            "/jobskill/edit",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {"Job_ID": 1, "Skill_IDs": "99"},
                "message": "Sucessfully edited job skills.",
            },
        )

    def test_UpdateJobSkill_Negative(self):
        self.createStaffUserID123()

        request_body = {"job_id": 1, "new_job_skills": 123}
        response = self.client.put(
            "/jobskill/edit",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json,
            {
                "message": "Editing job skills failed.",
                "error": "'int' object is not iterable",
            },
        )


# Test for create Jobs - POST /jobs/create
class TestCreateJobs(TestApp):
    def test_CreateJobs(self):
        self.createStaffUserID123()
        request_body = {"Job_name": "new_job_name", "Job_skills": [1, 2]}

        response = self.client.post(
            "/jobs/create",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {"data": {"new_job_id": 3}, "message": "Sucessfully added new job."},
        )

    def test_CreateJobs_Negative(self):
        self.createStaffUserID123()
        request_body = {
            "Job_name": "new_job_name",
            "Job_skills": 1,
        }  # not giving array under Job_skills

        response = self.client.post(
            "/jobs/create",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json,
            {
                "error": "'int' object is not iterable",
                "message": "Adding new job failed.",
            },
        )


# Test for adding skill to job - POST /jobs/addskill
class TestAddSkillToJob(TestApp):
    def test_AddSkillToJob(self):
        self.createStaffUserID123()
        request_body = {"Job_ID": "test", "new_skills": [3, 5]}
        response = self.client.post(
            "/jobs/addskill",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Sucessfully added new skills."})

    def test_AddSkillToJob_Negative(self):
        self.createStaffUserID123()
        request_body = {"Job_ID": "Ntest", "new_skills": 123}
        response = self.client.post(
            "/jobs/addskill",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json,
            {
                "message": "Adding skills to Job Role Failed.",
                "error": "'int' object is not iterable",
            },
        )


# Test for change job name - PUT /jobs/changeName
class TestChangeJobName(TestApp):
    def test_ChangeJobName(self):
        self.createStaffUserID123()
        request_body = {"Job_ID": 1, "Job_name": "Programmer"}

        response = self.client.put(
            "/jobs/changeName",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Sucessfully changed job name."})

    def test_ChangeJobName_Negative(self):
        self.createStaffUserID123()
        request_body = {"Job_ID": 10, "Job_name": "Programmer"}

        response = self.client.put(
            "/jobs/changeName",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json["message"], "Changing job name Failed.")


# Test for getting all courses with skill - GET /course/skill/<string:skill_id>
class TestGetAllCoursesWithSkill(TestApp):
    def test_GetAllCoursesWithSkill(self):
        self.createStaffUserID123()
        response = self.client.get("/course/skill/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {"data": ["COR001"], "message": "Sucessfully queried courses by skill id."},
        )

    def test_GetAllCoursesWithSkill_Negative(self):
        response = self.client.get("/course/skill/1")
        self.assertEqual(
            response.json,
            {"message": "Skill ID has no courses or no such Skill ID Exist."},
        )
        self.assertEqual(response.status_code, 404)


# Test for delete skill from course - DELETE /course/skill/delete
class TestDeleteSkillFromCourse(TestApp):
    def test_DeleteSkillFromCourse(self):
        self.createStaffUserID123()
        request_body = {"Course_ID": "COR001", "Skill_ID": 1}
        response = self.client.delete(
            "/course/skill/delete",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {"message": "Sucessfully removed a course from a skill."},
        )

    def test_DeleteSkillFromCourse_Negative(self):
        self.createStaffUserID123()
        request_body = {
            "Course_ID": "COR001",
            "Skill_ID": 10,
        }  # Skill_ID does not exist
        response = self.client.delete(
            "/course/skill/delete",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json,
            {
                "message": "Removing course from skill failed.",
                "error": "Class 'builtins.NoneType' is not mapped",
            },
        )


# Test for change skill name - PUT /skill/changeName
class TestChangeSKillName(TestApp):
    def test_ChangeSKillName(self):
        self.createStaffUserID123()
        request_body = {"Skill_ID": "1", "Skill_name": "newSkillName"}
        self.client.put(
            "/skill/changeName",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        response = self.client.get("/skills")
        self.assertEqual(response.json["data"]["1"]["Skill_name"], "newSkillName")
    
    def test_ChangeSKillNameNegative(self):
        self.createStaffUserID123()
        request_body = {"Skill_ID": "100", "Skill_name": "newSkillName"}
        response = self.client.put(
            "/skill/changeName",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json,
            {
                "error": "Cant find skill with skill id",
                "message": "Changing skill name Failed.",
            },
        )


# Test for creating skill - POST /skill/create
class TestSkillCreate(TestApp):
    def test_SkillCreate(self):
        request_body = {
            "Skill_name": "newSkill Name",
            "Skill_courses": ["COR001", "COR002"],
        }
        response = self.client.post(
            "/skill/create",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(
            response.json,
            {"data": {"new_skill_id": 1}, "message": "Sucessfully added new skill."},
        )
        self.assertEqual(response.status_code, 200)

    def test_SkillCreate_Negative(self):
        request_body = {
            "Skill_name": "newSkill Name",
            "Skill_courses": "COR002",  # not list
        }
        response = self.client.post(
            "/skill/create",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 500)


# Test for updating CourseSkill - PUT /courseskill/edit
class TestUpdatingCourseSkill(TestApp):
    def test_UpdatingCourseSkill(self):
        request_body = {
            "skill_id": 2,
            "new_course_ids": ["COR001", "COR002"],
        }
        response = self.client.put(
            "/courseskill/edit",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(
            response.json,
            {
                "data": {"Course_IDs": ["COR001", "COR002"], "Skill_ID": 2},
                "message": "Sucessfully edited course skills.",
            },
        )
        self.assertEqual(response.status_code, 200)

    def test_UpdatingCourseSkill_Negative(self):
        request_body = {
            "skill_id": 2,
            "new_course_ids": "COR001",  # not list
        }
        response = self.client.put(
            "/courseskill/edit",
            data=json.dumps(request_body),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 500)
        # self.assertEqual(
        #     response.json,
        #     {'error': 'new_course_ids needs to be a list of courses_id not a single courses_id', 'message': 'Editing course skills failed.'},
        # )


# Test for updating LearningJourneyCourses - PUT /learningjourneyCourses/edit
class TestUpdateLearningJourneyCourses(TestApp):
    def test_UpdateLearningJourneyCourses(self):
        self.createStaffUserID123()
        request_body = {"LearningJounery_ID": 1, "new_Course_IDs": ["COR002"]}
        response = self.client.put(
            "/learningjourneyCourses/edit",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json,
            {
                "data": {"Course_IDs": ["COR002"], "LearningJounery_ID": 1},
                "message": "Sucessfully edited Learning Journey Courses.",
            },
        )

    def test_UpdateLearningJourneyCourses_Negative(self):
        self.createStaffUserID123()
        request_body = {
            "LearningJounery_ID": 1,
            "new_Course_IDs": "COR002",  # not array
        }

        response = self.client.put(
            "/learningjourneyCourses/edit",
            data=json.dumps(request_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json,
            {
                "error": "new_course_IDs must be array",
                "message": "Editing job skills failed.",
            },
        )


if __name__ == "__main__":
    unittest.main()
