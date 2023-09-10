-- Course
INSERT INTO `ljps_db`.`course` (`Course_ID`, `Course_Name`, `Course_Desc`, `Course_Status`, `Course_Type`, `Course_Category`) VALUES ('COR001', 'Course Name #1', 'Handsome Caleb Course # 1', 'Active', 'Internal', 'Core');
INSERT INTO `ljps_db`.`course` (`Course_ID`, `Course_Name`, `Course_Desc`, `Course_Status`, `Course_Type`, `Course_Category`) VALUES ('COR002', 'Course Name #2', 'Handsome Caleb Course # 2', 'Active', 'Internal', 'Core');
INSERT INTO `ljps_db`.`course` (`Course_ID`, `Course_Name`, `Course_Desc`, `Course_Status`, `Course_Type`, `Course_Category`) VALUES ('COR003', 'Course Name #3', 'Handsome Caleb Course # 3', 'Active', 'Internal', 'Core');
INSERT INTO `ljps_db`.`course` (`Course_ID`, `Course_Name`, `Course_Desc`, `Course_Status`, `Course_Type`, `Course_Category`) VALUES ('COR004', 'Course Name #4', 'Handsome Caleb Course # 4', 'Active', 'Internal', 'Core');
INSERT INTO `ljps_db`.`course` (`Course_ID`, `Course_Name`, `Course_Desc`, `Course_Status`, `Course_Type`, `Course_Category`) VALUES ('COR005', 'Course Name #5', 'Handsome Caleb Course # 5', 'Pending', 'Internal', 'Core');

-- Skill
INSERT INTO `ljps_db`.`skill` (`Skill_ID`, `Skill_name`) VALUES ('1', 'skill#1');
INSERT INTO `ljps_db`.`skill` (`Skill_ID`, `Skill_name`) VALUES ('2', 'skill#2');
INSERT INTO `ljps_db`.`skill` (`Skill_ID`, `Skill_name`) VALUES ('3', 'skill#3');
INSERT INTO `ljps_db`.`skill` (`Skill_ID`, `Skill_name`) VALUES ('4', 'skill#4');
INSERT INTO `ljps_db`.`skill` (`Skill_ID`, `Skill_name`) VALUES ('5', 'skill#5');
INSERT INTO `ljps_db`.`skill` (`Skill_ID`, `Skill_name`) VALUES ('6', 'skill#6');

-- CourseSkill
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('1', 'COR001', '1');
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('2', 'COR001', '2');
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('3', 'COR001', '3');
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('4', 'COR002', '2');
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('5', 'COR002', '3');
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('6', 'COR003', '4');
INSERT INTO `ljps_db`.`courseskills` (`CourseSkill_ID`, `Course_ID`, `Skill_ID`) VALUES ('7', 'COR003', '5');

-- Role
INSERT INTO `ljps_db`.`role` (`Role_ID`, `Role_name`) VALUES ('1', 'Admin');
INSERT INTO `ljps_db`.`role` (`Role_ID`, `Role_name`) VALUES ('2', 'User');
INSERT INTO `ljps_db`.`role` (`Role_ID`, `Role_name`) VALUES ('3', 'Manager');
INSERT INTO `ljps_db`.`role` (`Role_ID`, `Role_name`) VALUES ('4', 'Trainer');


-- staff
INSERT INTO `ljps_db`.`staff` (`Staff_ID`, `Staff_FName`, `Staff_LName`, `Dept`, `Email`, `Role`) VALUES ('130001', 'Caleb', 'Cheong', 'Sales', 'caleb@allinone.com', '2');
INSERT INTO `ljps_db`.`staff` (`Staff_ID`, `Staff_FName`, `Staff_LName`, `Dept`, `Email`, `Role`) VALUES ('130002', 'Rou', 'Cheong', 'Sales', 'rou@allinone.com', '1');
INSERT INTO `ljps_db`.`staff` (`Staff_ID`, `Staff_FName`, `Staff_LName`, `Dept`, `Email`, `Role`) VALUES ('130003', 'Gerald', 'Cheong', 'Accounting', 'noob@allinone.sg', '3');


-- Registration
INSERT INTO `ljps_db`.`registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES ('1', 'COR001', '130001', 'Registered', 'Completed');
INSERT INTO `ljps_db`.`registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES ('2', 'COR001', '130002', 'Registered', 'Completed');
INSERT INTO `ljps_db`.`registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES ('3', 'COR001', '130003', 'Registered', 'Completed');
INSERT INTO `ljps_db`.`registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES ('4', 'COR002', '130001', 'Registered', 'Completed');
INSERT INTO `ljps_db`.`registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES ('5', 'COR002', '130002', 'Registered', 'Completed');



-- Job
INSERT INTO `ljps_db`.`job` (`Job_ID`, `JobName`) VALUES ('1', 'Sales Person');
INSERT INTO `ljps_db`.`job` (`Job_ID`, `JobName`) VALUES ('2', 'Project Owner');
INSERT INTO `ljps_db`.`job` (`Job_ID`, `JobName`) VALUES ('3', 'Team Manager');
INSERT INTO `ljps_db`.`job` (`Job_ID`, `JobName`) VALUES ('4', 'Data Analytis');
INSERT INTO `ljps_db`.`job` (`Job_ID`, `JobName`) VALUES ('5', 'Software Engineer');

-- LearningJourney
INSERT INTO `ljps_db`.`learningjourneys` (`LearningJounery_ID`, `Job_ID`, `Staff_ID`,`Status`) VALUES ('1', '1', '130001','Completed');
INSERT INTO `ljps_db`.`learningjourneys` (`LearningJounery_ID`, `Job_ID`, `Staff_ID`,`Status`) VALUES ('2', '2', '130001','Completed');
INSERT INTO `ljps_db`.`learningjourneys` (`LearningJounery_ID`, `Job_ID`, `Staff_ID`,`Status`) VALUES ('3', '4', '130002','Completed');
INSERT INTO `ljps_db`.`learningjourneys` (`LearningJounery_ID`, `Job_ID`, `Staff_ID`,`Status`) VALUES ('4', '5', '130003','Completed');

-- jobskills
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('1', '1', '1');
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('2', '2', '2');
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('3', '3', '3');
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('4', '4', '4');
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('5', '5', '5');
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('6', '1', '6');
INSERT INTO `ljps_db`.`jobskills` (`JobSkill_ID`, `Job_ID`, `Skill_ID`) VALUES ('7', '2', '1');


-- learningjournerycourses
INSERT INTO `ljps_db`.`learningjourneycourses` (`LearningJouneryCourses_ID`, `LearningJounery_ID`, `Course_ID`) VALUES ('1', '1', 'COR001');
INSERT INTO `ljps_db`.`learningjourneycourses` (`LearningJouneryCourses_ID`, `LearningJounery_ID`, `Course_ID`) VALUES ('2', '1', 'COR002');
INSERT INTO `ljps_db`.`learningjourneycourses` (`LearningJouneryCourses_ID`, `LearningJounery_ID`, `Course_ID`) VALUES ('3', '2', 'COR001');
