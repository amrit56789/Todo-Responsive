import React from "react";
import { useState } from "react";

export const Popup = ({ popupModal, setpopupModal, inputVal, setInputVal, showItems, setShowItems }) => {
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputVal.item.trim() === "") {
            setError("Please enter a text.");
            return;
        }
        setShowItems([...showItems, inputVal]);
        setInputVal({ item: "" });
        setError(false);
        setpopupModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputVal((previousData) => {
            return { ...previousData, [name]: value }
        })
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
                        </div>
                        {error && (
                            <div className="text-danger">
                                {error}
                            </div>
                        )}
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