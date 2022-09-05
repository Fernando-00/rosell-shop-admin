import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";
import { addClient } from "../../redux/apiCalls";
import "./newUser.css"

export default function NewUser() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(inputs)
  console.log(file)


  

  const handleChange = (e) => {
    
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  };
  

  const handleClick = (e) =>{
    e.preventDefault();
    console.log(file)
    console.log(file)

    if(file != null){
        const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:

        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const client = {...inputs, img: downloadURL};
          addClient(client, dispatch, navigate);
        });
      }
    );
    }else{
      const client = {...inputs};
      addClient(client, dispatch, navigate);
    }
    


  };

  return (
    
    <div className="newUser">
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
            <div className="newUserItem">
                <label className="required">Username</label>
                <input type="text" name="username" placeholder="John" onChange={(e)=>handleChange(e)} required/>
            </div>
            
            <div className="newUserItem">
                <label className="required">Email</label>
                <input type="email" name="email" placeholder="john@gmail.com" onChange={(e)=>handleChange(e)} required/>
            </div>
            <div className="newUserItem">
                <label className="required">Password</label>
                <input type="password" name="password" placeholder="password" onChange={(e)=>handleChange(e)} required/>
            </div>
            <div className="newUserItem">
                <label>Phone (ex: 123 - 456 - 789)</label>
                <input type="tel" name="phone" placeholder="Format: 123-456-789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{3} [0-9]{3} [0-9]{4}|[0-9]{10}" onChange={(e)=>handleChange(e)} />
            </div>
            <div className="newUserItem">
                <label>Address</label>
                <input type="text" placeholder="New York | USA" onChange={(e)=>handleChange(e)} />
            </div>
            <div className="newUserItem">
                <label>Gender</label>
                <div className="newUserGender">

                <input type="radio" name="gender" id="male" value="male" onChange={(e)=>handleChange(e)}/>
                <label for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female" onChange={(e)=>handleChange(e)}/>
                <label for="female">Female</label>
                <input type="radio" name="gender" id="other" value="other" onChange={(e)=>handleChange(e)}/>
                <label for="other">Other</label>
                </div>
                
            </div>
            <div className="newUserItem">
                <label>Image</label>
                <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
            </div>
            <button className="newUserButton" onClick={handleClick}>Create</button>
        </form>
    </div>
  )
}
