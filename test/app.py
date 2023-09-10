from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = (
#     "mysql+mysqlconnector://root:" + "@127.0.0.1:3306/ljps_db"
# )
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_size": 100, "pool_recycle": 280}

db = SQLAlchemy(app)

CORS(app)

class Staff(db.Model):
    __tablename__ = "staff"

    Staff_ID = db.Column(db.Integer, primary_key=True)  # Staff ID for staff
    Staff_FName = db.Column(db.String(50), nullable=False)  # First Name
    Staff_LName = db.Column(db.String(50), nullable=False)  # Last Name
    # Team or dept staff belongs to
    Dept = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(50), nullable=False)  # Email Address
    # Role of user in the system (e.g Admin, User, Manager)
    Role = db.Column(db.Integer, db.ForeignKey("role.Role_ID"), nullable=False)

    def __init__(self, Staff_ID, Staff_FName, Staff_LName, Dept, Email, Role):
        self.Staff_ID = Staff_ID
        self.Staff_FName = Staff_FName
        self.Staff_LName = Staff_LName
        self.Dept = Dept
        self.Email = Email
        self.Role = Role

    def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


class Course(db.Model):
    __tablename__ = "course"

    Course_ID = db.Column(db.String(20), primary_key=True)  # Course ID
    Course_Name = db.Column(db.String(50), nullable=False)  # Name of course
    Course_Desc = db.Column(db.String(255))  # Course description
    # Course Status: Active or Retired, if status is still active, it will still be showed to user
    Course_Status = db.Column(db.String(15))
    # Course Type: Internal or External If the course in done in-house of external course
    Course_Type = db.Column(db.String(10))
    # The classification of the course, E.g. Technical, HR, Finance
    Course_Category = db.Column(db.String(50))

    def __init__(
        self,
        Course_ID,
        Course_Name,
        Course_Desc,
        Course_Status,
        Course_Type,
        Course_Category,
    ):
        self.Course_ID = Course_ID
        self.Course_Name = Course_Name
        self.Course_Desc = Course_Desc
        self.Course_Status = Course_Status
        self.Course_Type = Course_Type
        self.Course_Category = Course_Category

    def to_dict(self):
        columns = self.__mapper__.column_attrs.keys()
        result = {self.Course_ID: {}}
        for column in columns:
            result[self.Course_ID][column] = getattr(self, column)
        return result


class Role(db.Model):
    __tablename__ = "role"

    Role_ID = db.Column(db.Integer, primary_key=True)
    # e.g. 1-Admin, 2-User, 3-Manager
    Role_Name = db.Column(db.String(20), nullable=False)

    def __init__(self, Role_ID, Role_Name):
        self.Role_ID = Role_ID
        self.Role_Name = Role_Name

    def to_dict(self):
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


class Registration(db.Model):
    __tablename__ = "registration"

    Reg_ID = db.Column(db.Integer, primary_key=True)  # Registration ID
    Course_ID = db.Column(db.String(20), db.ForeignKey("course.Course_ID"))  # Course ID
    Staff_ID = db.Column(db.Integer, db.ForeignKey("staff.Staff_ID"))  # Staff ID
    # If the staff is reg for the course or waitlist or rejected
    Reg_Status = db.Column(db.String(20), nullable=False)
    # If the staff have completed the course
    Completion_Status = db.Column(db.String(20), nullable=False)

    def __init__(self, Reg_ID, Course_ID, Staff_ID, Reg_Status, Completion_Status):
        self.Reg_ID = Reg_ID
        self.Course_ID = Course_ID
        self.Staff_ID = Staff_ID
        self.Reg_Status = Reg_Status
        self.Completion_Status = Completion_Status

    def to_dict(self):
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


class Skill(db.Model):
    __tablename__ = "skill"

    Skill_ID = db.Column(db.Integer, primary_key=True)  # Skill ID
    Skill_name = db.Column(db.String(245))  # Skill Name

    def __init__(self, Skill_ID, Skill_name):
        self.Skill_ID = Skill_ID
        self.Skill_name = Skill_name

    def to_dict(self):
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


