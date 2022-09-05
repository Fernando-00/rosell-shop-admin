import { Accessibility, CalendarToday, LocationSearching, MailOutline, PermIdentity, PersonPin, PhoneAndroid, Publish } from "@mui/icons-material"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"
import app from "../../firebase";
import { updateClient } from "../../redux/apiCalls";
import "./user.css"

export default function User() {

    //inputs that will record any changes to the form, these changes will be used to send an API request
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    
    console.log(inputs)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // GETS ID OF USER, LATER ON USED IN API CALL TO UPDATE USER
    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    //GETS CURRENT USER USING ID
    const user = useSelector((state)=>
    state.persistedReducer.client.clients.find((user)=>user._id === userId)
    );
    
    
    //Created at date from database converted to readable time iso->string
    const createdDate = new Date(user.createdAt);

    //inputs updated as someone types in fields
    const handleChange = (e) => {
        
        setInputs(prev=>{
        return {...prev, [e.target.name]:e.target.value}
        })
    };
  
    console.log(inputs)

  const handleClick = (e) =>{
    e.preventDefault();
    

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
            updateClient(userId, client, dispatch, navigate);
            });
        }
        );
    }else{
      const client = {...inputs};
      updateClient(userId, client, dispatch, navigate);
    }
    


  };


  return (
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            
            <Link to="/newUser">
            <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src={user.img} 
                    alt="" 
                    className="userShowImg" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{user.username}</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className="userShowIcon"/>
                        <span className="userShowInfoTitle">Username: {user.username}</span>
                    </div>
                    
                    <div className="userShowInfo">
                        <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">Created: {createdDate.toDateString()}</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInfoTitle">Phone Number: {user.phone}</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className="userShowIcon"/>
                        <span className="userShowInfoTitle">Email: {user.email}</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">Address: {user.address}</span>
                    </div>
                    <span className="userShowTitle">Personal Details</span>
                    <div className="userShowInfo">
                        <PersonPin className="userShowIcon"/>
                        <span className="userShowInfoTitle">Full Name: {user.fullname}</span>
                    </div>
                    <div className="userShowInfo">
                        <Accessibility className="userShowIcon"/>
                        <span className="userShowInfoTitle">Gender: {user.gender}</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label className="required">Username</label>
                            <input type="text" 
                            placeholder={user.username}
                            className="userUpdateInput"
                            name="username"
                            onChange={(e)=>handleChange(e)}
                            required />
                        </div>
                    
                    
                        <div className="userUpdateItem">
                            <label className="required">Email</label>
                            <input type="text" 
                            placeholder={user.email} 
                            className="userUpdateInput"
                            name="email"
                            onChange={(e)=>handleChange(e)}
                            required />
                        </div>
                        <div className="userUpdateItem">
                            <label >Full Name</label>
                            <input type="text" 
                            placeholder={user.fullname} 
                            name="fullname"
                            onChange={(e)=>handleChange(e)}
                            className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" 
                            placeholder="Format: 123-456-789" 
                            className="userUpdateInput" 
                            name="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{3} [0-9]{3} [0-9]{4}|[0-9]{10}"
                            onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type="text" 
                            placeholder="New York | USA" 
                            className="userUpdateInput" 
                            name="address"
                            onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div className="userUpdateItem">
                        <label>Gender</label>
                            <div className="newUserGender">

                            <input type="radio" name="gender" id="male" value="male" className="userUpdateInput" onChange={(e)=>handleChange(e)}/>
                            <label for="male">Male</label>
                            <input type="radio" name="gender" id="female" value="female" className="userUpdateInput" onChange={(e)=>handleChange(e)}/>
                            <label for="female">Female</label>
                            <input type="radio" name="gender" id="other" value="other" className="userUpdateInput" onChange={(e)=>handleChange(e)}/>
                            <label for="other">Other</label>
                            </div>
                        </div>
                        </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img className="userUpdateImg" src={user.img}
                             alt="" />
                             <label htmlFor="file"><Publish className="userUpdateIcon"/></label>
                             <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
                        </div>
                        <button className="userUpdateButton" onClick={handleClick}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
