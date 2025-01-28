import React, { useState, useEffect } from "react";
import { signInWithGoogle, logout } from "../../config.js";
import Modal from 'react-modal';
import { useRef } from "react";
import axios from 'axios'

export default function Home() {
  const [user, setUser] = useState(null);
  const [collegeList, setCollegeList] = useState(null);
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(null);
  const usnRef = useRef(null)
  const programRef = useRef(null)
  const yogRef = useRef(null)
  const reviewRef = useRef(null)
  const branchRef = useRef(null)
  const fRatingRef = useRef(null)
  const iRatingRef = useRef(null)
  const cRatingRef = useRef(null)
  const pRatingRef = useRef(null)

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  useEffect(() => {
    console.log(user)
    Modal.setAppElement('#root');
    axios.get("http://localhost:4000/colleges")
      .then((response) => {
        setCollegeList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      {user ?
        <>
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                {loading && collegeList ? <>Loading</> :
                  <>
                    {collegeList?.map((item, _) => {
                      return (
                        <div className="card bg-base-100 w-96 shadow-xl my-4" key={Math.random().toString()}>
                          <div className="card-body">
                            <h2 className="card-title justify-center">{item.college_name}</h2>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">USN</span>
                              </div>
                              <input ref={usnRef} type="text" placeholder="Enter USN..." className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Year Of Graduation</span>
                              </div>
                              <input type="text" placeholder="Enter Graduation Year..." className="input input-bordered w-full max-w-xs"
                                ref={yogRef}
                              />
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Program</span>
                              </div>
                              <input type="text" placeholder="B.Tech | M.Tech | BCA" className="input input-bordered w-full max-w-xs"
                                ref={programRef}
                              />
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Branch</span>
                              </div>
                              <input type="text" placeholder="CSE | ECE | MECH" className="input input-bordered w-full max-w-xs"
                                ref={branchRef}
                              />
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Review</span>
                              </div>
                              <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
                                ref={reviewRef}
                              ></textarea>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Rate Faculty</span>
                              </div>
                              <select className="select select-bordered"
                                ref={fRatingRef}
                              >
                                <option disabled selected>Enter Rating (Scale of 5)</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Rate Infrastructure</span>
                              </div>
                              <select className="select select-bordered"
                                ref={iRatingRef}
                              >
                                <option disabled selected>Enter Rating (Scale of 5)</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Rate Placement Success</span>
                              </div>
                              <select className="select select-bordered"
                                ref={pRatingRef}
                              >
                                <option disabled selected>Enter Rating (Scale of 5)</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Rate Curriculum</span>
                              </div>
                              <select className="select select-bordered"
                                ref={cRatingRef}
                              >
                                <option disabled selected>Enter Rating (Scale of 5)</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </label>
                            <div className="card-actions justify-center">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  axios.post("http://localhost:4000/reviews", {
                                    "name": user.displayName,
                                    "email": user.email,
                                    "usn": usnRef.current.value,
                                    "program": programRef.current.value,
                                    "branch": branchRef.current.value,
                                    "year_of_graduation": yogRef.current.value,
                                    "review": reviewRef.current.value,
                                    "faculty_rating": fRatingRef.current.value,
                                    "infrastructure_rating": iRatingRef.current.value,
                                    "placement_rating": pRatingRef.current.value,
                                    "curriculum_rating": cRatingRef.current.value
                                  });
                                  window.location.href = "/";
                                }}                               >
                                Give Review
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                }
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">LMS Software for College rating System</h1>
                <p className="py-6">
                 Mohammed Ameen Khan - 1AM21CS117 <br/>
                 Mohammed Shoaib - 1AM21CS119 <br/>
                 Muneeb Bashir - 1AM21CS123
                </p>
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}
