import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
          setTimeout(() => {
            setData(data);
          }, 3000)
      });
  }, []);
  console.log("data", data);
  return (
    <>
        <nav>
          <p><Link to="/user"></Link></p>
            <p><Link to="/register">register</Link></p>
            
        </nav>
        <Outlet/>
      <p>{!data ? "Loading ..." : data.message}</p>
      
    </>
  );
}

export default Home;
