import React, { useState } from "react";

function Display() {
    const NewObj = {
        image: "",
        title: "",
        price: "",
        description: "",
        category: ""
        
    };

    const [data, setData] = useState(NewObj);
    // console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e);
        
        
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(datas => {
                console.log(NewObj);
                setData(datas); 
                
            })
            .catch(error => console.error('Error:', error));
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(e.target.value);
        
    };

    return (
        <>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Image' name="image" value={data.image} onChange={handleChange}  style={{padding : "10px 40px"}}/><br /><br />
                <input type='text' placeholder='Title' name="title" value={data.title} onChange={handleChange} style={{padding : "10px 40px"}} /><br /><br />

                <select name="category" value={data.category} onChange={handleChange} style={{padding : "10px 58px"}}>
                    <option value="">Select Category</option>
                    <option value="mens_clothing">Men's Clothing</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="electronics">Electronics</option>
                    <option value="womens_clothing">Women's Clothing</option>
                </select><br /><br />

                <input type='text' placeholder='Price' name="price" value={data.price} onChange={handleChange} style={{padding : "10px 40px"}} /><br /><br />
                <input type='text' placeholder='Description' name="description" value={data.description} onChange={handleChange} style={{padding : "10px 40px"}} /><br /><br />
                <input type='submit' style={{padding : "8px 20px"}}/><br /><br />
            </form>
        </>
    );
}

export default Display;