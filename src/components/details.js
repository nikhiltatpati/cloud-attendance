import React from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";

function getTime(time) {
  if (!time) {
    return "";
  }
  const tarr = time.split("-");
  return tarr[0] + "hr " + tarr[1] + "min " + tarr[2] + "sec ";
}

const Details = ({ history }) => {
  const { id } = useParams("id");
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const employeesRef = firebase.database().ref("employees");
    employeesRef.on("value", (snapshot) => {
      let employees = snapshot.val();
      let newState = [];
      for (let item in employees) {
        if (employees[item].id == id) {
          setData({
            itemId: item,
            id: employees[item].id,
            name: employees[item].name,
            rem: employees[item].rem,
            totalWorkTime: employees[item].totalWorkTime,
            logs: employees[item].logs ?? [],
          });
        }
      }
    });
  }, []);

  if (data) {
    return (
      <div className="flex flex-col bg-dark items-center justify-center h-full p-7">
        <h1 className=" m-3 text-white">Total Work Time</h1>
        <h1 className="font-bold text-lg text-white">{data.totalWorkTime}</h1>
        <div className="bg-primary rounded-lg shadow-md w-full m-6 p-6">
          <div className="font-bold my-4 text-white">Logs :</div>
          {data.logs.map((item) => {
            return (
              <div className="bg-secondary rounded-lg shadow-md w-full p-2 my-3">
                <div>
                  <span className=" text-white">Date : </span>
                  <span className="font-bold text-white">{item.date}</span>
                </div>
                <div>
                  <span className=" text-white">Entry Time : </span>
                  <span className="font-bold text-white">
                    {" "}
                    {getTime(item.entry)}
                  </span>
                </div>
                <div>
                  <span className=" text-white">Exit Time : </span>
                  <span className="font-bold text-white">
                    {" "}
                    {getTime(item.exit)}
                  </span>
                </div>
                <div>
                  <span className=" text-white">Hours Worked :</span>
                  <span className="font-bold text-white">
                    {" "}
                    {item.totalTime}
                  </span>
                </div>

                {item.workDone && (
                  <div>
                    <span className=" text-white">Work Done:</span>
                    <span className="font-bold text-white">
                      {" "}
                      <div className="bg-dark m-2 p-2 rounded-lg">
                        {item.workDone ?? ``}
                      </div>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Details;
