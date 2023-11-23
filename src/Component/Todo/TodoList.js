import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const TodoList = ({ showItems, setShowItems, popupModal, setpopupModal, inputVal, setInputVal, editIndexField, setEditIndexField }) => {
    const handleCheckBox = (currentIndex) => {
        let data = [...showItems]
        data[currentIndex].isComplete = !data[currentIndex].isComplete
        setShowItems([...data])
    }

    const deleteItem = (index) => {
        const updateItem = showItems.filter((element, ind) => {
            return index !== ind;
        });
        setShowItems(updateItem);
    }

    const handleeditIndexFieldChange = (element, index) => {
        let color = ""
        const selectedDate = moment(inputVal.dateTime).format("YYYY-MM-DD")
        const currentDate = moment(new Date()).format("YYYY-MM-DD")
        if (moment(selectedDate).isSameOrAfter(currentDate, 'day')) {
            color = "purpleDot";
        } else {
            color = "red";
        }
        setpopupModal(true)
        setInputVal({ item: element.item, dateTime: element.dateTime, taskColor: color })
        setEditIndexField(index)
    }
    return (
        <div className="showItems">
            {showItems.map((element, index) => {
                const dotColor = element.isComplete ? "#ffcc66" :
                    element.taskColor === "purpleDot" ? "#ff66ff" :
                        element.taskColor === "red" ? "#ff0000" : "";
                return (
                    <div key={index} className="container-md py-2 mt-4 d-flex flex-row justify-content-between align-items-center text-center border-bottom text-dark">
                        <div className="d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={element.isComplete} onChange={() => handleCheckBox(index)} style={{ borderRadius: "20px", fontSize: "1.5rem" }} />
                            </div>
                            <div className="item px-2 m-0" style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: "1.2rem", textAlign: "justify" }}>
                                <p className="m-0">{element.item}</p>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faClock} className="text-dark" style={{ marginRight: "4px" }} size="xs" />
                                    <h6 className="m-0" style={{ fontSize: "0.7rem", color: "#F363CA" }}>{moment(element.dateTime).format("YYYY-MM-DD HH:mm")}</h6>
                                </div>

                            </div>

                        </div>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faTrash} className="text-dark" style={{ marginRight: "12px" }} size="lg" onClick={() => deleteItem(index)} />
                            <FontAwesomeIcon icon={faPenToSquare} className="text-dark" style={{ marginRight: "12px" }} size="lg" onClick={() => handleeditIndexFieldChange(element, index)} />
                            <span className="" style={{ width: "20px", height: "20px", backgroundColor: moment(element.dateTime).isBefore(new Date(), 'minute') ? "#ff0000" : dotColor, borderRadius: "10px" }}></span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}