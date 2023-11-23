import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, } from "@fortawesome/free-solid-svg-icons";
import { faWifi, faSignal, faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { Popup } from "../PopUp/Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoList } from "./TodoList";
import moment from "moment";
export const Todo = () => {
        const currentDate = new Date().toISOString().slice(0, 16);

    const [popupModal, setpopupModal] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date());
    const [editIndexField, setEditIndexField] = useState(-1)
    const [inputVal, setInputVal] = useState({
        item: "",
        isCompleted: false,
        dateTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        taskColor: ""
    })
    const [showItems, setShowItems] = useState([])

    const togglepopupModal = () => {
        setInputVal({
            ...inputVal,
            dateTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        });
        setpopupModal(!popupModal)
    }
    useEffect(() => {
        const currentTime = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(currentTime);
    }, []);

    return (
        <div className="mt-5 container bg-white text-white border rounded" style={{ width: "65vh", height: "100vh" }}>
            <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                <div className="text-center">
                    <h6 className="m-auto text-dark ml-3 font-weight-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between" style={{ width: "10vh" }}>
                    <FontAwesomeIcon icon={faSignal} className="text-dark mr-2" />
                    <FontAwesomeIcon icon={faWifi} className="text-dark mr-2" style={{ fontWeight: 'bold' }} />
                    <FontAwesomeIcon icon={faBatteryFull} className="text-dark" size="lg" />
                </div>
            </div>
            <div className="text-dark mt-4 d-flex align-items-center justify-content-between px-2">
                <h2 className="font-weight-bold">Today</h2>
                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#337eff", }} size="2xl" onClick={togglepopupModal} />
            </div>
            <div className="px-2">
                {popupModal && (<Popup popupModal={popupModal} setpopupModal={setpopupModal} inputVal={inputVal} setInputVal={setInputVal} showItems={showItems} setShowItems={setShowItems} editIndexField={editIndexField} setEditIndexField={setEditIndexField} className="m-0" />)}
                <TodoList showItems={showItems} setShowItems={setShowItems} popupModal={popupModal} setpopupModal={setpopupModal} inputVal={inputVal} setInputVal={setInputVal} editIndexField={editIndexField} setEditIndexField={setEditIndexField} />
            </div>
            <ToastContainer />
        </div>
    )
}