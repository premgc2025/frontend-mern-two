
import React, { useState } from 'react'
import { useContext } from 'react';
import { authContex } from '../context/authContext'
import { baseurl } from '../../helper';



function FoodData() {
    const loggedUser = useContext(authContex)

    console.log("formdata Token",loggedUser.loggedUser.token)
    const [foodsData, setFoodsData] = useState({
        name: "",
        calories: "",
        protein: "",
        carbohydrate: "",
        fat: "",
        quantity: ""
    })

    const [message, setMessage] = useState({
        type: "invisible",
        text: ""
    })

    const [file, setfile] = useState();

    function fileHandle(event) {
        setfile(event.target.files[0])

    }

    function inputHandle(event) {

        setFoodsData((preValue) => {
            return ({ ...preValue, [event.target.name]: event.target.value }

            )
        })

    }

    function submitHandle(event) {
        event.preventDefault();
        console.log("submit", foodsData)

        const formData = new FormData();
        formData.append("image", file)
        formData.append("name", foodsData.name)
        formData.append("calories", foodsData.calories)
        formData.append("protein", foodsData.protein)
        formData.append("carbohydrate", foodsData.carbohydrate)
        formData.append("fat", foodsData.fat)
        formData.append("quantity", foodsData.quantity)

        fetch(`${baseurl}/foods`, {
            method: "POST",
            body:formData,
            headers:
            {
            
              "Authorization": `Bearer ${loggedUser.loggedUser.token}`
            }

        })
            .then((res) => {
                console.log("res", res)

                return res.json()
            })
            .then((data) => {
                console.log("res Data", data.Message)

            })
            .catch((err) => {
                console.log(err)
            })

    }


    return (
        <div className="fooddata-container">
            <div className="fooddata-parent">

                <form action="" className='fooddata-form' >
                    <h3 className='form-title'>Foods Item Entry Form</h3>
                    <div className="form-inp-div">
                        <label htmlFor="nameId">Foods Name</label>
                        <input type="text" id="nameId" name="name" className='inp' required onChange={inputHandle} />
                    </div>

                    <div className="form-inp-div">
                        <label htmlFor="caloriesId">Calories</label>
                        <input type="number" id="caloriesId" name="calories" className='inp' required onChange={inputHandle} />
                    </div>

                    <div className="form-inp-div">
                        <label htmlFor="proteinId">Protein</label>
                        <input type="number" id="protienId" name="protein" className='inp' required onChange={inputHandle} />
                    </div>


                    <div className="form-inp-div">
                        <label htmlFor="carbohydrateId">Carbohydrate</label>
                        <input type="number" id="carbohydrateId" name="carbohydrate" className='inp' required onChange={inputHandle} />
                    </div>

                    <div className="form-inp-div">
                        <label htmlFor="fatId">Fat</label>
                        <input type="number" id="fatId" name="fat" className='inp' required onChange={inputHandle} />
                    </div>

                    <div className="form-inp-div">
                        <label htmlFor="quantityId">Quantity</label>
                        <input type="number" id="quantityId" name="quantity" className='inp' required onChange={inputHandle} />
                    </div>

                    <div className="form-inp-div">
                        <label htmlFor="imageId">Image</label>
                        <input type="file" id="imageId" name="image" className='img' required onChange={fileHandle} />
                    </div>

                    <button className='form-btn' type="submit" onClick={submitHandle} >Submit</button>
                    <p className={message.type}>{message.text}</p>
                </form>
            </div>
        </div>
    )
}

export default FoodData;