
import React, { useEffect, useRef, useState } from 'react'
import { authContex } from '../context/authContext';
import { useContext } from 'react';



function Foods() {
    const [food, setFood] = useState([]);
    const loggedUser = useContext(authContex)
    const [message, setMessage] = useState({
        type:"invisible",
        text:""
    })
 
  

    const newFood = food.map((obj)=>({ ...obj}))
 
  



    const [items,setItems] = useState(newFood)
    
    console.log("Food search",items)
  

    const [gram, setGram] = useState(500)

   

  
   

    useEffect(() => {

        fetch("http://localhost:5000/foods", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${loggedUser.loggedUser.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {

                setFood(data)
                setItems(data)           
              
             
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    function calculateMacro(event,i) {
       
        if(event.target.value.length!==0)
        {
            let quantity = Number(event.target.value)
            setGram(quantity)
        
           const copyFood = [...newFood]

           copyFood[i].calories = ((newFood[i].calories)*quantity)/newFood[i].quantity
           copyFood[i].protein = ((newFood[i].protein)*quantity)/newFood[i].quantity
           copyFood[i].carbohydrate = ((newFood[i].carbohydrate)*quantity)/newFood[i].quantity
           copyFood[i].fat = ((newFood[i].fat)*quantity)/newFood[i].quantity
           copyFood[i].quantity = quantity


           setItems(copyFood)
        }}

         // Track Function
    function trackhandle(event,i){
        event.preventDefault();

        const trackData ={
            userId:loggedUser.loggedUser.id,
            foodId:items[i]._id,
            details:
            {
                calories:items[i].calories,
                protein:items[i].protein,
                carbohydrate:items[i].carbohydrate,
                fat:items[i].fat
            },
            quantity:items[i].quantity,
        }
        console.log("data for Track",trackData)
        if(trackData.length!==0){

            fetch('http://localhost:5000/trackings', {
                method:"POST",
                body:JSON.stringify(trackData),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${loggedUser.loggedUser.token}`
                }
                
            })
            .then((res)=>{
                console.log(res)
                return res.json()
            }).then((data)=>{

                setMessage({
                    type:"visible",
                    text:data.Message
                })
                setTimeout(() => {
                    setMessage({
                        type:"invisible",
                        text:""
                    })
                }, 5000);

            })
            .catch((err)=>{
                console.log(err)
            })
        }


    }

   
    return (
        <div className="food-container ">
             <p className={`${message.type} message-stiky`} >{message.text}</p>
           
            <div className="food-parent">

                {
                    items.map((item,i) => {
                    


                        return (


                            <div className="food-item" key={i + 1} >
                                <div className="img-div">
                                    <img src={`http://localhost:5000/image/${item.imagepath}`} alt="img" className='img' />
                                </div>
                                <p className='foods-table-title'>{item.name} (per {item.quantity}G)</p>
                                <table key={i} className='foods-table'>
                                    <thead>
                                        <th>Calories</th>
                                        <th>Proteins</th>
                                        <th>Carbs</th>
                                        <th>Fats</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.calories} kCal</td>
                                            <td>{item.protein}g</td>
                                            <td>{item.carbohydrate}g</td>
                                            <td>{item.fat}g</td>

                                        </tr>
                                    </tbody>
                                </table>
                                   
                                <div className="nutrition-inp">
                                    <input type="number" name="quantity" placeholder=' Enter Quantity' className='nutrition-inp-qty' onChange={(event)=>{
                                        calculateMacro(event,i)
                                    }} />
                                   
                                    <button className='nutrition-btn' onClick={(event)=>{
                                        trackhandle(event,i)
                                    }}>Track</button>
                                </div>
                             
                                
                            </div>
                            

                        )

                    })
                }



            </div>
           
        </div>
    )
}

export default Foods;