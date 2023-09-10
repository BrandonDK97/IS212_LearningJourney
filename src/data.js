//Get Staff by Staff ID
//URL = "http://hostname:port/staff/*staffID*"
//e.g. http://hostname:port/staff/130001
//e.g. output = 
var staffData = {
    "data": {
        "Dept": "Chariman",
        "Email": "jack.sim@allinone.com.sg",
        "Role": 1,
        "Staff_FName": "John",
        "Staff_ID": 130001,
        "Staff_LName": "Sim"
    }
}

//#Get all staff *TBC*

//#Get Course by Course ID
//URL = http://hostname:port/course/*course_id*
//e.g. http://hostname:port/course/COR001
//e.g. output = 
var courseData = {
    "data": {
        "Course_Category": "Core",
        "Course_Desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
        "Course_ID": "COR001",
        "Course_Name": "Systems Thinking and Design",
        "Course_Status": "Active",
        "Course_Type": "Internal"
    }
}

//#Get all Course *TBC*

//#Get Role by Role ID
//URL = http://hostname:port/role/*role_id*
//e.g. http://hostname:port/role/1
//e.g. output = 
var response = {
    "data": [
        {
            "Role_ID": 1,
            "Role_name": "Web Developer",
            "Role_skills": [],
            "Role_courses": []
        },
        {
            "Role_ID": 2,
            "Role_name": "Backend Engineer",
            "Role_skills": [],
            "Role_courses": []
        },
        {
            "Role_ID": 3,
            "Role_name": "Admin",
            "Role_skills": [],
            "Role_courses": []
        },
        {
            "Role_ID": 4,
            "Role_name": "Marketing",
            "Role_skills": [],
            "Role_courses": []
        },
        {
            "Role_ID": 5,
            "Role_name": "Data Analyst",
            "Role_skills": [],
            "Role_courses": []
        }
    ]
}

var jobData = {
    "data": {
        "1": {
            "Job_ID": "1",
            "Job_courses": [
                "COR001",
                "FIN001",
                "COR002"
            ],
            "Job_name": "Sales Person",
            "Job_skills": [
                1,
                6
            ]
        },
        "2": {
            "Job_ID": "2",
            "Job_courses": [
                "COR001",
                "COR002",
                "FIN001"
            ],
            "Job_name": "Project Owner",
            "Job_skills": [
                2,
                1
            ]
        },
        "3": {
            "Job_ID": "3",
            "Job_courses": [
                "COR001",
                "COR002"
            ],
            "Job_name": "Team Manager",
            "Job_skills": [
                3
            ]
        },
    }
}

var skillData = {
    "data": {
        "1": {
            "Skill_ID": "1",
            "Skill_courses": [
                "COR001",
                "FIN001"
            ],
            "Skill_name": "skill#1"
        },
        "2": {
            "Skill_ID": "2",
            "Skill_courses": [
                "COR001",
                "COR002"
            ],
            "Skill_name": "skill#2"
        },
        "3": {
            "Skill_ID": "3",
            "Skill_courses": [
                "COR001",
                "COR002"
            ],
            "Skill_name": "skill#3"
        },
        "4": {
            "Skill_ID": "4",
            "Skill_courses": [
                "COR003"
            ],
            "Skill_name": "skill#4"
        },
        "5": {
            "Skill_ID": "5",
            "Skill_courses": [
                "COR003"
            ],
            "Skill_name": "skill#5"
        },
        "6": {
            "Skill_ID": "6",
            "Skill_courses": [
                "COR002"
            ],
            "Skill_name": "skill#6"
        }
    }
}
//#Get all Role *TBC*

//#Get Registration by Registration ID
//URL = http://hostname:port/registration/*reg_id*
//e.g. http://hostname:port/registration/1
//e.g. output = 
var getRegistrationData = {
    "data": {
        "Completion_Status": "Completed",
        "Course_ID": "COR001",
        "Reg_ID": 1,
        "Reg_Status": "Registered",
        "Staff_ID": 130001
    }
}

//#Get all registration *TBC*