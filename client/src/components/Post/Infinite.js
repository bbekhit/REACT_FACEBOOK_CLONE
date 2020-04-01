import React, { useState, useEffect } from "react";

export default function Infinite(props) {
  const [loadMore, setLoadMore] = useState(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById("list");
    if (props.scrollable) {
      // list has fixed height
      list.addEventListener("scroll", e => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      // list has auto height
      window.addEventListener("scroll", () => {
        if (
          window.scrollY + window.innerHeight ===
          list.clientHeight + list.offsetTop
        ) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById("list");

    if (list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [state]);

  const getData = load => {
    if (load) {
      fetch("https://dog.ceo/api/breeds/image/random/1")
        .then(res => {
          return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
        })
        .then(res => {
          setState([...state, ...res.message]);
        });
    }
  };

  return (
    <ul id="list">
      {state.map((img, i) => (
        <li style={{ backgroundImage: `url(${img})` }} key={i} />
      ))}
    </ul>
  );
}
