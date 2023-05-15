import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Showproduct = () => {
  let navigate = useNavigate();

  let [data, setData] = useState([]);

  let [check, setChecked] = useState([]);
  let handleCheckbox = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    console.log(value, checked);
    if (checked) {
      setChecked([...check, value]);
    } else {
      setChecked(check.filter((e) => e !== value));
    }
  };

  let show = async () => {
    let res = await axios.get("http://localhost:3400/multer/show");
    console.log(res.data);
    setData(res.data);
  };
  console.log(data);

  useEffect(() => {
    show();
  }, []);

  let deletedata = async (id) => {
    let res = prompt("Press 'Y or y' to Delete All Data");
    console.log(res);
    if (res === "y" || res === "Y") {
      let del = await axios.delete(
        `http://localhost:3400/multer/deleteone/${id}`
      );
      if (del) {
        show();
      }
    } else {
      alert("Data Could Not Be Deleted");
    }
  };

  let multipleDelete = async () => {
    console.log(check);
    let ids = { ids: check };
    console.log("ids ", ids);
    let res = prompt("Press 'Y or y' to Delete All Data");
    console.log(res);
    if (res === "y" || res === "Y") {
      let del = await axios.delete(
        `http://localhost:3400/multer/deletemultiple`,
        { data: ids }
      );
      if (del) {
        show();
      }
    } else {
      alert("Data Could Not Be Deleted");
    }
  };

  // let multipleDelete = async() => {    // also works but not so much accurate
  //   console.log(check)
  //   let del = await axios.delete(`http://localhost:3400/multer/deletemultiple/${check}`)
  // }

  let allDelete = async () => {
    let res = prompt("Press 'ALL' to Delete All Data");
    console.log(res);
    if (res === "ALL") {
      let del = await axios.delete(`http://localhost:3400/multer/deleteall`);
      if (del) {
        show();
      }
    } else {
      alert("Data Could Not Be Deleted");
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const filteredData = data.filter((item) =>
    item.pname.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div align="center">
        <h1>Showing Data From DataBase</h1>
        <hr />
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Want To Add More Data
        </button>
        <hr />
      </div>
      <div>
        <button
          className="btn btn-danger"
          onClick={multipleDelete}
          type="submit"
        >
          MultipleDelte
        </button>
      </div>
      <div>
        <button className="btn btn-danger" onClick={allDelete} type="submit">
          All Delte
        </button>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-hover w-75 mx-auto">
        <thead>
          <th>Sr.No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Language</th>
          <th>Gender</th>
          <th>Degree</th>
          <th>Address</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((val, ind) => {
              return (
                <>
                  <tr key={val._id}>
                    <td>{ind + 1}</td>
                    <td>{val.pname}</td>
                    <td>{val.description}</td>
                    <td>{val.price}</td>
                    {/* <td>{val.image}</td> */}
                    {/* <td><img src={`http://localhost:3400/src/uploads/${val.image}`}/></td> */}
                    <td>
                      <img
                        src={`http://localhost:3400/uploads/${val.image}`}
                        width={100}
                        height={100}
                      />
                    </td>
                    {/* <td>{val.languages}</td> */}
                    {val.languages.map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                    <td>{val.gender}</td>
                    <td>{val.degree}</td>
                    <td>{val.address}</td>

                    <td>
                      <Link to={`/Update/${val._id}`}>
                        <button className="btn btn-success" type="submit">
                          Edit
                        </button>
                      </Link>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={() => deletedata(val._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name={`select${ind}`}
                        onChange={handleCheckbox}
                        value={val._id}
                      />
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <h2>No Data To Show</h2>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Showproduct;
