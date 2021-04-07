import React from "react";
import firebase from "../firebase";

const Dashboard = ({ history }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const employeesRef = firebase.database().ref("employees");
    employeesRef.on("value", (snapshot) => {
      let employees = snapshot.val();
      let newState = [];
      for (let item in employees) {
        newState.push({
          itemId: employees[item].itemId,
          id: employees[item].id,
          name: employees[item].name,
          totalWorkTime: employees[item].totalWorkTime,
          logs: employees[item].logs,
        });
      }
      setData(newState);
    });
  }, []);

  return (
    <div>
      <div className="top-0 sticky">
        <div className="text-right">
          <button
            className="p-4 bg-light rounded-lg shadow-lg m-2 text-white"
            onClick={() => {
              window.localStorage.removeItem("role");
              window.localStorage.removeItem("id");
              history.push("/");
              window.location.reload();
            }}
          >
            Logout
          </button>
          <button
            className="p-4 bg-light rounded-lg shadow-lg m-2 text-white"
            onClick={() => {
              history.push("/add");
            }}
          >
            Add Employee
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center bg-dark p-10 h-full">
        <div className="bg-primary rounded-lg shadow-md m-6 p-6">
          <div className="font-bold my-4 text-white overflow-auto">Logs :</div>
          {data.map((item) => {
            return (
              <div className="bg-secondary rounded-lg shadow-md w-full p-2 my-3">
                <div>
                  <span className=" text-white">Employee Name :</span>
                  <span className="font-bold text-white"> {item.name}</span>
                </div>
                <div>
                  <span className=" text-white">Employee ID : </span>
                  <span className="font-bold text-white"> {item.id}</span>
                </div>
                <div>
                  <span className=" text-white">Total Time Worked :</span>
                  <span className="font-bold text-white">
                    {` ${item.totalWorkTime}`}
                  </span>
                </div>
                <button
                  className="rounded-lg bg-light text-white shadow-md my-2 p-2"
                  onClick={() => {
                    history.push(`/details/${item.id}`);
                  }}
                >
                  More Info
                </button>

                <button
                  className="rounded-lg bg-dark text-white shadow-md mx-2 p-2"
                  onClick={() => {
                    const itemsRef = firebase.database().ref("employees/");
                    itemsRef.on("value", (snapshot) => {
                      let emps = snapshot.val();
                      for (let emp in emps) {
                        if (emps[emp].id == item.id) {
                          firebase
                            .database()
                            .ref("employees/" + emp)
                            .remove();
                        }
                      }
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
