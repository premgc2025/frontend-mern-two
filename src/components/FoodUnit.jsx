
import React, { useEffect, useState } from 'react'

function FoodUnit({item}) {

    const [preFood,setPreFood] = useState({})
    const [newFood, setNewFood] = useState({})
    const [gram,setGram]= useState(100)
    console.log("newFood",newFood)
    console.log("preFood",preFood)

    useEffect(()=>{
        setNewFood(item)
        setPreFood(item)
    },[item])

    function calulateFood(event){
      
      
       if(event.target.value.length!==0){
        let quantity = Number(event.target.value)
        setGram(quantity)

        const copyItem = {...item}

        copyItem.name = preFood.name;
       copyItem.protein = (preFood.protein*quantity)/100

        setNewFood(copyItem)
    }}

  return (
    <div className="foodunit-container container">
        <div className="foodunit-parent">
            <div className="foodunit-image-div">
                <img src="#" alt="Image"  className='foodunit-image'/>
            </div>

            <p className='nutrition-title'>{newFood.name} ({gram}g)</p>
            <div className="nutrition-parent">

            <div className="nutrition-list">
                <p className='n-title'>Protein</p>
                <p className='n-value'>{newFood.protein}g</p>
            </div>

            <div className="nutrition-list">
                <p className='n-title'>Protein</p>
                <p className='n-value'>{item.protein}g</p>
            </div>
            <div className="nutrition-list">
                <p className='n-title'>Protein</p>
                <p className='n-value'>{item.protein}g</p>
            </div>

            <div className="nutrition-list">
                <p className='n-title'>Protein</p>
                <p className='n-value'>{item.protein}g</p>
            </div>

            
            </div>

            <div className="nutrition-inp">
                <input type="number" name="quantity" placeholder=' Enter Quantity' className='nutrition-inp-qty' onChange={calulateFood} />
                <button className='nutrition-btn'>Track</button>
            </div>
            

        </div>
    </div>
  )
}

export default FoodUnit