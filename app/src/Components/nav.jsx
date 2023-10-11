import React, { useEffect } from "react";
import { useState } from "react";
import CustomForm from "./form";
import { v4 as uuidv4 } from "uuid";

function Nav() {
  const [isShowForm, setIsShowForm] = useState(false);
  const [addTweet, setAddTweet] = useState(getFromLocalstorage());
  const [searchVal, setSearchVal] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isNotfound, setIsNotfound] = useState({ msg: "", error: false });

  function getFromLocalstorage() {
    const initialtweets = JSON.parse(localStorage.getItem("tweets"));
    if (initialtweets) {
      return initialtweets;
    } else {
      return [];
    }
  }
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
  function handleAddTweet(tweet) {
    const data = {
      id: uuidv4(),
      tweet: tweet,
      date: getCurrentDateFormatted(),
      time: formatTime(),
      datetime: new Date(),
      like: false,
      dislike: false,
    };

    const updatedTweets = [...addTweet, data].sort(
      (a, b) => b.datetime - a.datetime
    );

    setAddTweet(updatedTweets);
    setFilteredResults(updatedTweets);

    console.log(updatedTweets);
    setIsShowForm(false);
    setIsNotfound({ msg: "", error: false });
  }

  function handleSearchClick() {
    setSearchVal("");
  }

  // function onChange(value) {
  //   const searchTweet = [...addTweet];
  //   setSearchVal(value);
  //   if (searchVal === "") {
  //     // setProducts(productList);
  //     console.log("inside");
  //     setAddTweet(addTweet);

  //     return;
  //   }
  //   const filterBySearch = searchTweet.filter((item) => {
  //     if (item.tweet.toLowerCase().includes(searchVal.toLowerCase())) {
  //       return item;
  //     }
  //   });
  //   // setProducts(filterBySearch);
  //   setAddTweet(filterBySearch);
  // }
  useEffect(() => {
    // const searchTweet = [...addTweet];
    const filterBySearch = addTweet.filter((item) => {
      if (item.tweet.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
    });
    if (searchVal === "") {
      console.log("useeffect");
      setFilteredResults(getFromLocalstorage());
    }
    console.log(filterBySearch);
    setFilteredResults(filterBySearch);

    if (addTweet.length != 0) {
      if (filterBySearch.length === 0) {
        setIsNotfound({ msg: "Result Not Found", error: true });
      } else {
        setIsNotfound({ msg: "", error: false });
      }
    } else {
      setIsNotfound({
        msg: "Make a tweet by clicking the Add Form button",
        error: true,
      });
    }
  }, [searchVal]);

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(addTweet));
  });
  const handleLikeClick = (id) => {
    const updatedTweets = filteredResults.map((tweet) =>
      tweet.id === id ? { ...tweet, like: !tweet.like, dislike: false } : tweet
    );
    setFilteredResults(updatedTweets);
  };
  const handleDislikeClick = (id) => {
    const updatedTweets = filteredResults.map((tweet) =>
      tweet.id === id
        ? { ...tweet, dislike: !tweet.dislike, like: false }
        : tweet
    );
    setFilteredResults(updatedTweets);
  };

  return (
    <div>
      <div className="navbar">
        <div className="link">
          <button className="home-btn" onClick={() => setIsShowForm(false)}>
            Home
          </button>
          <button className="addform-btn" onClick={() => setIsShowForm(true)}>
            Add Form
          </button>
        </div>
        <div>
          <h1>Tweety</h1>
        </div>
      </div>
      {isShowForm ? (
        <>
          <CustomForm addTweet={(tweet) => handleAddTweet(tweet)} />
        </>
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              placeholder="Search here ....."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            {isNotfound.error ? (
              <div className="error">{isNotfound.msg}</div>
            ) : null}
            <button className="Search-btn" onClick={handleSearchClick}>
              clear
            </button>
          </div>
          <div className="tweet-parent"></div>
          <div className="tweet-container">
            <div className="tweet-list-title">
              <h2>
                List of <span className="tweet-list">Tweet</span>
              </h2>
            </div>
            {/* <div className="tweet-records">
              {addTweet.map((item, index) => {
                return (
                  <div key={index} id={item.id} className="card">
                    <div className="tweet-para">
                      <p>{item.tweet}</p>
                    </div>
                    <div className="emoji-head">
                      <div className="emoji">
                        <button
                          className="like"
                          id={`like-${item.id}`}
                          onClick={() => handleLike(`like-${item.id}`)}
                        >
                          &#128077;
                        </button>
                        <button
                          id={`dislike-${item.id}`}
                          onClick={() => handleLike(`dislike-${item.id}`)}
                        >
                          &#128078;
                        </button>
                      </div>
                      <div className="date">
                        {item.date}, {item.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}
            <div className="tweet-records">
              {filteredResults.map((item, index) => {
                return (
                  <div key={index} id={item.id} className="card">
                    <div className="tweet-para">
                      <p>{item.tweet}</p>
                    </div>
                    <div className="emoji-head">
                      <div className="emoji">
                        <button
                          className={item.like ? "like" : ""}
                          id={`like-${item.id}`}
                          onClick={() => handleLikeClick(item.id)}
                        >
                          &#128077;
                        </button>
                        <button
                          className={item.dislike ? "unlike" : ""}
                          id={`dislike-${item.id}`}
                          onClick={() => handleDislikeClick(item.id)}
                        >
                          &#128078;
                        </button>
                      </div>
                      <div className="date">
                        {item.date}, {item.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Nav;
