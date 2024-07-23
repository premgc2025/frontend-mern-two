
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { authContex } from '../context/authContext'
import { useNavigate } from 'react-router-dom'



function FoodUnit({item}) {

    const loggedUser = useContext(authContex)
    const [preFood,setPreFood] = useState({})
    const [newFood, setNewFood] = useState({})
    const [gram,setGram]= useState(100)
    const [newClass,setNewClass] = useState()
    const [message, setMessage] = useState({
        type:"invisible",
        text:""
    })
    const navigate = useNavigate();
 

    
    console.log("newFood",newFood)
    console.log("preFood",preFood)

    console.log("item new",item)

   

    console.log("auth", loggedUser)

    useEffect(()=>{
        setNewFood(item)
        setPreFood(item)
        setNewClass()
    },[item])

// Close item function

function closeHandle  (event){
    event.preventDefault();
    setNewClass("close-div")
}

    function calculateFood(event){
      
      
       if(event.target.value.length!==0){
        let quantity = Number(event.target.value)
        setGram(quantity)

        const copyItem = {...item}

       copyItem.calories = ((item.calories)*quantity)/100
       copyItem.protein = ((item.protein)*quantity)/100
       copyItem.carbohydrate= ((item.carbohydrate)*quantity)/100
       copyItem.fat = ((item.fat*quantity))/100
       copyItem.quantity = quantity

        setNewFood(copyItem)
    }}

    // Track Function
    function trackhandle(event){
        event.preventDefault();

        const trackData ={
            userId:loggedUser.loggedUser.id,
            foodId:newFood._id,
            details:
            {
                calories:newFood.calories,
                protein:newFood.protein,
                carbohydrate:newFood.carbohydrate,
                fat:newFood.fat
            },
            quantity:newFood.quantity,
        }

      
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

    
    <div className={`food-item single-food ${newClass} `}  >
         <p className={`${message.type} message-stiky`} >{message.text}</p>
    <div className="img-div">
        <p className='foodunit-close' onClick={closeHandle}>close &#x292B;</p>
        <img src={`http://localhost:5000/image/${item.imagepath}`} alt="img" className='img' />
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


    // -----------------
    // <div className="foodunit-container container">
    //     <div className="foodunit-parent">
    //         <div className="foodunit-image-div">
    //             <img src={`http://localhost:5000/image/${item.imagepath}`} alt="Image"  className='img'/>
    //         </div>

    //         <p className='nutrition-title'>{newFood.name} ({gram}g)</p>
    //         <div className="nutrition-parent">

    //         <div className="nutrition-list">
    //             <p className='n-title'>Calories</p>
    //             <p className='n-value'>{newFood.calories}g</p>
    //         </div>

    //         <div className="nutrition-list">
    //             <p className='n-title'>Protein</p>
    //             <p className='n-value'>{newFood.protein}g</p>
    //         </div>
    //         <div className="nutrition-list">
    //             <p className='n-title'>Carbs</p>
    //             <p className='n-value'>{newFood.carbohydrate}g</p>
    //         </div>

    //         <div className="nutrition-list">
    //             <p className='n-title'>Fat</p>
    //             <p className='n-value'>{newFood.fat}g</p>
    //         </div>

            
    //         </div>

    //         <div className="nutrition-inp">
    //             <input type="number" name="quantity" placeholder=' Enter Quantity' className='nutrition-inp-qty' onChange={calculateFood} />
    //             <button className='nutrition-btn' onClick={trackhandle}>Track</button>
    //         </div>
            

    //     </div>
    // </div>
  )
}

export default FoodUnit