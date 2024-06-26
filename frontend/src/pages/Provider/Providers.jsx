import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import img from "./profile.png";
import axios from "axios";
import { addAppointment } from "../../Service/Redux/Slice/Appointment";
import { updateSchedules } from "../../Service/Redux/Slice/Schedules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [schedules, setSchedules] = useState("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const dispatch = useDispatch();
  const navigat = useNavigate();

  const { providerId, token } = useSelector((state) => ({
    providerId: state.providerId.providerId,
    token: state.auth.token,
  }));
  const getNotBookedSchedule = () => {
    axios
      .get(`http://localhost:5000/schedule/notBooked/${providerId.users_id}`)
      .then((result) => {
        // console.log(result.data);
        setSchedules(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
   // **************for notification************************
 const notifySucc = () =>
  toast.success("Approved Appointment", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

const notifyErr = () =>
  toast.error("Reject Appointment", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
// *****************************************
  useEffect(() => {
    getNotBookedSchedule();
  }, [schedules]);
  // console.log(schedules);
  // console.log(providerId.users_id);

  return (<><ToastContainer />
    <div>
      {providerId && (
        <div id="cards">
          <img id="avatars" src={img} alt="avatar" />
          <div id="infos">
            <p id="names">
              {" "}
              {providerId.firstname} {providerId.lastname}
            </p>
            <p id="activitys"> </p>
            <div id="statss">
              <p className="stats-texts">
                <span>📞</span>
                {providerId.phone}
              </p>
              <p className="stats-texts">
                <span>📧</span>
                {providerId.email}
              </p>
            </div>
            <p
              id="btns"
              onClick={() => {
                navigat("/review");
                setShow(true);
              }}
            >
              Reviews
            </p>
            <>{show ? <div> review</div> : <></>}</>
            <p
              id="btns"
              onDoubleClick={() => {
                setShow1(false);
              }}
              onClick={() => {
                setShow1(true);
              }}
            >
              Schedule
            </p>
            <>
              {show1 ? (
                <div>
                  {" "}
                  {schedules &&
                    schedules.map((schedule, i) => {
                      return (
                        <div key={i}>
                          <button
                            onClick={() => {
                              setDate(schedule.date);
                              setTimeFrom(schedule.timefrom);
                              setTimeTo(schedule.timeto);
                              try {
                                const result = axios.post(
                                  `http://localhost:5000/appointment/${providerId.users_id}`,
                                  { date, timeFrom, timeTo },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                if (result) {
                                  console.log(result);
                                  dispatch(addAppointment(result.data.result));

                                  setMessage("Appointment added successfully.");
                                } else {
                                  setMessage("Failed to add Appointment.");
                                }
                              } catch (error) {
                                console.log(error);
                                notifySucc()
                                // setMessage(
                                //   "Error happened while creating appointment, please try again."
                                // );
                              }
                              try {
                                const result = axios.put(
                                  `http://localhost:5000/schedule/update/${schedule.schedule_id}`,
                                  { booked: true },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                if (result.data.success) {
                                  dispatch(updateSchedules(result.data.result));
                                  // console.log(result.data.result);
                                  setMessage(
                                    "Appointment updeted successfully."
                                  );
                                } else {
                                  setMessage("Failed to updete Appointment.");
                                }
                              } catch (error) {
                                console.log(error);
                                setMessage(
                                  "Error happened while creating Appointment, please try again."
                                );
                              }
                            }}
                          >
                            {schedule.date.split("T")[0]} - {schedule.timefrom}{" "}
                            - {schedule.timeto}
                          </button>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
      )}
      {/* {message && <div className="message">{message}</div>} */}
    </div></>
  );
}
