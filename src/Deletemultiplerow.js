import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

function Deletemultiplerow() {
  const [userData, setUserdata] = useState([]);
  const [delMessage, setDelmessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const reqData = await fetch("http://localhost:3003/employee");
      const resData = await reqData.json();
      setUserdata(resData);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const checkedvalue = userData.map((user) => {
        return { ...user, isChecked: checked };
      });
      console.log(checkedvalue);
      setUserdata(checkedvalue);
    } else {
      const checkedvalue = userData.map((user) =>
        user.username === name ? { ...user, isChecked: checked } : user
      );
      console.log(checkedvalue);
      setUserdata(checkedvalue);
    }
  };

  const handlealldelete = async () => {
    const checkedinputvalue = [];
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].isChecked === true) {
        checkedinputvalue.push(parseInt(userData[i].userid));
      } else {
        alert("Please select at least one checkbix");
      }
    }

    const responce = await axios.post(
      `http://localhost/devopsdeveloper/userdata/deletecheckboxuser`,
      JSON.stringify(checkedinputvalue)
    );
    setDelmessage(responce.data.msg);
  };

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-4 mb-4 fw-bold">
              Delete Multiple row data in React Js
            </h2>
            <h5 className="text-danger">{delMessage} </h5>
            <button
              className="btn btn-danger mb-3"
              onClick={() => {
                handlealldelete();
              }}
            >
              All Delete{" "}
            </button>
            <form className="form w-100">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        name="allselect"
                        checked={
                          !userData.some((user) => user?.isChecked !== true)
                        }
                        onChange={handleChange}
                      />
                    </th>
                    <th>Sr. No</th>
                    <th>username</th>
                    <th>email</th>
                    <th>address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((getusers, index) => (
                    <tr key={index}>
                      <th>
                        {" "}
                        <input
                          type="checkbox"
                          name={getusers.username}
                          checked={getusers?.isChecked || false}
                          onChange={handleChange}
                        />
                      </th>
                      <td>{index + 1} </td>
                      <td>{getusers.username} </td>
                      <td>{getusers.email}</td>
                      <td>{getusers.address}</td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Deletemultiplerow;
