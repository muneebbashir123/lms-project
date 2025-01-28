import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { signInWithGoogle, logout } from "../../config.js"

export default function Home() {
  const [user, setUser] = useState(null)
  const [collegeList, setCollegeList] = useState([])
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    usn: "",
    program: "",
    branch: "",
    yearOfGraduation: "",
    review: "",
    facultyRating: "",
    infrastructureRating: "",
    placementRating: "",
    curriculumRating: "",
  })

  useEffect(() => {
    axios
      .get("http://localhost:4000/colleges")
      .then((response) => {
        setCollegeList(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle()
      setUser(loggedInUser)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
    setSelectedCollege(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:4000/reviews", {
        ...formData,
        name: user.displayName,
        email: user.email,
        college: selectedCollege.college_name,
      })
      alert("Review submitted successfully!")
      handleLogout()
    } catch (error) {
      console.error("Failed to submit review:", error)
      alert("Failed to submit review. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-blue-800">College Rating System</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Logout
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : selectedCollege ? (
              <AnimatePresence>
                <motion.div
                  key={selectedCollege.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-50 rounded-lg p-6 space-y-4 shadow-md"
                >
                  <h2 className="text-2xl font-semibold text-blue-800">{selectedCollege.college_name}</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="usn"
                        placeholder="USN"
                        value={formData.usn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        name="yearOfGraduation"
                        placeholder="Year of Graduation"
                        value={formData.yearOfGraduation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        name="program"
                        placeholder="Program (B.Tech | M.Tech | BCA)"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        name="branch"
                        placeholder="Branch (CSE | ECE | MECH)"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <textarea
                      name="review"
                      placeholder="Write your review here..."
                      value={formData.review}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      required
                    ></textarea>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["faculty", "infrastructure", "placement", "curriculum"].map((category) => (
                        <div key={category} className="space-y-2">
                          <label className="block text-sm font-medium text-blue-700">Rate {category}</label>
                          <select
                            name={`${category}Rating`}
                            value={formData[`${category}Rating`]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select rating</option>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <option key={rating} value={rating.toString()}>
                                {rating}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Submit Review
                    </button>
                  </form>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-800">Select a College</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collegeList.map((college) => (
                    <button
                      key={college.id}
                      onClick={() => setSelectedCollege(college)}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition duration-300"
                    >
                      {college.college_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl font-bold text-blue-800">College Rating System</h1>
            <p className="text-xl text-blue-600">
              Mohammed Ameen Khan - 1AM21CS117
              <br />
              Mohammed Shoaib - 1AM21CS119
              <br />
              Muneeb Bashir - 1AM21CS123
            </p>
            <button
              onClick={handleLogin}
              className="px-8 py-3 bg-blue-600 text-white rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login with Google
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}