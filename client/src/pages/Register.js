import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faPlus } from '@fortawesome/pro-regular-svg-icons'

function Register() {
  const [user, setUser] = useState(null);
  const [inp, setInp] = useState([]);
  const [isInp, setIsInp] = useState(false);
  const userElement = useRef();
  const InpElement = useRef("");
  // const otherInpElement = useRef('');

  const handleInput = () => {
    const InpValue = InpElement.current.value;
    const userInpValue = userElement.current.value;
    // console.log('otherInpElement', otherInpElement);

    // const otherInpValue = otherInpElement.current.value;
    // console.log('otherInp', otherInpValue);
    // setInp((inp) => [...inp, ])

    console.log("Inp", InpValue);
    console.log("userInp", userInpValue);

    if (inp.indexOf(InpValue) === -1) {
      setInp((inp) => [...inp, InpValue]);
      InpElement.current.setAttribute("readonly", true);
    }

    setUser(userInpValue);
    // setInp((inp) => [...inp, InpValue]);

    setIsInp(true);
    console.log("userState", user);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const InpValue = InpElement.current.value;
    const userInpValue = userElement.current.value;
    const inpArr = [...inp, InpValue];
    console.log(inpArr);
    const userObj = {};
    let getUser = user;
    if (!getUser) {
      getUser = userInpValue;
    }
    userObj["username"] = getUser;
    userObj["friends"] = inpArr;
    console.log("userObj", userObj);
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = '/';
      });
  };
  return (
    <div>
      {user}
      {inp}
      <section className="container-fluid mt-3">
        <section className="row m-0 p-0">
          <section
            className="col-6"
            style={{ backgroundColor: "rgb(231,233,235)" }}
          >
            <form action="">
              <div className="mb-3 mt-2">
                <label htmlFor="username" className="form-label">
                  username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  ref={userElement}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="friends" className="form-label">
                  friends
                </label>
                <input
                  type="text"
                  id="friends"
                  className="form-control"
                  ref={InpElement}
                  required
                />
                {isInp &&
                  inp.map((item, index) => {
                    return (
                      <input
                        type="text"
                        key={index}
                        className="form-control mt-2"
                        ref={InpElement}
                      />
                    );
                  })}
                <p className="iconWrapper">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faPlus}
                    onClick={handleInput}
                  />
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary mb-3"
                onClick={handleClick}
              >
                register
              </button>
            </form>
          </section>
        </section>
      </section>
    </div>
  );
}
export default Register;
