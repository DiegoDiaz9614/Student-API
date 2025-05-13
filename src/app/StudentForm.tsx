import React, { useState, useEffect } from 'react'

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

interface StudentFormProps {
  student: Student | null;
  onSubmit: (student: Omit<Student, "_id">, id?: string) => void;
}

const StudentForm = ({ student, onSubmit }: StudentFormProps) => {
  const [formState, setFormState] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    currentCollege: ""
  });

  useEffect(() => {
    if (student) {
      const { _id, ...rest } = student;
      setFormState(rest);
    } else {
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        currentCollege: ""
      });
    }
  }, [student]);

  const handleChange = (field: keyof Omit<Student, "_id">, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formState, student?._id);
  }

  return (
    <div className="bg-black text-white shadow-2xl p-8 rounded-lg border-2 border-gray-600">
      <h2 className="text-3xl font-bold mb-6 text-center">{student ? "Update Student" : "Add New Student"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <input
          type="text"
          placeholder="First Name"
          value={formState.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="border border-gray-600 bg-transparent text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="border border-gray-600 bg-transparent text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Age"
          value={formState.age}
          onChange={(e) => handleChange("age", Number(e.target.value))}
          className="border border-gray-600 bg-transparent text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Current College"
          value={formState.currentCollege}
          onChange={(e) => handleChange("currentCollege", e.target.value)}
          className="border border-gray-600 bg-transparent text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border border-gray-600 bg-transparent text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 rounded-lg w-full"
        />
      </div>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg w-full"
        onClick={handleSubmit}
      >
        {student ? "Update Student" : "Add New Student"}
      </button>
    </div>
  );
}

export default StudentForm;
