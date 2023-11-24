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
            color = "redDot";
        }
        setpopupModal(true)
        setInputVal({ item: element.item, dateTime: element.dateTime, taskColor: color })
        setEditIndexField(index)
    }
    return (
        <div className="text-start">
            {showItems.map((element, index) => {
                const dotColor = element.isComplete
                    ? "bg-yellow-300"
                    : element.taskColor === "purpleDot"
                        ? "bg-purple-500"
                        : element.taskColor === "redDot"
                            ? "bg-redDot-500"
                            : "";

                return (
                    <div
                        key={index}
                        className="container-md py-2 mt-4 flex flex-row justify-between items-center text-center border-b border-gray-400 text-gray-800"
                    >
                        <div className="flex items-center">
                            <div className="form-check">
                                <input
                                    className="w-5 h-5"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={element.isComplete}
                                    onChange={() => handleCheckBox(index)}
                                />
                            </div>
                            <div className="item font-semibold text-lg ml-4 text-center">
                                <p className="text-start">{element.item}</p>
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        className="text-gray-800 mr-2"
                                        size="xs"
                                    />
                                    <h6 className="m-0 text-xs text-pink-500">
                                        {moment(element.dateTime).format("YYYY-MM-DD HH:mm")}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="text-gray-800 mr-4 cursor-pointer"
                                size="lg"
                                onClick={() => deleteItem(index)}
                            />
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-gray-800 mr-4 cursor-pointer"
                                size="lg"
                                onClick={() => handleeditIndexFieldChange(element, index)}
                            />
                            <span
                                className={`w-5 h-5 rounded-full ${moment(element.dateTime).isBefore(
                                    new Date(),
                                    "minute"
                                ) ? "bg-redDot-500" : dotColor}`}
                            ></span>
                        </div>
                    </div>
                );
            })}
        </div>

    )
}