import React from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";

function timeDiff(tstart, tend) {
  var diff = Math.floor((tend - tstart) / 1000),
    units = [
      { d: 60, l: "Seconds" },
      { d: 60, l: "Minutes" },
      { d: 24, l: "Hours" },
      { d: 7, l: "Days" },
    ];

  var s = "";
  for (var i = 0; i < units.length; ++i) {
    s = (diff % units[i].d) + " " + units[i].l + " " + s;
    diff = Math.floor(diff / units[i].d);
  }
  return s;
}

function updateTotalWorkTime(stime, etime) {
  let rarr = [];
  let sarr = stime.split(" ");
  let earr = etime.split(" ");
  rarr[0] = (parseInt(sarr[0]) + parseInt(earr[0])).toString();
  rarr[1] = sarr[1];
  rarr[2] = (parseInt(sarr[2]) + parseInt(earr[2])).toString();
  rarr[3] = sarr[3];
  rarr[4] = (parseInt(sarr[4]) + parseInt(earr[4])).toString();
  rarr[5] = sarr[5];
  rarr[6] = (parseInt(sarr[6]) + parseInt(earr[6])).toString();
  rarr[7] = sarr[7];
  return rarr.join(" ");
}

const Attendance = ({ history }) => {
  const [show, setShow] = React.useState(false);
  const { id } = useParams("id");
  const [data, setData] = React.useState({});
  const [rem, setRem] = React.useState(false);

  function handleEntryClick() {
    const date = new Date();
    const today =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const timestamp = +new Date();
    const time =
      date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    const log = {
      date: today,
      entry: time,
      exit: "",
      in_time: timestamp,
      out_time: "",
      totalTime: "",
    };
    setData({ ...data, logs: [...data.logs, log] });
    setRem(true);
    writeEmployeeData(log, data);
  }

  function handleExitClick() {
    const date = new Date();
    const timestamp = +new Date();

    const time =
      date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();

    const currentData = data.logs.pop();
    const timeDifference = timeDiff(currentData.in_time, timestamp);

    const log = {
      date: currentData.date,
      entry: currentData.entry,
      exit: time,
      in_time: currentData.in_time,
      out_time: timestamp,
      totalTime: timeDifference,
    };
    setRem(false);

    setData({
      ...data,
      totalWorkTime: updateTotalWorkTime(data.totalWorkTime, timeDifference),
      rem: false,
      logs: [...data.logs, log],
    });
    firebase
      .database()
      .ref("employees/" + data.itemId)
      .set({
        ...data,
        totalWorkTime: updateTotalWorkTime(data.totalWorkTime, timeDifference),
        rem: false,
        logs: [...data.logs, log],
      });
  }

  if (show) {
    window.setTimeout(() => {
      setShow(false);
    }, 2000);
  }

  function writeEmployeeData(log, data) {
    let res;
    if (data.logs) {
      res = data.logs;
    } else {
      res = [];
    }
    firebase
      .database()
      .ref("employees/" + data.itemId)
      .set({
        id: data.id,
        name: data.name,
        totalWorkTime: data.totalWorkTime,
        rem: true,
        logs: [...res, log],
      });
  }

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
          setRem(employees[item].rem);
        }
      }
    });
  }, []);


  return (
    <div className="bg-dark">
      <div className="flex flex-row-reverse">
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
          className="bg-light text-white rounded-lg shadow-lg p-4 m-2"
          onClick={() => {
            history.push(`/details/${localStorage.getItem("id")}`);
          }}
        >
          View Details
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-5 text-white">
          Welcome To Cloud Attendance Management System
        </h1>
        <div className="p-6 m-4">
          {!rem && (
            <button
              className="bg-light rounded-lg text-white p-4 m-2"
              onClick={handleEntryClick}
            >
              Mark Today's Entry Attendance
            </button>
          )}
          {rem && (
            <button
              className="bg-secondary rounded-lg text-white p-4 m-2"
              onClick={handleExitClick}
            >
              Mark Today's Exit Attendance
            </button>
          )}
        </div>
        {show && (
          <div className="bg-green-600 text-white rounded-lg p-6">Success</div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
