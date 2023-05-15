// This page is not using in project

import React, { useEffect } from 'react'
import { useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Updateproduct = () => {

  let navigate = useNavigate()

            {/* for input Input type:text */}

    let [pname, setPname] = useState("");
    let [description, setDescription] = useState("");


            {/* for input Input type:Number */}

    let [price, setPrice] = useState("");


    

            {/* for input Input type:file */}

  let [image, setImage] = useState(null);
  let handleimage = (e) => {
       setImage(e.target.files[0])
  }

   let [imageNameOnUpdate,setImageNameOnUpdate] = useState()


   {/* for input Input type:checkbox */}

   let [check,setChecked] = useState([])
   let handleCheckbox = (e) => { 
     let value = e.target.value
     let checked = e.target.checked
     console.log(value,checked)
     if(checked){
       setChecked([...check,value])
     }else{
        setChecked(check.filter(e=>(e!==value)))
      }
 
   }

   let [chkbox,setChkbox] = useState([])
   console.log("The CheckBox ",chkbox.includes("Punjabi"))






     {/* for input Input type:checkbox */}

  let [rdio,setRdio] = useState("")
  let handleRadio = (e) => {
    let value = e.target.value
    let check = e.target.checked
    if(check){
      setRdio(value)
      console.log(value)
    }

  }

  let [rdiOnUpdate,setRdiOnUpdate] = useState("")

  
  
              {/* for input dropdown */}
      let [decide,setDecide] = useState("")
      let handleCategory = (e) => {
        let value = e.target.value
        setDecide(value)
      }

  let [dwnOnUpdate,setDwnOnUpdate] = useState("")



  
  
              {/* for textarea */}
  
    let[info,setInfo] = useState()
    let handleAddress = (e) => {
      setInfo(e.target.value)
      console.log(info)    //always do console outside the function or always it keeps gap of one value
    }


  let params = useParams()

   let getdataid = async() => {
      let res = await axios.get(`http://localhost:3400/multer/findone/${params.id}`)
      console.log("fetching data",res.data)
      let name = await res.data.pname
      let desc = await res.data.description
      let price = await res.data.price
      let pic = await res.data.image
      let chk = await res.data.languages
      let gndr = await res.data.gender
      let dgr = await res.data.degree
      let addr = await res.data.address



      setPname(name)
      setDescription(desc)
      setPrice(price)
      setImageNameOnUpdate(pic)
      setChkbox(chk)
      setRdiOnUpdate(gndr)
      setDwnOnUpdate(dgr)
      setInfo(addr)
   }

 
   useEffect(()=>{
     getdataid()
   },[])




  let onSubmit =async(e) => {
    e.preventDefault();

    let formdata = new FormData()

    formdata.append("pname",pname)
    formdata.append("description",description)
    formdata.append("price",price)
    formdata.append("image",image)
    formdata.append("language",check)
    formdata.append("gender",rdio)
    formdata.append("address",info)
    formdata.append("degree",decide)


   let res = await Axios.put(`http://localhost:3400/multer/updateone/${params.id}`,formdata,{
      headers: {
        "Content-type": "multipart/form-data charset=UTF-8",
      }
    })

   
      console.log("The Data Submitted is:",res)
    alert("Form Has Benn Submitted");
    navigate("/show")
  }



  return (
    <>
     <hr/>
    <button className='btn btn-primary' onClick={()=>navigate("/show")}>Want To Show All Data</button>
    <hr/>
         <h1>Add Product</h1>
        <form enctype="multipart/form-data" method="post">

            {/* for input Input type:text */}

          <label for="pname">Product Name</label>
          <input type="text" name="pname" value={pname} onChange={(e)=>setPname(e.target.value)} />
          <br/>
          <br/>
          <label for="description">Description</label>
          <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
          <br/>
          <br/>


            {/* for input Input type:Number */}

          <label for="price">Price</label>
          <input type="number" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
          <br/>
          <br/>


            {/* for input Input type:file */}

          <label for="image">Price</label>
          <input type="file" name="image"  onChange={handleimage} />
          <p align='center'><td>{imageNameOnUpdate}</td></p>
          <p><img src={`http://localhost:3400/uploads/${imageNameOnUpdate}`} width={100} height={100}  /></p>
          <br/>
          <br/>


          {/* for input Input type:checkbox */}

          <label for="language">Select Your Languages: </label>
          <br/>
          <input type="checkbox" name="language"   value="English" checked={chkbox.includes("English")}   onChange={handleCheckbox} />
          <label >English</label>

          <input type="checkbox" name="language"  value="Urdu" checked={chkbox.includes("Urdu")}   onChange={handleCheckbox} />
          <label>Urdu</label>

          <input type="checkbox" name="language"   value="Punjabi" checked={chkbox.includes("Punjabi")}  onChange={handleCheckbox} />
          <label >Punjabi</label>
          
          <input type="checkbox" name="language"   value="Other" checked={chkbox.includes("Other")}   onChange={handleCheckbox} />
          <label>Other</label>
          <br/>
          <br/>


            {/* for input Input type:radio */}
            <label for="gender">Select Your Gender: </label>

          <input type="radio" name="gender" checked={rdiOnUpdate==="male"} value="male" onChange={handleRadio} />
          <label for="gender">Male</label>

          <input type="radio" name="gender" checked={rdiOnUpdate==="female"} value="female" onChange={handleRadio} />
          <label for="gender">Female</label>
          <br/>
          <br/>



            {/* for input dropdown */}
            <label for="degree">Choose a Category</label>
          <select value={dwnOnUpdate} name="degree" onChange={handleCategory}>
          <option selected={dwnOnUpdate==="null"} value="null">-------</option>
          <option selected={dwnOnUpdate==="bscs"} value="bscs" >BSCS</option>
          <option selected={dwnOnUpdate==="mphil"} value="mphil">MPhil</option>
          <option selected={dwnOnUpdate==="PHD"} value="PHD">PHD</option>
          <option selected={dwnOnUpdate==="Other"} value="Other">Other</option>
          </select>
          <br/>
          <br/>


            {/* for input Input type:textarea*/}
            <label for="address">Address: </label>
          <textarea name="address"   value={info} onChange={handleAddress} />




          <button className="btn btn-success" onClick={(e) => onSubmit(e)} type="submit">Submit</button>
        </form>     
    </>
  )
}

export default Updateproduct

