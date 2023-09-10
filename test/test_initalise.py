import unittest
from app import *

class TestInitialiseStaff(unittest.TestCase):
    def setUp(self):
        self.staff = Staff(Staff_ID="999997",
                           Staff_FName="Test",
                           Staff_LName="Er",
                           Dept="Sales",
                           Email="test@allinone.com",
                           Role="2")

    def test_to_dict(self):
        self.assertEqual(self.staff.to_dict(), {
            "Staff_ID": "999997",
            "Staff_FName": "Test",
            "Staff_LName": "Er",
            "Dept": "Sales",
            "Email": "test@allinone.com",
            "Role": "2"
        }
        )

# Test Initialise Staff as HR 
class TestHR(unittest.TestCase):
    def setUp(self):
        self.staff = Staff(Staff_ID="999998",
                           Staff_FName="Test",
                           Staff_LName="Er",
                           Dept="HR",
                           Email="testHR@allinone.com",
                           Role="1")

    def test_to_dict(self):
        self.assertEqual(self.staff.to_dict(), {
            "Staff_ID": "999998",
            "Staff_FName": "Test",
            "Staff_LName": "Er",
            "Dept": "HR",
            "Email": "testHR@allinone.com",
            "Role": "1"
        }
        )
        
# Test Initialise Staff as Manager
class TestManager(unittest.TestCase):
    def setUp(self):
        self.staff = Staff(Staff_ID="999999",
                           Staff_FName="Test",
                           Staff_LName="Er",
                           Dept="Management",
                           Email="testM@allinone.com",
                           Role="3")


    def test_to_dict(self):
        self.assertEqual(self.staff.to_dict(), {
            "Staff_ID": "999999",
            "Staff_FName": "Test",
            "Staff_LName": "Er",
            "Dept": "Management",
            "Email": "testM@allinone.com",
            "Role": "3"
        }
        )
    
# Test Initialise Course
class TestInitialiseCourse(unittest.TestCase):
    def setUp(self):
        self.course = Course(
            Course_ID="1",
            Course_Name="Test Course",
            Course_Desc="Test Course Description",
            Course_Status="Active",
            Course_Type="Online",
            Course_Category="Test")

    def test_to_dict(self):
        self.assertEqual(self.course.to_dict(), {
            "1" : {
            "Course_ID": "1",
            "Course_Name": "Test Course",
            "Course_Desc": "Test Course Description",
            "Course_Status": "Active",
            "Course_Type": "Online",
            "Course_Category": "Test"
            }
        }
        )

# Test Initialise Role
# This test fails because the initialise argument is Role_Name, but the variable is Role_name, so will always get Role_name = none
class TestInitialiseRole(unittest.TestCase):
    def setUp(self):
        self.role = Role(
            Role_ID="1",
            Role_Name="Admin")


    def test_to_dict(self):
        self.assertEqual(self.role.to_dict(), {
            "Role_ID": "1",
            "Role_Name": "Admin", 
        }
        )
    
# Test Initialise Registration
# Need to initialise Staff and Course in this test?
class TestInitialiseRegistration(unittest.TestCase):
    def setUp(self):
        self.registration = Registration(
            Reg_ID="1",
            Course_ID="1",
            Staff_ID="999997",
            Reg_Status="Active",
            Completion_Status="Not Completed")

    def test_to_dict(self):
        self.assertEqual(self.registration.to_dict(), {
            "Reg_ID": "1",
            "Course_ID": "1",
            "Staff_ID": "999997",
            "Reg_Status": "Active",
            "Completion_Status": "Not Completed"
        }
        )

# Test Initialise Skill
class TestInitialiseSkill(unittest.TestCase):
    def setUp(self):
        self.skill = Skill(
            Skill_ID="1",
            Skill_name="Test Skill",)

    def test_to_dict(self):
        self.assertEqual(self.skill.to_dict(), {
            "Skill_ID": "1",
            "Skill_name": "Test Skill"
        }
        )

if __name__ == "__main__":
    unittest.main()


