import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  let navigate = useNavigate();

  {
    /* for input Input type:text */
  }
  let [errorname, setErrorname] = useState(false);
  let [pname, setPname] = useState("");
  let InputEvent = (e) => {
    let value = e.target.value;
    if (value.length < 3) {
      setErrorname("Length Must be Greater than 3");
    } else {
      setErrorname(false);
    }
    setPname(value);
  };

  let [errordesc, setErrordesc] = useState(false);
  let [description, setDescription] = useState("");
  let InputEvent1 = (e) => {
    let value = e.target.value;
    if (value.length < 3) {
      setErrordesc("Length Must be Greater than 3");
    } else {
      setErrordesc(false);
    }
    setDescription(value);
  };

  let [errorprice, setErrorprice] = useState(false);
  let [price, setprice] = useState("");
  let InputEvent2 = (e) => {
    let value = e.target.value;
    if (value.length < 3) {
      setErrorprice("Length Must be Greater than 3");
    } else {
      setErrorprice(false);
    }
    setprice(value);
  };

  // let [error,setError] = useState(false)
  // let [inputdata, setInputdata] = useState({});
  // let InputEvent = (e) => {
  //   let name = e.target.name
  //    let value  = e.target.value
  //    if(value.length<3){
  //     setError('Length Must be Greater Than 3')
  //    }
  //    else{
  //     setError(false)
  //    }
  //    setInputdata({...inputdata,[name]:value})
  // };

  {
    /* for input Input type:file */
  }
  let [errorimage, setErrorimage] = useState(false);
  let [image, setImage] = useState(null);
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes

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

  let removeImage = () => {
    setImage(null);
    document.getElementById("image").value = "";
  };

  {
    /* for input Input type:checkbox */
  }

  // let [check,setChecked] = useState([])
  // let handleCheckbox = (e) => {
  //   let value = e.target.value
  //   let checked = e.target.checked
  //   console.log(value,checked)
  //   if(checked){
  //     setChecked([...check,value])
  //   }else{
  //      setChecked(check.filter(e=>(e!==value)))
  //    }
  // }
  let [errorcheckbox, setErrorcheckbox] = useState(false);
  const [languages, setLanguages] = useState([]);
  const handleCheckbox = (event) => {
    //   let value = e.target.value
    //   let checked = e.target.checked
    const target = event.target;
    const value = target.value;
    const checked = target.checked;
    if (checked) {
      setLanguages([...languages, value]);
    } else {
      setLanguages(languages.filter((lang) => lang !== value));
    }

    const checkedLanguages = languages.filter((lang) => lang !== value);
    if (checkedLanguages.length === 0 && !checked) {
      setErrorcheckbox("Please select at least one language.");
    } else {
      setErrorcheckbox(false);
    }
  };

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

  {
    /* for input dropdown */
  }
  let [errordecide, setErrordecide] = useState(false);
  let [decide, setDecide] = useState("bscs");
  let handleCategory = (e) => {
    let value = e.target.value;
    if (value.length > 0) {
      setErrordecide(false);
    } else {
      setErrordecide("One Option Msut Be Selected");
    }
    setDecide(value);
  };

  {
    /* for textarea */
  }
  let [errorinfo, setErrorinfo] = useState(false);
  let [info, setInfo] = useState();
  let handleAddress = (e) => {
    let value = e.target.value;
    if (value.length < 3) {
      setErrorinfo("Length Must be Greater than 3");
    } else {
      setErrorinfo(false);
    }
    setInfo(value);
    console.log(info); //always do console outside the function or always it keeps gap of one value
  };

  let onSubmit = async (e) => {
    e.preventDefault();

    if (!pname) {
      return setErrorname("Please provide some value.");
    }

    if (!description) {
      return setErrordesc("Please provide some value.");
    }

    if (!price) {
      return setErrorprice("Please provide some value.");
    }

    if (languages.length === 0) {
      return setErrorcheckbox("Please select at least one language.");
    }

    if (!rdio) {
      return setErrorradio("Select one radio button");
    }

    // if (!errordecide) {
    //   setErrordecide('One Option Msut Be Selected')
    // }

    if (!info) {
      return setErrorinfo("Please provide some value.");
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
    formdata.append("language", languages);
    formdata.append("gender", rdio);
    formdata.append("address", info);
    formdata.append("degree", decide);

    let res = await Axios.post(
      "http://localhost:3400/multer/createdata",
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
    // setInputdata({ pname: '', description: '', price: ''});
    setPname("");
    setDescription("");
    setprice("");
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
      <form enctype="multipart/form-data" method="post" id="myForm">
        {/* for input Input type:text */}
        <label for="pname">Product Name</label>
        <input type="text" name="pname" value={pname} onChange={InputEvent} />
        {errorname ? <span style={{ color: "red" }}>{errorname}</span> : ""}
        <br />
        <br />
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={InputEvent1}
        />
        {errordesc ? <span style={{ color: "red" }}>{errordesc}</span> : ""}
        <br />
        <br />
        {/* for input Input type:Number */}
        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={InputEvent2}
        />
        c{errorprice ? <span style={{ color: "red" }}>{errorprice}</span> : ""}
        <br />
        <br />
        {/* for input Input type:checkbox */}
        <label htmlFor="language">Select Your Languages: </label>
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
        {/* <p>Selected languages: {languages.join(", ")}</p> */}
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
        {errordecide ? <span style={{ color: "red" }}>{errordecide}</span> : ""}
        <br />
        <br />
        {/* for input Input type:textarea*/}
        <label for="address">Address: </label>
        <textarea name="address" value={info} onChange={handleAddress} />
        {errorinfo ? <span style={{ color: "red" }}>{errorinfo}</span> : ""}
        <br />
        <br />
        {/* for input Input type:file */}
        <label for="image">image</label>
        <input type="file" name="image" id="image" onChange={handleimage} />
        <br></br>
        {errorimage ? <span style={{ color: "red" }}>{errorimage}</span> : ""}
        {image && (
          <div>
            {/* <img src={URL.createObjectURL(image)} alt="" height="200" /> */}
            <button onClick={removeImage}>Remove Image</button>
          </div>
        )}
        {image && <h3>Image</h3>}
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

export default Addproduct;
