import { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [data, setData] = useState(null);
  const inputElement = useRef();
  const handleInput = () => {
    const inputValue = inputElement.current.value;
    console.log("input", inputValue);
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: inputValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = `/user/${data.id}`;
      });
  };
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setData(data);
        }, 3000);
      });
  }, []);
  console.log("data", data);
  return (
    <>
      <section className="wrapper">
        <section className="header">
          <section className="menu">
            <nav className="row m-0 p-0">
              <section className="col-6 sub-menu">
                <div className="left">
                  <Link to="/register" className="link">
                    register
                  </Link>
                </div>
              </section>
              <section className="col-6 sub-menu">
                <div className="right d-flex justify-content-between">
                  <input
                    type="text"
                    className=""
                    placeholder="search user for friends"
                    ref={inputElement}
                  />
                  <span className="">
                    <FontAwesomeIcon
                      className="searchIcon"
                      icon={faSearch}
                      onClick={handleInput}
                    />
                  </span>
                </div>
              </section>
              <Outlet />
            </nav>
          </section>
        </section>
      </section>

      <p className="load">{!data ? "Loading ..." : ""}</p>
      <div>
        <div className="row gy-4  m-0 mx-auto cards">
          {data &&
            data.map((item, index) => {
              return (
                <div key={index} className="col-12 m-0 mt-3 mb-3 card-wrapper h-100">
                  <div className="card h-100">
                    <header>{item.username}</header>
                    <div className="card-body">
                      <h5 className="card-title">Friends</h5>
                      {item.friends.length == 0 && <p className= "card-text">no friends</p>}
                      {item.friends.length > 0 &&
                        item.friends.map((value, ind) => {
                          return <p key= {ind} className="card-text">{value.username}</p>;
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
