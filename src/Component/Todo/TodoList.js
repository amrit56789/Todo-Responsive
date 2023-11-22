export const TodoList = ({ showItems, setShowItems }) => {
    const handleCheckBox = (currentIndex) => {
        let data = [...showItems]
        data[currentIndex].isComplete = !data[currentIndex].isComplete
        setShowItems([...data])
    }
    return (
        <div className="showItems">
            {showItems.map((element, index) => {
                return (
                    <div key={index} className="container-md py-2 mt-4 d-flex flex-row justify-content-between align-items-center text-center text-dark">
                        <div className="d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={element.isComplete} onChange={() => handleCheckBox(index)} style={{borderRadius : "20px", fontSize:"1.5rem"}}/>
                            </div>
                            <div className="item px-2 m-0" style={{fontFamily:"Poppins", fontWeight:"600", fontSize:"1.2rem", textAlign:"justify"}}>
                                <p className="m-0">{element.item}</p>
                            </div>
                            
                        </div>
                        <div className="d-flex align-items-center">
                            {element.isComplete ? <span className="" style={{width:"20px", height:"20px", backgroundColor:"#ffcc66", borderRadius:"10px"}}></span> : ''}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}