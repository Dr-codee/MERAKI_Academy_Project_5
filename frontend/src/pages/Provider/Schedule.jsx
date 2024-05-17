import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";
import {
  updateSchedules,
  setSchedules,
  addSchedules,
} from "../../Service/Redux/Slice/Schedules";
import Table from "react-bootstrap/Table";

function Schedule() {
  const dispatch = useDispatch();
  const [data, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const { schedules } = useSelector((state) => ({
    schedules: state.schedules.schedules,
  }));
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  const getSchedule = () => {
    axios
      .get(`http://localhost:5000/schedule/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setSchedules(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSchedule();
  }, []);
  console.log(schedules);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time From</th>
            <th>Time To</th>
            <th>Booked</th>
            <th>Delete</th>
          </tr>{" "}
        </thead>
        {schedules &&
          schedules.map((schedule, index) => {
            return (
              <tbody>
                <tr>
                  <td>{schedule.date}</td>
                  <td>{schedule.timefrom}</td>
                  <td>{schedule.timeto}</td>
                  <td>{schedule.status}</td>
                  <td
                    onClick={() => {
                      axios
                        .put(
                          `http://localhost:5000/schedule/delete/${schedule.schedule_id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          console.log(result.data.result);
                          dispatch(updateSchedules(schedule.schedule_id));
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    ❌
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>

      <button
        onClick={() => {
          axios
            .post(`http://localhost:5000/schedule/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data,
              timeFrom,
              timeTo,
            })
            .then((result) => {
              console.log(result.data.result);
              dispatch(addSchedules(result.data.result));
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Add New Schedule
      </button>
      <div className="Form">
        <form>
          <label> Date </label>
          <input
            type="date"
            placeholder="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <label> TimeFrom </label>
          <input
            type="time"
            placeholder="timeFrom"
            onChange={(e) => setTimeFrom(e.target.value)}
          ></input>
          <br />
          <label> Time To </label>
          <input
            type="time"
            placeholder="timeTo"
            onChange={(e) => {
              setTimeTo(e.target.value)}}
          />
        </form>
      </div>
    </div>
  );
}

export default Schedule;