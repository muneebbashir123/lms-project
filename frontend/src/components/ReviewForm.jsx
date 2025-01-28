export default function ReviewForm({ review, setReview }) {
  return (
    <>
      <div className="modal-box h-fit relative top-[10%]">
        <h3 className="font-bold text-lg">Review Form</h3>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">USN</span>
          </div>
          <input type="text" placeholder="Enter USN..." className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setReview({
                ...review,
                "usn": e.target.value
              })
            }} />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Program</span>
          </div>
          <select className="select select-bordered"
            onChange={(e) => {
              setReview({
                ...review,
                "rating": e.target.value
              })
            }}
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
            <span className="label-text">Year Of Graduation</span>
          </div>
          <input type="text" placeholder="Enter Graduation Year..." className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setReview({
                ...review,
                "year_of_graduation": e.target.value
              })
            }} />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Rating</span>
          </div>
          <input type="text" placeholder="Enter Rating..." className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setReview({
                ...review,
                "rating": e.target.value
              })
            }} />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Review</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
            onChange={(e) => {
              setReview({
                ...review,
                "reviewText": e.target.value
              })
            }}
          ></textarea>
        </label>
        <div className="modal-action">
          <button className="btn" onClick={() => {
            console.log(review);
          }}>Submit</button>
        </div>
      </div>
    </>
  )
}