class CourseSkill(db.Model):
    __tablename__ = "courseSkills"
    CourseSkill_ID = db.Column(db.Integer, primary_key=True)
    Course_ID = db.Column(db.String(20), db.ForeignKey("course.Course_ID"))  # Course ID
    Skill_ID = db.Column(db.Integer, db.ForeignKey("skill.Skill_ID"))  # Skill ID

    def __init__(self, CourseSkill_ID, Course_ID, Skill_ID):
        self.CourseSkill_ID = CourseSkill_ID
        self.Course_ID = Course_ID
        self.Skill_ID = Skill_ID


class Job(db.Model):
    __tablename__ = "job"
    Job_ID = db.Column(db.Integer, primary_key=True)  # Job ID
    JobName = db.Column(db.String(45))  # Job Name

    def __init__(self, Job_ID, JobName):
        self.Job_ID = Job_ID
        self.JobName = JobName


class JobSkill(db.Model):
    __tablename__ = "jobskills"
    JobSkill_ID = db.Column(db.Integer, primary_key=True)  # JobSkill_ID ID
    Job_ID = db.Column(db.Integer, db.ForeignKey("job.Job_ID"))  # Job ID
    Skill_ID = db.Column(db.Integer, db.ForeignKey("skill.Skill_ID"))  # Skill ID

    def __init__(self, JobSkill_ID, Job_ID, Skill_ID):
        self.JobSkill_ID = JobSkill_ID
        self.Job_ID = Job_ID
        self.Skill_ID = Skill_ID


class LearningJounery(db.Model):
    __tablename__ = "learningJourneys"

    LearningJounery_ID = db.Column(db.Integer, primary_key=True)
    Job_ID = db.Column(db.Integer, db.ForeignKey("job.Job_ID"))  # Job ID
    Staff_ID = db.Column(db.Integer, db.ForeignKey("staff.Staff_ID"))  # Staff ID
    Status = db.Column(db.String(20))

    def __init__(self, LearningJounery_ID, Job_ID, Staff_ID):
        self.LearningJounery_ID = LearningJounery_ID
        self.Job_ID = Job_ID
        self.Staff_ID = Staff_ID
        self.Status = "In-Progress"


class LearningJouneryCourses(db.Model):
    __tablename__ = "learningJourneyCourses"

    LearningJouneryCourses_ID = db.Column(db.Integer, primary_key=True)
    LearningJounery_ID = db.Column(
        db.Integer, db.ForeignKey("learningJourneys.LearningJounery_ID")
    )
    Course_ID = db.Column(db.String(20), db.ForeignKey("course.Course_ID"))  # Course ID

    def __init__(self, LearningJouneryCourses_ID, LearningJounery_ID, Course_ID):
        self.LearningJouneryCourses_ID = LearningJouneryCourses_ID
        self.LearningJounery_ID = LearningJounery_ID
        self.Course_ID = Course_ID


with app.app_context():
    db.create_all()

# Staff Endpoint #########
# Get Staff by ID


@app.route("/staff/<int:staff_id>", methods=["GET"])
def staff_by_id(staff_id):
    staff = Staff.query.filter_by(Staff_ID=staff_id).first()
    if staff:
        Staff_ID_i = staff.Staff_ID
        Staff_FName = staff.Staff_FName
        Staff_LName = staff.Staff_LName
        Dept = staff.Dept
        Email = staff.Email
        Role_i = staff.Role

        # find completed courses , which will also give completed skills
        Completed_Courses = []
        Completed_Skills = []
        # find inprogress courses
        Inprogress_Courses = []

        registered_courses = Registration.query.filter_by(Staff_ID=Staff_ID_i)

        for course in registered_courses:
            Course_ID_i = course.Course_ID
            Reg_Status = course.Reg_Status
            Completion_Status = course.Completion_Status

            if Completion_Status == "Completed":
                Completed_Courses.append(Course_ID_i)
                # Finding gained skills
                skills_course = CourseSkill.query.filter_by(Course_ID=Course_ID_i)
                for skill in skills_course:
                    Skill_ID = skill.Skill_ID
                    if str(Skill_ID) not in Completed_Skills:
                        Completed_Skills.append(str(Skill_ID))
            elif Completion_Status == "In-Progress":
                Inprogress_Courses.append(Course_ID_i)

        # Find Learning Jounery
        User_LearningJounerys = []
        LearningJounerys = LearningJounery.query.filter_by(Staff_ID=Staff_ID_i)
        for learningJounery in LearningJounerys:
            LearningJounery_ID_i = learningJounery.LearningJounery_ID
            Job_ID_i = learningJounery.Job_ID
            Job_name = Job.query.filter_by(Job_ID=Job_ID_i).first().JobName
            Skills = []
            Courses = [
                ljc.Course_ID
                for ljc in LearningJouneryCourses.query.filter_by(
                    LearningJounery_ID=LearningJounery_ID_i
                )
            ]
            Progress = learningJounery.Status

            jobskills = JobSkill.query.filter_by(Job_ID=Job_ID_i)
            for jobskill in jobskills:
                Skill_ID_i = jobskill.Skill_ID
                if Skill_ID_i not in Skills:
                    Skills.append(Skill_ID_i)

            ljr_res = {
                "Job_ID": Job_ID_i,
                "Job_name": Job_name,
                "Skills": Skills,
                "Courses": Courses,
                "Progress": Progress,
                "LearningJounery_ID": LearningJounery_ID_i,
            }
            User_LearningJounerys.append(ljr_res)

        res = {
            "data": {
                "Staff_ID": str(Staff_ID_i),
                "Staff_FName": Staff_FName,
                "Staff_LName": Staff_LName,
                "Dept": Dept,
                "Email": Email,
                "Role": str(Role_i),
                "Completed_Courses": Completed_Courses,
                "Completed_Skills": Completed_Skills,
                "Inprogress_Courses": Inprogress_Courses,
                "Learning_Journeys": User_LearningJounerys,
            }
        }
        return jsonify(res), 200
    else:
        return jsonify({"message": "No staff can be found."}), 404


