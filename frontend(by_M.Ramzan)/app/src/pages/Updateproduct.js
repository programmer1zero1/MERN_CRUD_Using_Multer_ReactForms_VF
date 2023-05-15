import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updateproduct = () => {
  let navigate = useNavigate();

  {
    /* for input Input type:text */
  }

  let [pname, setPname] = useState("");
  let [description, setDescription] = useState("");

  {
    /* for input Input type:Number */
  }

  let [price, setPrice] = useState("");

  {
    /* for input Input type:file */
  }
  let [errorimage, setErrorimage] = useState(false);
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes
  let [image, setImage] = useState(null);
  let handleimage = (e) => {
    let file = e.target.files[0];
    if (!file) {
      setImage(null);
      setErrorimage("File Must be Provided");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setImage(null);
      setErrorimage(
        "Invalid file type. Please select a JPG, PNG, or JPEG file."
      );
      return;
    }

    if (file.size > maxFileSize) {
      setErrorimage("File size must be less than 1MB.");
      setImage(null);
      return;
    }

    setImage(file);
    setErrorimage(false);
  };
  // let [image, setImage] = useState(null);
  // let handleimage = (e) => {
  //      setImage(e.target.files[0])
  // }

  let [imageNameOnUpdate, setImageNameOnUpdate] = useState();

  const inputRef = useRef(null);

  let removeImage = () => {
    setImage(null);
    inputRef.current.value = "";
  };

  {
    /* for input Input type:checkbox */
  }
  let [errorcheckbox, setErrorcheckbox] = useState(false);
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

    const checkedLanguages = check.filter((lang) => lang !== value);
    if (checkedLanguages.length === 0 && !checked) {
      setErrorcheckbox("Please select at least one language.");
    } else {
      setErrorcheckbox(false);
    }
  };

  let [chkbox, setChkbox] = useState();
  console.log("The CheckBox ", chkbox);

  {
    /* for input Input type:checkbox */
  }
  let [errorradio, setErrorradio] = useState(false);
  let [rdio, setRdio] = useState("");
  let handleRadio = (e) => {
    let value = e.target.value;
    let check = e.target.checked;
    if (check) {
      setRdio(value);
      setErrorradio(false);
    }
  };

  let [rdiOnUpdate, setRdiOnUpdate] = useState("");

  {
    /* for input dropdown */
  }
  let [decide, setDecide] = useState("bscs");
  let handleCategory = (e) => {
    let value = e.target.value;
    setDecide(value);
  };

  let [dwnOnUpdate, setDwnOnUpdate] = useState("");

  {
    /* for textarea */
  }

  let [info, setInfo] = useState();
  let handleAddress = (e) => {
    setInfo(e.target.value);
    console.log(info); //always do console outside the function or always it keeps gap of one value
  };

  let params = useParams();

  let getdataid = async () => {
    let res = await axios.get(
      `http://localhost:3400/multer/findone/${params.id}`
    );
    console.log(res.data);
    console.log(res.data.pname);
    let name = await res.data.pname;
    let desc = await res.data.description;
    let price = await res.data.price;
    let pic = await res.data.image;
    let chk = await res.data.language;
    let gndr = await res.data.gender;
    let dgr = await res.data.degree;
    let addr = await res.data.address;

    console.log(name);

    setPname(name);
    setDescription(desc);
    setPrice(price);
    setImageNameOnUpdate(pic);
    setChkbox(chk);
    setRdiOnUpdate(gndr);
    setDwnOnUpdate(dgr);
    setInfo(addr);
  };

  useEffect(() => {
    getdataid();
  }, []);

  let onSubmit = async (e) => {
    e.preventDefault();

    // if (languages.length === 0) {
    //   return setErrorcheckbox('Please select at least one language.');
    // }

    // if(!rdio){
    //   return setErrorradio('Select one radio button')
    // }

    // if (!errordecide) {
    //   setErrordecide('One Option Msut Be Selected')
    // }

    if (check.length < 1) {
      return setErrorcheckbox("Please select at least one language.");
    }

    if (!rdio) {
      return setErrorradio("Select one radio button");
    }

    if (!image) {
      setImage(null);
      return setErrorimage("File Must be Provided");
    }

    let formdata = new FormData();

    formdata.append("pname", pname);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("image", image);
    formdata.append("language", check);
    formdata.append("gender", rdio);
    formdata.append("address", info);
    formdata.append("degree", decide);

    let res = await Axios.put(
      `http://localhost:3400/multer/updateone/${params.id}`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data charset=UTF-8",
        },
      }
    );

    console.log("The Data Submitted is:", res);
    alert("Form Has Benn Submitted");
    navigate("/show");
  };

  let ClearFrom = (e) => {
    e.preventDefault();
    setPname("");
    setDescription("");
    setPrice("");
    setInfo("");
    document.getElementById("myForm").reset();
    setImage(null);
    document.getElementById("image").value = "";
  };

  return (
    <>
      <hr />
      <button className="btn btn-primary" onClick={() => navigate("/show")}>
        Want To Show All Data
      </button>
      <hr />
      <h1>Add Product</h1>
      <form enctype="multipart/form-data" method="post">
        {/* for input Input type:text */}

        <label for="pname">Product Name</label>
        <input
          type="text"
          name="pname"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
        />
        <br />
        <br />
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        {/* for input Input type:Number */}

        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />

        {/* for input Input type:checkbox */}

        <label for="language">Select Your Languages: </label>
        <br />
        <input
          type="checkbox"
          name="language"
          value="English"
          onChange={handleCheckbox}
        />
        <label>English</label>

        <input
          type="checkbox"
          name="language"
          value="Urdu"
          onChange={handleCheckbox}
        />
        <label>Urdu</label>

        <input
          type="checkbox"
          name="language"
          value="Punjabi"
          onChange={handleCheckbox}
        />
        <label>Punjabi</label>

        <input
          type="checkbox"
          name="language"
          value="Other"
          onChange={handleCheckbox}
        />
        <label>Other</label>
        {errorcheckbox ? (
          <span style={{ color: "red" }}>{errorcheckbox}</span>
        ) : (
          ""
        )}

        <br />
        <br />

        {/* for input Input type:radio */}
        <label for="gender">Select Your Gender: </label>

        <input type="radio" name="gender" value="male" onChange={handleRadio} />
        <label for="gender">Male</label>

        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleRadio}
        />
        <label for="gender">Female</label>
        {errorradio ? <span style={{ color: "red" }}>{errorradio}</span> : ""}

        <br />
        <br />

        {/* for input dropdown */}
        <label for="degree">Choose a Category</label>
        <select name="degree" onChange={handleCategory}>
          <option value="bscs">BSCS</option>
          <option value="mphil">MPhil</option>
          <option value="PHD">PHD</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />

        {/* for input Input type:textarea*/}
        <label for="address">Address: </label>
        <textarea name="address" value={info} onChange={handleAddress} />

        <br />
        <br />

        {/* for input Input type:file */}

        <label for="image">Price</label>
        <input type="file" name="image" ref={inputRef} onChange={handleimage} />
        <p align="center">
          <td>{imageNameOnUpdate}</td>
        </p>
        {image && (
          <div>
            {/* <img src={URL.createObjectURL(image)} alt="" height="200" /> */}
            <button onClick={removeImage}>Remove Image</button>
          </div>
        )}
        <center>
          <h3>Old Image</h3>
          <p>
            <img
              src={`http://localhost:3400/uploads/${imageNameOnUpdate}`}
              width={100}
              height={100}
            />
          </p>
        </center>
        {errorimage ? <span style={{ color: "red" }}>{errorimage}</span> : ""}
        <br></br>
        {image && <h3>New Image</h3>}
        {image && (
          <img src={image && URL.createObjectURL(image)} alt="" height="200" />
        )}

        <br />
        <br />

        <button
          className="btn btn-success"
          onClick={(e) => onSubmit(e)}
          type="submit"
        >
          Submit
        </button>
        <button className="btn btn-success" onClick={ClearFrom} type="submit">
          Clear
        </button>
      </form>
    </>
  );
};

export default Updateproduct;
