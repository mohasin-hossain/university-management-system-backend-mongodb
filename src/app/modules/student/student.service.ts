import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(studentData); // Builtin static method

  // For instance methods
  //   const student = new Student(studentData); // Create an instance

  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists!');
  //   }

  //   const result = await student.save(); // Builtin instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