# Get All Staff


@app.route("/staff", methods=["GET"])
def get_all_staff():
    staffs = Staff.query.all()
    if staffs:
        return jsonify({"data": [staff.to_dict() for staff in staffs]}), 200
    else:
        return jsonify({"message": "No Staff can be found."}), 404


# Course Endpoint #########
# Get Course by ID


@app.route("/course/<string:course_id>", methods=["GET"])
def course_by_id(course_id):
    course = Course.query.filter_by(Course_ID=course_id).first()
    if course:
        return jsonify({"data": course.to_dict()}), 200
    else:
        return jsonify({"message": "Course not found."}), 404


# Get All Course


@app.route("/course", methods=["GET"])
def get_all_course():
    courses = Course.query.all()
    res = {"data": {}}
    if courses:
        for course in courses:
            Course_ID = course.Course_ID
            Course_Name = course.Course_Name
            Course_Desc = course.Course_Desc
            Course_Status = course.Course_Status
            Course_Type = course.Course_Type
            Course_Category = course.Course_Category
            course_res = {
                "Course_ID": Course_ID,
                "Course_Name": Course_Name,
                "Course_Desc": Course_Desc,
                "Course_Status": Course_Status,
                "Course_Type": Course_Type,
                "Course_Category": Course_Category,
            }
            res["data"][Course_ID] = course_res

        return jsonify(res), 200
    else:
        return jsonify({"message": "No courses can be found."}), 404


# Role Endpoint #########
# Get Role by ID


@app.route("/role/<int:role_id>", methods=["GET"])
def role_by_id(role_id):
    role = Role.query.filter_by(Role_ID=role_id).first()
    if role:
        return jsonify({"data": role.to_dict()}), 200
    else:
        return jsonify({"message": "Staff not found."}), 404


# Get all Roles


@app.route("/role", methods=["GET"])
def get_all_roles():
    roles = Role.query.all()
    if roles:
        return jsonify({"data": [role.to_dict() for role in roles]}), 200
    else:
        return jsonify({"message": "No roles can be found."}), 404


# Update Role By Role ID


@app.route("/role/update", methods=["POST"])
def updateRole():
    if request.method == "POST":
        role_id = request.json["role_id"]
        new_role_name = request.json["new_role_name"]
        try:
            role = Role.query.filter_by(Role_ID=role_id).first()
            role.Role_Name = new_role_name
            db.session.commit()
        except Exception as e:
            return (
                jsonify(
                    {"message": "Editing role failed.", "error": "Role does not exist"}
                ),
                500,
            )
        return jsonify({"data": role.to_dict()}), 200
    None


# Registration Endpoint ######### ##
# Get Registration by ID


