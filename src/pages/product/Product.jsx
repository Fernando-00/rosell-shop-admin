import { Link, useLocation, useNavigate } from "react-router-dom"
import Chart from "../../components/chart/Chart"
import "./product.css"

import { productData } from "../../dummyData"
import { Publish } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../../redux/requestMethods"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import app from "../../firebase"
import { updateProduct } from "../../redux/apiCalls"

export default function Product() {
    // GETS ID OF PRODUCT, LATER ON USED IN API CALL TO UPDATE PRODUCT
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const navigate = useNavigate();
    console.log(productId)

    // USED TO FIND SALES OF SPECIFIC PRODUCT OVER THE MONTHS
    const [pStats, setPStats] = useState([]);

    //UPDATE INPUTS OF PRODUCT
    const [inputs, setInputs] = useState({});
    //UPDATE INPUTS OF PRODUCTS THAT ARE ARRAYS
    const [cat, setCat] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    // USED TO SEND AOI CALL
    const dispatch = useDispatch();

    console.log(cat)
    console.log(color)
    console.log(size)

    console.log(inputs)


    //GETS CURRENT PRODUCT USING ID
    const product = useSelector((state)=>
        state.persistedReducer.product.products.find((product)=>product._id === productId)
        );

    console.log(product)
    //GETS IMG OF PRODUCT IS INTILIZED AS CURRENT IMG 
    const [file, setFile] = useState(null);
    console.log(file)
    const MONTHS = useMemo(()=>[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
        ],
        []
    );
    
    //USED TO CREATE GRAPH OF INCOME
    useEffect(()=>{
        const getStats = async ()=>{
          try {
            const res = await userRequest.get("/orders/income?pid=" + productId);
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item)=>
              setPStats((prev)=>[
                ...prev,
                {name:MONTHS[item._id-1], Sales:item.total},
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [MONTHS]);


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

    const handleChange = (e) => {
    setInputs(prev=>{
        return {...prev, [e.target.name]:e.target.value}
    })
    };

    const handleUpdate = (e) =>{
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
            console.log(error)
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            const product = {...inputs, img: downloadURL, categories: cat, color: color, size: size};
            updateProduct(productId, product, dispatch, navigate);
            });
        }
        );
    };

  return (
    <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
            <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">sales:</span>
                        <span className="productInfoValue">5123</span>
                    </div>
                    
                    <div className="productInfoItem">
                        <span className="productInfoKey">in stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label className="required">Product Name</label>
                    <input type="text" name="title" placeholder={product.title} onChange={handleChange}/>
                    <label className="required">Product Description</label>
                    <input type="text" name="desc" placeholder={product.desc} onChange={handleChange}/>
                    <label className="required">Store Price</label>
                    <input type="text" name="storePrice" placeholder={product.storePrice} onChange={handleChange}/>
                    <label className="required">Inventory Price</label>
                    <input type="text" name="inventoryPrice" placeholder={product.inventoryPrice} onChange={handleChange}/>
                    <label>Categories</label>
                    <input type="text" placeholder={product.categories} onChange={handleCat}/>
                    <label>Color</label>
                    <input type="text" placeholder={product.color} onChange={handleColor}/>
                    <label>Size</label>
                    <input type="text" placeholder={product.size} onChange={handleSize}/>
                    <label>In Stock</label>
                    <select name="inStock" id="idStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src={product.img} 
                            alt="" 
                            className="productUploadImg" />
                            <label for="file" className="required">
                                <Publish/>
                            </label>
                            
                            <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                    </div>
                    <button className="productButton" onClick={handleUpdate}>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}
