import { useState } from "react"
import "./newProduct.css"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import {addProduct} from "../../redux/apiCalls"
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate();


  

  const handleChange = (e) => {
    
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  };
  

  //HANDLES CATEGORIES WHEN THEY CHANGE, SPLIT TAkES OUT UNECCESARY SYMBOLS AND SPACES
  const handleCat = (e) => {
    setCat(e.target.value.split(/[ ,]+/));
  };
  const handleColor = (e) => {
      setColor(e.target.value.split(/[ ,]+/));
  };
  const handleSize = (e) => {
      setSize(e.target.value.split(/[ ,]+/));
  };


  const handleClick = (e) =>{
    e.preventDefault();
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
          const product = {...inputs, img: downloadURL, categories: cat, color: color, size: size};
          addProduct(product, dispatch, navigate);
        });
      }
    );
  };



  return (
    <div className="newProduct">
    <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label className="required">Image</label>
          <input type="file" id="file" required onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label className="required">Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" required onChange={(e)=>handleChange(e)} />
        </div>
        <div className="addProductItem">
          <label className="required">Description</label>
          <input name="desc" type="text" placeholder="description" required onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label className="required">Store Price</label>
          <input name="storePrice" type="number" placeholder="100" required onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label className="required">Inventory Price</label>
          <input name="inventoryPrice" type="number" placeholder="50" required onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans, skirts" onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="blue, black" onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="S, M, L" onChange={handleSize}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  )
}