@app.route("/registration/<int:reg_id>", methods=["GET"])
def registration_by_id(reg_id):
    registration = Registration.query.filter_by(Reg_ID=reg_id).first()
    if registration:
        return jsonify({"data": registration.to_dict()}), 200
    else:
        return jsonify({"message": "Registration not found."}), 404


# Get all registration


@app.route("/registration", methods=["GET"])
def get_all_registration():
    registrations = Registration.query.all()
    if registrations:
        return (
            jsonify(
                {"data": [registration.to_dict() for registration in registrations]}
            ),
            200,
        )
    else:
        return jsonify({"message": "No registrations can be found."}), 404


# Skills Endpoint #########
# Get Skills By Job ID


@app.route("/skill/job/<int:job_id>", methods=["GET"])
def getSkillByJobID(job_id):
    # TBC
    skills = JobSkill.query.filter_by(Job_ID=job_id)
    if skills:
        res = []
        for skill in skills:
            new_skill_id = skill.Skill_ID
            res.append(new_skill_id)
        if res != []:
            return jsonify({"data": res}), 200
        else:
            return jsonify({"message": "No skills can be found."}), 404
    else:
        return jsonify({"message": "No skills can be found."}), 404


@app.route("/import_csv", methods=["GET"])
def importCSV():
    try:
        path = "./csv_import/"
        dirs = os.listdir(path)

        for file in dirs:
            if "course" in file:
                file_df = pd.read_csv(path + file, encoding="ISO 8859-1")

                new_courses = []
                for index, row in file_df.iterrows():
                    Course_ID = row["Course_ID"]
                    Course_Name = row["Course_Name"]
                    Course_Desc = row["Course_Desc"]
                    Course_Status = row["Course_Status"]
                    Course_Type = row["Course_Type"]
                    Course_Category = row["Course_Category"]

                    new_course = Course(
                        Course_ID,
                        Course_Name,
                        Course_Desc,
                        Course_Status,
                        Course_Type,
                        Course_Category,
                    )
                    new_courses.append(new_course)
                    db.session.add(new_course)
            elif "role" in file:
                file_df = pd.read_csv(path + file, encoding="ISO 8859-1")

                new_roles = []
                for index, row in file_df.iterrows():
                    Role_ID = row["Role_ID"]
                    Role_Name = row["Role_Name"]

                    new_role = Role(Role_ID, Role_Name)
                    new_roles.append(new_role)
                    db.session.add(new_role)
            elif "staff" in file:
                file_df = pd.read_csv(path + file, encoding="ISO 8859-1")

                new_staffs = []
                for index, row in file_df.iterrows():
                    Staff_ID = row["Staff_ID"]
                    Staff_FName = row["Staff_FName"]
                    Staff_LName = row["Staff_LName"]
                    Dept = row["Dept"]
                    Email = row["Email"]
                    role = row["Role"]

                    new_staff = Staff(
                        Staff_ID, Staff_FName, Staff_LName, Dept, Email, role
                    )
                    new_staffs.append(new_staffs)
                    db.session.add(new_staff)
            elif "registration" in file:
                file_df = pd.read_csv(path + file, encoding="ISO 8859-1")

                new_registrations = []
                for index, row in file_df.iterrows():
                    Reg_ID = row["Reg_ID"]
                    Course_ID = row["Course_ID"]
                    Staff_ID = row["Staff_ID"]
                    Reg_Status = row["Reg_Status"]
                    Completion_Status = row["Completion_Status"]

                    new_registration = Registration(
                        Reg_ID, Course_ID, Staff_ID, Reg_Status, Completion_Status
                    )
                    new_registrations.append(new_registration)
                    db.session.add(new_registration)
            else:
                print("unknown file", file)
        db.session.commit()
        return (
            jsonify(
                {
                    "data": {
                        "courses": len(new_courses),
                        "role": len(new_roles),
                        "staff": len(new_staff),
                        "registration": len(new_registrations),
                    }
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 404


@app.route("/test", methods=["GET"])
def test():
    course_a1 = Course("COR010", "test", "Test", "test", "test", "test")
    db.session.add(course_a1)
    db.session.commit()
    return jsonify({"data": course_a1.to_dict()}), 200


@app.route("/skills", methods=["GET"])
def get_all_skill():
    skills = Skill.query.all()
    res = {"data": {}}
    if skills:
        for skill in skills:
            skill_id = skill.Skill_ID
            skill_name = skill.Skill_name
            skill_course = CourseSkill.query.filter_by(Skill_ID=skill_id)

            courses = [course.Course_ID for course in skill_course]

            if skill_id not in res["data"]:
                res["data"][skill_id] = {
                    "Skill_ID": str(skill_id),
                    "Skill_name": skill_name,
                    "Skill_courses": courses,
                }
        return jsonify(res), 200
    else:
        return jsonify({"message": "No Skills can be found."}), 404


@app.route("/jobs", methods=["GET"])
def get_all_job():
    jobs = Job.query.all()
    res = {"data": {}}
    if jobs:
        for job in jobs:
            Job_ID_q = job.Job_ID
            Job_name = job.JobName
            Job_skills = []
            Job_courses = []

            job_skills = JobSkill.query.filter_by(Job_ID=Job_ID_q)

            for jobSkill in job_skills:
                skill_id = jobSkill.Skill_ID
                Job_skills.append(skill_id)

                skill_courses = CourseSkill.query.filter_by(Skill_ID=skill_id)

                for course in skill_courses:
                    course_id = course.Course_ID
                    if course_id not in Job_courses:
                        Job_courses.append(course_id)

            if Job_ID_q not in res["data"]:
                res["data"][Job_ID_q] = {
                    "Job_ID": str(Job_ID_q),
                    "Job_name": Job_name,
                    "Job_skills": Job_skills,
                    "Job_courses": Job_courses,
                }
        return jsonify(res), 200
    else:
        return jsonify({"message": "No Jobs can be found."}), 404


@app.route("/learningjounery/create", methods=["POST"])
def create_learningjounery():
    if request.method == "POST":
        body = request.get_json()
        staffID = body["staff_id"]
        Job_ID = body["job_id"]
        Courses = body["courses"]  # array
        try:
            try:
                new_LJ_ID = (
                    LearningJounery.query.order_by(
                        LearningJounery.LearningJounery_ID.desc()
                    )
                    .first()
                    .LearningJounery_ID
                    + 1
                )
            except Exception as e:
                new_LJ_ID = 1
            # create new learning jounery
            lj_obj = LearningJounery(new_LJ_ID, Job_ID, staffID)
            db.session.add(lj_obj)
        except Exception as e:
            return (
                jsonify(
                    {"message": "Creating new LearningJounery failed.", "error": str(e)}
                ),
                500,
            )
        try:
            # creating new lj_courses obj
            for course_id in Courses:
                try:
                    new_LJC_ID = (
                        LearningJouneryCourses.query.order_by(
                            LearningJouneryCourses.LearningJouneryCourses_ID.desc()
                        )
                        .first()
                        .LearningJouneryCourses_ID
                        + 1
                    )
                except Exception as e:
                    new_LJC_ID = 1
                ljc_obj = LearningJouneryCourses(new_LJC_ID, new_LJ_ID, course_id)
                db.session.add(ljc_obj)
        except Exception as e:
            return (
                jsonify(
                    {
                        "message": "Creating new LearningJouneryCourses failed.",
                        "error": str(e),
                    }
                ),
                500,
            )

        db.session.commit()
        return jsonify({"message": "Sucessfully created new learning jounery."}), 200
    None


@app.route("/jobskill/edit", methods=["PUT"])
def updateJobSkill():
    try:
        if request.method == "PUT":
            body = request.get_json()
            job_id = body["job_id"]
            new_job_skills = body["new_job_skills"]

            # getting all old job skills
            jobSkills = JobSkill.query.filter_by(Job_ID=job_id)
            for jobskill in jobSkills:
                db.session.delete(jobskill)
            # making new job skilsl
            for new_skill_id in new_job_skills:
                new_jobskil_ID = (
                    JobSkill.query.order_by(JobSkill.JobSkill_ID.desc())
                    .first()
                    .JobSkill_ID
                    + 1
                )
                new_JobSkill_OBJ = JobSkill(new_jobskil_ID, job_id, new_skill_id)
                db.session.add(new_JobSkill_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully edited job skills.",
                        "data": {"Job_ID": job_id, "Skill_IDs": new_job_skills},
                    }
                ),
                200,
            )
    except Exception as e:
        return jsonify({"message": "Editing job skills failed.", "error": str(e)}), 404


@app.route("/jobs/create", methods=["POST"])
def createJobs():
    if request.method == "POST":
        try:
            body = request.get_json()
            Job_name = body["Job_name"]
            Job_skills = body["Job_skills"]
            new_Job_ID = Job.query.order_by(Job.Job_ID.desc()).first().Job_ID + 1
            new_job_OBJ = Job(new_Job_ID, Job_name)

            db.session.add(new_job_OBJ)

            for skill_ID in Job_skills:
                new_JobSkill_ID = (
                    JobSkill.query.order_by(JobSkill.JobSkill_ID.desc())
                    .first()
                    .JobSkill_ID
                    + 1
                )
                new_JobSkill_OBJ = JobSkill(new_JobSkill_ID, new_Job_ID, skill_ID)
                db.session.add(new_JobSkill_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully added new job.",
                        "data": {"new_job_id": new_Job_ID},
                    }
                ),
                200,
            )
        except Exception as e:
            return jsonify({"message": "Adding new job failed.", "error": str(e)}), 500


