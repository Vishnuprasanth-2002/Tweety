import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { v4 as uuidv4 } from "uuid";

function CustomForm({ addTweet }) {
  const [tweet, setTweet] = useState("");
  const [initialValues, setInitialValues] = useState([]);
  const [isSubmit, setIsSubmit] = useState({ error: "", bool: true });

  function formatTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${amOrPm}`;
  }
  const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  };
  useEffect(() => {
    if (tweet.length > 0 && tweet.length <= 140) {
      setIsSubmit({ error: "", bool: false });
    } else if (tweet.length > 140) {
      setIsSubmit({ error: "Only 140 characters allowed", bool: true });
    } else {
      setIsSubmit({ error: "", bool: true });
    }
  }, [tweet]);
  /// form submit function
  function handleFormSumbit(e) {
    e.preventDefault();
    if (!isSubmit.bool) {
      const data = {
        id: uuidv4(),
        tweet: tweet,
        date: getCurrentDateFormatted(),
        time: formatTime(),
        datetime: new Date(),
        like: false,
        dislike: false,
      };
      const updatedTweets = [...initialValues, data].sort(
        (a, b) => b.datetime - a.datetime
      );
      setInitialValues(updatedTweets);
      saveToLocal();
      setTweet("");
    }
  }
  const saveToLocal = () => {
    localStorage.setItem("tweets", JSON.stringify(initialValues));
  };

  return (
    <Layout title="Form">
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
                  value={tweet}
                  onChange={(e) => setTweet(e.target.value)}
                />
              </div>
              <div className="error">{isSubmit.error}</div>
              <div className="note">
                <h4>
                  NOTE-
                  <span className="note-para">
                    Please enter character upto 140 only
                  </span>
                </h4>
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
    </Layout>
  );
}
export default CustomForm;
