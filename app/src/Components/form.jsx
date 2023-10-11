import { useState, useEffect } from "react";

function CustomForm({ addTweet }) {
  const [tweet, setTweet] = useState("");
  const [isSubmit, setIsSubmit] = useState({ error: "", bool: true });

  useEffect(() => {
    if (tweet.length > 0 && tweet.length <= 140) {
      setIsSubmit({ error: "", bool: false });
    } else if (tweet.length > 140) {
      setIsSubmit({ error: "Only 140 characters allowed", bool: true });
    } else {
      setIsSubmit({ error: "", bool: true });
    }
  }, [tweet]);

  function handleFormSumbit(e) {
    e.preventDefault();
    if (!isSubmit.bool) {
      addTweet(tweet);
      setTweet("");
    }
  }

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Add Tweet</span>
          </div>
          <form onSubmit={handleFormSumbit}>
            <div className="row">
              <input
                type="text"
                placeholder="Enter the tweet here ...."
                required
                onChange={(e) => setTweet(e.target.value)}
              />
            </div>
            <div className="error">{isSubmit.error}</div>
            <div className="note">
              <span> NOTE-Please enter character upto 140 only</span>
            </div>
            <div className="form-add">
              <button
                className="submit-btn"
                type="submit"
                disabled={isSubmit.bool}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CustomForm;