@app.route("/jobs/addskill", methods=["POST"])
def addSkillToJob():
    if request.method == "POST":
        try:
            body = request.get_json()
            Job_id = body["Job_ID"]
            Job_skills = body["new_skills"]
            for skill_id in Job_skills:
                new_JobSkill_ID = (
                    JobSkill.query.order_by(JobSkill.JobSkill_ID.desc())
                    .first()
                    .JobSkill_ID
                    + 1
                )
                new_JobSkill_OBJ = JobSkill(new_JobSkill_ID, Job_id, skill_id)
                db.session.add(new_JobSkill_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully added new skills.",
                    }
                ),
                200,
            )
        except Exception as e:
            return (
                jsonify(
                    {"message": "Adding skills to Job Role Failed.", "error": str(e)}
                ),
                404,
            )


@app.route("/jobs/changeName", methods=["PUT"])
def changeJobName():
    if request.method == "PUT":
        try:
            body = request.get_json()
            Job_id = body["Job_ID"]
            Job_name = body["Job_name"]
            job_OBJ = Job.query.filter_by(Job_ID=Job_id).first()
            job_OBJ.JobName = Job_name
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully changed job name.",
                    }
                ),
                200,
            )
        except Exception as e:
            return (
                jsonify({"message": "Changing job name Failed.", "error": str(e)}),
                404,
            )


