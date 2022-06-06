import { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function User() {
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
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = `/user/${data.id}`;
        
      });
  };
  useEffect(() => {
    fetch("/api")
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

      <nav>
        <p>
          <Link to="/user"></Link>
        </p>
        <p>
          <Link to="/register">register</Link>
        </p>
      </nav>
      <Outlet />
      <p>{!data ? "Loading ..." : data.message}</p>
    </>
  );
}

export default User;
