import React from "react";

const Home = ({ history }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark">
      <h1 className="font-bold text-5 text-white">
        Welcome To Cloud Attendance Management System
      </h1>
      <div className="p-6 m-4">
        <button
          className="bg-light rounded-lg text-white p-4 m-2"
          onClick={() => {
            history.push("/auth/employee");
          }}
        >
          Employee Login
        </button>

        <button
          className="bg-light rounded-lg text-white p-4 m-2"
          onClick={() => {
            history.push("/auth/admin");
          }}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default Home;
