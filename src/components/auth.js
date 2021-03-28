import React from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";

const Auth = ({ history }) => {
  const { role } = useParams("role");
  const [employees, setEmployees] = React.useState([]);

  function handleAdminSubmit(event) {
    event.preventDefault();
    if (
      event.target[0].value === "admin" &&
      event.target[1].value === "admin"
    ) {
      history.push("/dashboard");
      localStorage.setItem("role", "admin");
      window.location.reload();
    } else {
      window.alert("Not Valid");
    }
  }

  React.useEffect(() => {
    const employeesRef = firebase.database().ref("employees");
    employeesRef.on("value", (snapshot) => {
      let employees = snapshot.val();
      let newState = [];
      for (let item in employees) {
        newState.push({
          id: employees[item].id,
          name: employees[item].name,
          totalWorkTime: employees[item].totalWorkTime,
          logs: employees[item].logs,
        });
      }
      setEmployees(newState);
    });
  }, []);

  function handleEmployeeSubmit(event) {
    event.preventDefault();
    if (event.target[0].value !== event.target[1].value) {
      window.alert("Invalid Credentials");
      return;
    }
    const res = employees.filter((item) => item.id === event.target[0].value);
    if (res.length > 0) {
      localStorage.setItem("role", "employee");
      localStorage.setItem("id", event.target[0].value);
      history.push(`/attendance/${event.target[0].value}`);
      window.location.reload();
    }
  }

  return (
    <>
      {role === "admin" && (
        <section className="App h-screen w-full flex flex-col justify-center items-center bg-dark">
          <h1 className="m-4 font-bold text-white">Admin Login</h1>
          <div className="w-full max-w-md bg-gray-800">
            <form
              onSubmit={handleAdminSubmit}
              className=" bg-secondary shadow-md rounded px-8 py-8 pt-8"
            >
              <div className="px-4 pb-4">
                <label
                  htmlFor="username"
                  className="text-sm block font-bold pb-2 text-white"
                >
                  USERNAME
                </label>
                <input
                  type="username"
                  name="username"
                  id=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                  placeholder="admin"
                />
              </div>
              <div className="px-4 pb-4">
                <label
                  htmlFor="password"
                  className="text-sm block font-bold pb-2 text-white"
                >
                  PASSWORD
                </label>
                <input
                  name="username"
                  id=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <button
                  className="bg-light hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {role === "employee" && (
        <section className="App h-screen w-full flex flex-col justify-center items-center bg-dark">
          <h1 className="m-4 font-bold text-white">Employee Login</h1>
          <div className="w-full max-w-md bg-gray-800">
            <form
              onSubmit={handleEmployeeSubmit}
              className=" bg-secondary shadow-md rounded-lg px-8 py-8 pt-8"
            >
              <div className="px-4 pb-4">
                <label
                  htmlFor="username"
                  className="text-sm block font-bold pb-2 text-white"
                >
                  USERNAME
                </label>
                <input
                  type="username"
                  name="username"
                  id=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                  placeholder="101759"
                />
              </div>
              <div className="px-4 pb-4">
                <label
                  htmlFor="password"
                  className="text-sm block font-bold pb-2 text-white"
                >
                  PASSWORD
                </label>
                <input
                  name="password"
                  id=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <button
                  className="bg-light hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Auth;
