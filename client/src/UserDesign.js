import { useEffect, useState } from "react";
import styles from "./my-style.module.css";
function UserDesign(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${props.id}`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("json", json);
        setData(json);
      });
  }, []);
  console.log("desData", data);
  return (
    <>
      <section className={`mt-3 ${styles.wrapper}`}>
        <div className="row m-0 p-0">
          <div className={`col-8 offset-2 ${styles.Col}`}>
            <div className={`${styles.header}`}>
              <div className={`${styles.inner}`}>
                <p className={`${styles.title}`}>{data && data.username}</p>
              </div>
            </div>
            <div className="">
              <ul className={`list-group ${styles.list}`}>
                {data &&
                  data.friends.map((item, index) => {
                    return (
                      <li className="list-group-item">
                        <div className={styles.listItem}>
                          <p>{item.username}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDesign;