@app.route("/course/skill/<string:skill_id>", methods=["GET"])
def course_by_skillID(skill_id):
    if request.method == "GET":
        try:
            courseSkills = CourseSkill.query.filter_by(Skill_ID=skill_id)
            res = []
            for courseSkill_OBJ in courseSkills:
                res.append(courseSkill_OBJ.Course_ID)
            if res == []:
                return (
                    jsonify(
                        {
                            "message": "Skill ID has no courses or no such Skill ID Exist.",
                        }
                    ),
                    404,
                )
            return (
                jsonify(
                    {"message": "Sucessfully queried courses by skill id.", "data": res}
                ),
                200,
            )
        except Exception as e:
            return (
                jsonify(
                    {
                        "message": "searching courses by skill id failed.",
                        "error": str(e),
                    }
                ),
                404,
            )


@app.route("/course/skill/delete", methods=["DELETE"])
def deleteCourseSkillRelation():
    if request.method == "DELETE":
        try:
            body = request.get_json()
            q_Course_ID = body["Course_ID"]
            q_Skill_ID = body["Skill_ID"]
            CourseSkills_OBJ = CourseSkill.query.filter_by(
                Course_ID=q_Course_ID, Skill_ID=q_Skill_ID
            ).first()

            db.session.delete(CourseSkills_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully removed a course from a skill.",
                    }
                ),
                200,
            )
        except Exception as e:
            return (
                jsonify(
                    {"message": "Removing course from skill failed.", "error": str(e)}
                ),
                404,
            )


@app.route("/skill/changeName", methods=["PUT"])
def changeSkillName():
    if request.method == "PUT":
        try:
            body = request.get_json()
            q_Skill_ID = body["Skill_ID"]
            q_Skill_name = body["Skill_name"]

            skill_OBJ = Skill.query.filter_by(Skill_ID=q_Skill_ID).first()
            try:
                skill_OBJ.Skill_name = q_Skill_name
                db.session.commit()
            except Exception as e:
                return (
                    jsonify(
                        {
                            "message": "Changing skill name Failed.",
                            "error": "Cant find skill with skill id",
                        }
                    ),
                    400,
                )
            return (
                jsonify(
                    {
                        "message": "Sucessfully changed skill name.",
                    }
                ),
                200,
            )
        except Exception as e:
            return (
                jsonify({"message": "Changing skill name Failed.", "error": str(e)}),
                500,
            )


