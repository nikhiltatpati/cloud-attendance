import React from "react";
import firebase from "../firebase.js";

const AddEmployee = ({ history }) => {
  function handleFormSubmit(event) {
    event.preventDefault();

    const employeeRef = firebase.database().ref("employees");
    const employee = {
      id: event.target[1].value,
      name: event.target[0].value,
      totalWorkTime: "0 Days 0 Hours 0 Minutes 0 Seconds",
      rem: false,
    };

    employeeRef.push(employee);
    history.push("/dashboard");
  }
  return (
    <section className="App h-screen w-full flex justify-center items-center bg-dark">
      <div className="w-full max-w-md ">
        <form
          action=""
          className="shadow-md rounded-lg px-8 py-8 pt-8 bg-secondary"
          onSubmit={handleFormSubmit}
        >
          <div className="px-4 pb-4">
            <label
              htmlFor="email"
              className="text-sm block font-bold text-white pb-2"
            >
              Employee Name
            </label>
            <input
              name="name"
              id=""
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Enter Employee Name"
            />
          </div>
          <div className="px-4 pb-4">
            <label
              htmlFor="password"
              className="text-sm block font-bold pb-2 text-white"
            >
              Employee ID
            </label>
            <input
              name="ID number"
              id=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter Employee ID number"
            />
          </div>
          <div>
            <button
              className="bg-light hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddEmployee;
