import { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import UserDesign from "../UserDesign";

function User() {
  const [data, setData] = useState(null);
  //   console.log('data');
  const inputElement = useRef();
  const { id } = useParams();
  console.log("id", id);
  //   console.log('afterId');
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
  // useEffect(() => {
    //   console.log('effect');
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTimeout(() => {
  //         setData(data);
  //       }, 3000);
  //     });
  // }, []);
  console.log("data", data);
  //   console.log('return');
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
      <UserDesign id={id} />
    </>
  );
}

export default User;