@app.route("/skill/create", methods=["POST"])
def createSkill():
    if request.method == "POST":
        try:
            body = request.get_json()
            q_Skill_name = body["Skill_name"]
            q_Skill_courses = body["Skill_courses"]

            if type(q_Skill_courses) not in (tuple, list):
                return (
                    jsonify(
                        {
                            "message": "Adding new skill failed.",
                            "error": "Skill_courses must be an array of courses",
                        }
                    ),
                    500,
                )
            try:
                new_Skill_ID = (
                    Skill.query.order_by(Skill.Skill_ID.desc()).first().Skill_ID + 1
                )
            except Exception as e:
                new_Skill_ID = 1
            new_skill_OBJ = Skill(new_Skill_ID, q_Skill_name)

            db.session.add(new_skill_OBJ)

            for courseID in q_Skill_courses:
                try:
                    new_CourseSkill_ID = (
                        CourseSkill.query.order_by(CourseSkill.CourseSkill_ID.desc())
                        .first()
                        .CourseSkill_ID
                        + 1
                    )
                except Exception as e:
                    new_CourseSkill_ID = 1

                new_CourseSkill_OBJ = CourseSkill(
                    new_CourseSkill_ID, courseID, new_Skill_ID
                )
                db.session.add(new_CourseSkill_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully added new skill.",
                        "data": {"new_skill_id": new_Skill_ID},
                    }
                ),
                200,
            )
        except Exception as e:
            return (
                jsonify({"message": "Adding new skill failed.", "error": str(e)}),
                404,
            )


@app.route("/courseskill/edit", methods=["PUT"])
def updateCourseSkill():
    try:
        if request.method == "PUT":
            body = request.get_json()
            skill_id = body["skill_id"]
            new_course_ids = body["new_course_ids"]
            if type(new_course_ids) not in (tuple, list):
                return (
                    jsonify(
                        {
                            "message": "Editing course skills failed.",
                            "error": "new_course_ids needs to be a list of courses_id not a single courses_id",
                        }
                    ),
                    500,
                )

            # getting all old course skills
            CourseSkills = CourseSkill.query.filter_by(Skill_ID=skill_id)
            for CourseSkill_OBJ in CourseSkills:
                db.session.delete(CourseSkill_OBJ)
            # making new course skill
            for new_course_id in new_course_ids:
                try:
                    new_CourseSkill_ID = (
                        CourseSkill.query.order_by(CourseSkill.CourseSkill_ID.desc())
                        .first()
                        .CourseSkill_ID
                        + 1
                    )
                except:
                    new_CourseSkill_ID = 1
                new_CourseSkill_OBJ = CourseSkill(
                    new_CourseSkill_ID, new_course_id, skill_id
                )
                db.session.add(new_CourseSkill_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully edited course skills.",
                        "data": {"Skill_ID": skill_id, "Course_IDs": new_course_ids},
                    }
                ),
                200,
            )
    except Exception as e:
        return jsonify({
            "message": "Editing course skills failed.",
            "error": str(e)
        }), 500


@app.route("/skill/delete/<int:skill_id>", methods=['DELETE'])
def skillDelete(skill_id):
    skill_obj = Skill.query.filter_by(
                Skill_ID=skill_id).first()
    if skill_obj:
        course_skills_objs = CourseSkill.query.filter_by(
                Skill_ID=skill_id)
        job_skills_objs = JobSkill.query.filter_by(
                Skill_ID=skill_id)
        try:
            for obj in course_skills_objs:
                db.session.delete(obj)
            for obj in job_skills_objs:
                db.session.delete(obj)
            db.session.delete(skill_obj)
            db.session.commit()

            return jsonify({
                "message": "Sucessfully deleted skill.",
                "data": {
                    "skill_id": skill_id
                }
            }), 200

        except Exception as e:
            print(e)
            return jsonify({
            "message": "Deleting skill failed.",
            "error": str(e)
        }), 500
    else: 
        return jsonify({
            "message": "Error, skill not found."
        }), 404

