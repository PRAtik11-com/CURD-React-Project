import React, { useEffect, useState } from "react"
import './Products.css'
import Display from "./form"

function Product() {

    
    const [info, setinfo] = useState([])
    // console.log(info); 
    const [edit, setedit] = useState()
    const [id,setid] = useState()
    // console.log(edit);
    useEffect(() => {
        fetch("http://localhost:3000/products")
        .then((res) => {
            // console.log(res.json());        
            return res.json()
        })
        .then((data) => setinfo(data))
        .catch((err) => console.log(err))
    },[info])


    const handledelete = (id) => {
        fetch(`http://localhost:3000/products/${id}`,{
             method: "DELETE"
        }).then((res) => res.json())
        .then((data) => {
            alert("Succesfully Deleted")
            // setinfo(data);
            console.log(data)
        })
        .catch((err) => console.log(err))
    }
   

    const handleEdit = (id,price) => {
        setid(id)
        setedit(price)        
    }

    const handleupdate = (id) => {
        console.log(id);
        
        
        fetch(`http://localhost:3000/products/${id}`,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: edit })
       }).then((res) => {
             return res.json();})
       .then((data) => {
           console.log(data)
       })
       .catch((err) => console.log(err)) 
    }

    return(
        <div>
          <Display />
          <input type='text' placeholder='Price' name="price" style={{padding : "10px 40px"}} value={edit} onChange={(e) => setedit(e.target.value)} /><br /><br />
          <button onClick={() => handleupdate(id)}>Update</button>
         <h1>Show Product</h1>
         <div className="card-container">
                {info.map((el) => (
                    <div className="card" key={el.id}>
                        <img className="card-image" src={el.image} alt={el.title} />
                        <div className="card-content">
                            <h2 className="card-title">{el.title}</h2>
                            <h2>{el.id}</h2>
                            <p className="card-description">{el.description}</p>
                            <h3 className="card-category">{el.category}</h3>
                            <h3 className="card-price">{el.price}</h3>
                            <button onClick={() => handledelete(el.id)}>Delete</button>
                            <button onClick={() => {handleEdit(el.id ,el.price)}}>Update</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Product