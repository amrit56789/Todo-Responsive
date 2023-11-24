import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
export const Popup = ({ popupModal, setpopupModal, inputVal, setInputVal, showItems, setShowItems, editIndexField, setEditIndexField }) => {
    const [error, setError] = useState(false)
    const [isDoneButtonDisabled, setDoneButtonDisabled] = useState(false);
    const currentDateAndTime = moment().format("YYYY-MM-DDTHH:mm");
    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputVal.item.trim() === "") {
            setError("Please enter a text.");
            setDoneButtonDisabled(true);
            return;
        }
        if (editIndexField >= 0) {
            const updatedItems = [...showItems];
            updatedItems.splice(editIndexField, 1, { item: inputVal.item, dateTime: inputVal.dateTime, taskColor: "purpleDot" });
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

        if (moment(value).isBefore(moment())) {
            setError("Please select a future date and time.");
            setDoneButtonDisabled(true);
            return;
        }

        const selectedDate = moment(inputVal.dateTime).format("YYYY-MM-DD")
        const currentDate = moment(new Date()).format("YYYY-MM-DD")
        const taskColor = moment(selectedDate).isSameOrAfter(currentDate, 'day') ? "purpleDot" : "red";

        setInputVal((previousData) => {
            return {
                ...previousData,
                [name]: value,
                isCompleted: false,
                taskColor,
            };
        });
        setError(false)
        setDoneButtonDisabled(false);
    }


    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Add Todo</h4>
                <form className="w-full">
                    <div className="mb-3">
                        <textarea
                            className="w-full px-3 py-2 border rounded-md resize-none text-md"
                            rows="8"
                            id="item" name="item" value={inputVal.item}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {error && (
                            <div className="text-red-500 mt-1">
                                {error}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <input
                            className="w-full px-3 py-2 border rounded-md"
                            type="datetime-local"
                            id="dateTime"
                            name="dateTime"
                            value={inputVal.dateTime}
                            onChange={handleChange}
                            min={currentDateAndTime}
                            required
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <button className="font-bold text-gray-500 px-4 py-2 border border-gray-300 rounded hover:bg-gray-200" onClick={() => setpopupModal(false)}>Cancel</button>
                        <button className={`font-bold text-gray-500 px-4 py-2 border border-gray-300 rounded ${isDoneButtonDisabled ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-200'}`} disabled={isDoneButtonDisabled} onClick={handleSubmit}>Done</button>
                    </div>
                </form>
            </div>
        </div>

    )
}