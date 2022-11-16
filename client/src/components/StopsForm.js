import React, { useState } from "react";
import MarkerTable from "./MarkerTable";


const BLANK_ADDRESS_FORM = {
    title: "",
    address: ""
  };


function StopsForm(props){
  const [address, setAddress] = useState (BLANK_ADDRESS_FORM)

  function handleChange2(event){
    let { name, value } = event.target;
    setAddress (data => ({...data, [name]: value}));
}

  function handleSubmit(event) {
    event.preventDefault()
    props.addMarkerCb(address);
    console.log(address);
    setAddress(BLANK_ADDRESS_FORM);
}


return (
<div className="StopsForm" > 
    <h1> Add Your Stops </h1>
    <form onSubmit={handleSubmit}> 
        <div className="row"> 
        <div className="col">
            <label for="stopstitleinput" class="form-label">Stop Name</label>
            <input
            type="text"
            className="form-control"
            name="title"
            value={address.title}
            onChange={handleChange2}
            />
        </div>
        <div className="col">
            <label for="stopstitleinput" class="form-label">Address</label>
            <input
            type="text"
            className="form-control"
            name="address"
            value={address.address}
            onChange={handleChange2}
            />
        </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Stop</button>

    <div className="mapEr">
    <MarkerTable places={props.places} />
    </div>

    </form>
</div>

)
};
export default StopsForm;