@app.route("/job/delete/<int:job_id>", methods=['DELETE'])
def jobDelete(job_id):
    job_obj = Job.query.filter_by(
                Job_ID=job_id).first()
    if job_obj:
        JobSkill_objs = JobSkill.query.filter_by(
                Job_ID=job_id)
        LearningJounery_objs = LearningJounery.query.filter_by(
                Job_ID=job_id)
        learningJouneryCourses_objs = []

        try:

            for obj in LearningJounery_objs:
                lr_id = obj.LearningJounery_ID
                lrc_objs = LearningJouneryCourses.query.filter_by(
                    LearningJounery_ID=lr_id)
                learningJouneryCourses_objs.extend(lrc_objs)
            db.session.delete(job_obj)
            for obj in JobSkill_objs:
                db.session.delete(obj)
            for obj in LearningJounery_objs:
                db.session.delete(obj)
            for obj in learningJouneryCourses_objs:
                db.session.delete(obj)
            db.session.commit()

            return jsonify({
                "message": "Sucessfully deleted job.",
                "data": {
                    "job_id": job_id
                }
            }), 200

        except Exception as e:
            print(e)
            return jsonify({
            "message": "Deleting job failed.",
            "error": str(e)
        }), 500
    else: 
        return jsonify({
            "message": "Error, job not found."
        }), 404

@app.route("/learningjounery/delete/<int:lj_id>", methods=['DELETE'])
def skillLearningJounery(lj_id):
    lj_obj = LearningJounery.query.filter_by(
                LearningJounery_ID=lj_id).first()
    if lj_obj:
        lrc_objs = LearningJouneryCourses.query.filter_by(
                    LearningJounery_ID=lj_id)
        try:
            for obj in lrc_objs:
                db.session.delete(obj)
            db.session.delete(lj_obj)
            db.session.commit()

            return jsonify({
                "message": "Sucessfully delete learningjounery.",
                "data": {
                    "LearningJounery_ID": lj_id
                }
            }), 200

        except Exception as e:
            return jsonify({
            "message": "Deleting learningjounery failed.",
            "error": str(e)
        }), 500
    else: 
        return jsonify({
            "message": "Error, learningjounery not found."
        }), 404


@app.route("/learningjourneyCourses/edit", methods=["PUT"])
def updateLearningJourneyCourses():
    try:
        if request.method == "PUT":
            body = request.get_json()
            LearningJounery_ID = body["LearningJounery_ID"]
            new_Course_IDs = body["new_Course_IDs"]
            if type(new_Course_IDs) not in (tuple, list):
                return (
                    jsonify(
                        {
                            "message": "Editing job skills failed.",
                            "error": "new_course_IDs must be array",
                        }
                    ),
                    500,
                )
            # getting all old LearningJourney Course
            lj_c = LearningJouneryCourses.query.filter_by(
                LearningJounery_ID=LearningJounery_ID
            )
            for learningjounerycourse in lj_c:
                db.session.delete(learningjounerycourse)
            # making new job skilsl
            for new_course_id in new_Course_IDs:
                new_lj_c_ID = (
                    LearningJouneryCourses.query.order_by(
                        LearningJouneryCourses.LearningJouneryCourses_ID.desc()
                    )
                    .first()
                    .LearningJouneryCourses_ID
                    + 1
                )
                new_LearningJouneryCourses_OBJ = LearningJouneryCourses(
                    new_lj_c_ID, LearningJounery_ID, new_course_id
                )
                db.session.add(new_LearningJouneryCourses_OBJ)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Sucessfully edited Learning Journey Courses.",
                        "data": {
                            "LearningJounery_ID": LearningJounery_ID,
                            "Course_IDs": new_Course_IDs,
                        },
                    }
                ),
                200,
            )
    except Exception as e:
        return jsonify({"message": "Editing job skills failed.", "error": str(e)}), 500
def runLoadCsv():
    with app.app_context():
        print("Running: importCSV")
        res = importCSV()
        print(res[0])
        print("Completed: importCSV")

scheduler = BackgroundScheduler()
print(" * Adding job scheduled 12 hr for importing of csv")
scheduler.add_job(func=runLoadCsv, trigger="interval", hours=12)
scheduler.start()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
