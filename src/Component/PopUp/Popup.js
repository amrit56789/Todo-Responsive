import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
export const Popup = ({ popupModal, setpopupModal, inputVal, setInputVal, showItems, setShowItems, editIndexField, setEditIndexField }) => {
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputVal.item.trim() === "") {
            setError("Please enter a text.");
            return;
        }
        if (editIndexField >= 0) {
            let color = "purpleDot"
            const updatedItems = [...showItems];
            updatedItems.splice(editIndexField, 1, { item: inputVal.item, dateTime: inputVal.dateTime, taskColor : color });
            setShowItems(updatedItems);
            setInputVal({
                item: "",
            });
            setEditIndexField(-1);
        } else {
            setShowItems([...showItems, inputVal]);
            setInputVal({
                item: "",
            });
            setError(false);
        }
        setpopupModal(false)

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        let color = "";
        const selectedDate = moment(inputVal.dateTime).format("YYYY-MM-DD")
        const currentDate = moment(new Date()).format("YYYY-MM-DD")
        if (moment(selectedDate).isSameOrAfter(currentDate, 'day')) {
            color = "purpleDot";
        } else {
            color = "red";
        }
        setInputVal((previousData) => {
            return {
                ...previousData,
                [name]: value,
                isCompleted: false,
                taskColor: color,
            };
        });
        setError(false)
    }


    return (
        <div className="modal-dialog modal-dialog-start" >
            <div className="modal-content">
                <div className="d-flex flex-column align-items-start mx-3 mt-2">
                    <h4 className="text-dark font-weight-bold" id="exampleModalLabel">
                        Add Todo
                    </h4>
                    <form className="w-100 mt-3">
                        <div
                            className="form-group row"
                            style={{ marginBottom: "0.5rem" }}
                        >
                            <div className="col-2xl-8">
                                <textarea
                                    className="form-control form-control-lg form-control-solid"
                                    rows="8"
                                    style={{ resize: "none", fontSize: "1.2rem" }}
                                    id="item" name="item" value={inputVal.item}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            {error && (
                                <div className="text-danger">
                                    {error}
                                </div>
                            )}
                            <div className="col-sm-8 my-2">
                                <input className="px-2 border rounded"
                                    type="datetime-local"
                                    id="dateTime"
                                    name="dateTime"
                                    value={inputVal.dateTime}
                                    onChange={handleChange}
                                    min={inputVal.dateTime}
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3 mt-2">
                            <button className="font-weight-bold btn btn-light border-0 text-primary" onClick={() => setpopupModal(false)}>Cancel</button>
                            <button className="font-weight-bold btn btn-light border-0 text-primary" onClick={handleSubmit}>Done</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}