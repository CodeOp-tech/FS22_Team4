import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import Api from "../helpers/Api";
import { useParams } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
// import NewRoadTripView from "./NewRoadTripView";
// import PastFormView from "./PastFormView";
import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

const BLANK_STOP_PROFILE = {
  url: "",
  slogan: "",
};

function ProfileView(props) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  const [errorMsg, setErrorMsg] = useState("");
  const [roadtripDataUser, setRoadtripDataUser] = useState({});
  const [completedTrips1, setCompletedTrips1] = useState({});
  const [completedTrips2, setCompletedTrips2] = useState({});
  const [plannedTrips, setPlannedTrips] = useState({});
  const [descrip, setDescrip] = useState("");

  let { user_id } = useParams();

  useEffect(() => {
    fetchProfile();
    getRoadtripDataUser();
    //addDescrip();
  }, []);

  async function fetchProfile() {
    let myresponse = await Api.getUser(user_id);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
    } else {
      setUser(null);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  async function getRoadtripDataUser() {
    try {
      let response = await fetch(`/roadtrips/${user_id}`);
      console.log(response);
      if (response.ok) {
        let roadtripDataUser = await response.json();
        setRoadtripDataUser(roadtripDataUser);
        getCompletedTrips(roadtripDataUser);
        getPlannedTrips(roadtripDataUser);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "blue" }}>{errorMsg}</h2>;
  }
  if (!user) {
    return <h2>Loading...</h2>;
  }

  // async function addDescrip(formData) {
  //   let options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(descrip),
  //   };

  //   try {
  //     let response = await fetch(`/users/${user_id}`, options);
  //     if (response.ok) {
  //       let newDescrip = await response.json();
  //       // let roadtrip_id = newRoadtrip.id;
  //       setDescrip(newDescrip);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Network error: ${err.message}`);
  //   }
  // }

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(profileData);
    setProfileData(BLANK_STOP_PROFILE);
  }

  function getCompletedTrips(roadtrips) {
    let completedTrips = roadtrips.filter((el) => el.done === 1);
    setCompletedTrips1(completedTrips.slice(0, 3));
    setCompletedTrips2(completedTrips.slice(3));
  }

  function getPlannedTrips(roadtrips) {
    let plannedTrips = roadtrips.filter((el) => el.done === 0);
    setPlannedTrips(plannedTrips);
  }

  async function deleteRoadtrip(id) {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/roadtrips/delete/${id}`, options);
      console.log(id);
      if (response.ok) {
        getRoadtripDataUser();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // function deleteRoadtrip(id) {
  //   console.log(id);
  // }

  return (
    <div>
      <div className="row">
        <div className="profile-section col-4">
          <h2>Profile</h2>
          <div className="box">
            {!props.user.image_url ||
              (!props.user.slogan && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Add Picture Here</label>
                    <input
                      type="text"
                      name="url"
                      value={profileData.url}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Add a pic of you! (url)"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Add a little description!
                    </label>
                    <input
                      type="text"
                      name="slogan"
                      value={profileData.slogan}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="I like to..."
                      // placeholder="Add a url of a pic of you!"
                    />
                  </div>
                  <button onSubmit={handleSubmit} className="btn btn-primary">
                    Submit
                  </button>
                </form>
              ))}
          </div>
          <div className="box2">
            <div className="userInfo">
              {user.image_url && (
                <div key={user.image_url}>
                  <img src={user.image_url} alt="User" />
                </div>
              )}
              <br />
              <div className="name">
                {" "}
                <p className="text-left">Hey!! {user.username}</p>
              </div>
              <div className="email">
                {" "}
                <p class="text-left">Email: {user.email}</p>
              </div>

              <div className="description">
                {" "}
                <p className="text-left">
                  Description: <br /> {user.slogan}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="roadtrip-section col-8">
          <h2>Roadtrips</h2>
          <div>
            <h4>My shared roadtrips</h4>
            <h5>
              <NavLink to="/PastRoadTripView">Add more</NavLink>{" "}
            </h5>
            <div>
              <div className="row">
                {completedTrips1.length >= 1
                  ? completedTrips1.map((element) => {
                      return (
                        <div className="col-md-6 col-lg-3 mb-4">
                          <div className="card h-100 profile-cards">
                            <img
                              className="card-img-top-profile"
                              src={element.image_url}
                              alt="completed roadtrips"
                            />
                            <div className="card-body">
                              <div className="title-delete-container">
                                <h5 className="card-title">{element.title}</h5>
                                <i>
                                  <RiDeleteBin5Line
                                    className="delete-icon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    // onClick={() => deleteRoadtrip(element.id)}
                                  />
                                </i>
                                <div
                                  class="modal fade"
                                  id="exampleModal"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1
                                          class="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Modal title
                                        </h1>
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div class="modal-body">...</div>
                                      <div class="modal-footer">
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-primary"
                                        >
                                          Save changes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <h6 className="card-text">{element.countries}</h6>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              {completedTrips2.length >= 1 && (
                <div className="row">
                  <div class="accordion" id="accordionExample">
                    <div
                      class="accordion-item"
                      style={{ border: "none", padding: "0px" }}
                    >
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div
                          class="accordion-body"
                          style={{ border: "none", padding: "0px" }}
                        >
                          {completedTrips2.map((element) => {
                            return (
                              <div className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 profile-cards">
                                  <img
                                    className="card-img-top"
                                    src={element.image_url}
                                    alt="completed roadtrips"
                                  />
                                  <div className="card-body">
                                    <div className="title-delete-container">
                                      <h5 className="card-title">
                                        {element.title}
                                      </h5>
                                      <i>
                                        <RiDeleteBin5Line
                                          className="delete-icon"
                                          data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                          // onClick={() => deleteRoadtrip(element.id)}
                                        />
                                      </i>
                                      <div
                                        class="modal fade"
                                        id="exampleModal"
                                        tabindex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                      >
                                        <div class="modal-dialog">
                                          <div class="modal-content">
                                            <div class="modal-header">
                                              <h1
                                                class="modal-title fs-5"
                                                id="exampleModalLabel"
                                              >
                                                Modal title
                                              </h1>
                                              <button
                                                type="button"
                                                class="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>
                                            <div class="modal-body">...</div>
                                            <div class="modal-footer">
                                              <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                              >
                                                Close
                                              </button>
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                              >
                                                Save changes
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <h6 className="card-text">
                                      {element.countries}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <h2 class="accordion-header" id="headingOne">
                        <p
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Show more
                        </p>
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4>My planned roadtrips</h4>
            <h5>
              <NavLink to="/NewRoadTripView">Plan more</NavLink>{" "}
            </h5>
            <div>
              <div className="row">
                {plannedTrips.length >= 1
                  ? plannedTrips.map((element) => {
                      return (
                        <div className="col-md-6 col-lg-4 mb-4">
                          <div className="card h-100 profile-cards">
                            <img
                              className="card-img-top"
                              src={element.image_url}
                              alt="completed roadtrips"
                            />
                            <div className="card-body">
                              <div className="title-delete-container">
                                <h5 className="card-title">{element.title}</h5>
                                <i>
                                  <RiDeleteBin5Line className="delete-icon" />
                                </i>
                              </div>
                              <h6 className="card-text">{element.countries}</h6>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
