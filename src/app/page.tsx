"use client";

import { useEffect, useState } from 'react';
import StudentForm from "./StudentForm";
import { deleteStudent, fetchStudents, submitStudent } from './api/studentAPI';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

const StudentPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  //fetch all students
  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching Students", error);
    }
  };

  //submit student (add or update)
  const handleSubmit = async (student: Omit<Student, "_id">, id?: string) => {
    try {
      await submitStudent(student, id);
      setSelectedStudent(null);
      await loadStudents();
    } catch (error) {
      console.error("Error Submitting Student", error);
    }
  };

  // delete student by ID
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;
    try {
      await deleteStudent(id);
      await loadStudents();
    } catch (error) {
      console.error("Error Deleting Student", error);
    }
  };

  // initial data fetch
  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-black text-white">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">Students</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-2xl mb-12 bg-gray-900 border border-gray-600">
        <table className="min-w-full bg-transparent divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">First Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Last Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Current College</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-800">
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{student._id}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{student.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{student.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{student.age}</td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{student.currentCollege}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-3 text-sm"
                    onClick={() => setSelectedStudent(student)}>
                    Update
                  </button>

                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Form */}
      <StudentForm student={selectedStudent} onSubmit={handleSubmit} />
    </div>
  );
};

export default StudentPage;
