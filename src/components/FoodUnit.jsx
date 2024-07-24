
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { authContex } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../../helper'


function FoodUnit({ item }) {

    const loggedUser = useContext(authContex)
    const [preFood, setPreFood] = useState({})
    const [newFood, setNewFood] = useState({})
    const [gram, setGram] = useState(100)
    const [newClass, setNewClass] = useState()
    const [message, setMessage] = useState({
        type: "invisible",
        text: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        setNewFood(item)
        setPreFood(item)
        setNewClass()
    }, [item])

    // Close item function

    function closeHandle(event) {
        event.preventDefault();
        setNewClass("close-div")
    }

    // Calculate Foods
    function calculateFood(event) {

        if (event.target.value.length !== 0) {
            let quantity = Number(event.target.value)
            setGram(quantity)

            const copyItem = { ...item }

            copyItem.calories = ((item.calories) * quantity) / 100
            copyItem.protein = ((item.protein) * quantity) / 100
            copyItem.carbohydrate = ((item.carbohydrate) * quantity) / 100
            copyItem.fat = ((item.fat * quantity)) / 100
            copyItem.quantity = quantity

            setNewFood(copyItem)
        }
    }

    // Track Function
    function trackhandle(event) {
        event.preventDefault();

        const trackData = {
            userId: loggedUser.loggedUser.id,
            foodId: newFood._id,
            details:
            {
                calories: newFood.calories,
                protein: newFood.protein,
                carbohydrate: newFood.carbohydrate,
                fat: newFood.fat
            },
            quantity: newFood.quantity,
        }

        //  Fetch Track food 
        if (trackData.length !== 0) {

            fetch(`${baseurl}/trackings`, {
                method: "POST",
                body: JSON.stringify(trackData),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${loggedUser.loggedUser.token}`
                }
            })
                .then((res) => {                   
                    return res.json()
                }).then((data) => {

                    setMessage({
                        type: "visible",
                        text: data.Message
                    })
                    setTimeout(() => {
                        setMessage({
                            type: "invisible",
                            text: ""
                        })
                    }, 5000);

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div className={`food-item single-food ${newClass} `}  >
            <p className={`${message.type} message-stiky`} >{message.text}</p>
            <div className="img-div">
                <p className='foodunit-close' onClick={closeHandle}>close &#x292B;</p>
                <img src={`${baseurl}/image/${item.imagepath}`} alt="img" className='img' />
            </div>
            <p className='foods-table-title'>{newFood.name} (per {newFood.quantity}G)</p>
            <table className='foods-table'>
                <thead>
                    <th>Calories</th>
                    <th>Proteins</th>
                    <th>Carbs</th>
                    <th>Fats</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{newFood.calories} kCal</td>
                        <td>{newFood.protein}g</td>
                        <td>{newFood.carbohydrate}g</td>
                        <td>{newFood.fat}g</td>

                    </tr>
                </tbody>
            </table>

            <div className="nutrition-inp">
                <input type="number" name="quantity" placeholder=' Enter Quantity' className='nutrition-inp-qty' onChange={calculateFood} />

                <button className='nutrition-btn' onClick={trackhandle}>Track</button>
            </div>
        </div>
    )
}

export default FoodUnit