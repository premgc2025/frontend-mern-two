
import React, { useState } from 'react'

function FoodData() {

const [foodsData, setFoodsData] = useState({
    name:"",
    protein:"",
    calories:"",
    fiber:"",
    carbohydrate:"",
    fat:""
})

console.log("foodData", foodsData)

function inputHandle(event){

    setFoodsData((preValue)=>{
        return( {...preValue,[event.target.name]:event.target.value}

        )
    })

}

function submitHandle(event){
    event.preventDefault();

    fetch('http://localhost:5000/foods',{
        method:"POST",
        body: JSON.stringify(foodsData),
        headers:
        {
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })




}




  return (
    <div className="fooddata-container">
        <div className="fooddata-parent">
            
            <form action="" className='fooddata-form' onClick={submitHandle}>
            <h3 className='form-title'>Foods Item Entry Form</h3>
                <div className="form-inp-div">
                    <label htmlFor="nameId">Foods Name</label>
                    <input type="text" id="nameId" name="name" className='inp' required onChange={inputHandle}/>
                </div>

                <div className="form-inp-div">
                    <label htmlFor="proteinId">Protein</label>
                    <input type="number" id="protienId" name="protein" className='inp' required onChange={inputHandle} />
                </div>

                <div className="form-inp-div">
                    <label htmlFor="caloriesId">Calories</label>
                    <input type="number" id="caloriesId" name="calories" className='inp' required onChange={inputHandle} />
                </div>

                <div className="form-inp-div">
                    <label htmlFor="fiberId">Fiber</label>
                    <input type="number" id="fiberId" name="fiber" className='inp' required onChange={inputHandle} />
                </div>

                <div className="form-inp-div">
                    <label htmlFor="carbohydrateId">Carbohydrate</label>
                    <input type="number" id="carbohydrateId" name="carbohydrate" className='inp' required onChange={inputHandle} />
                </div>

                <div className="form-inp-div">
                    <label htmlFor="fatId">Fat</label>
                    <input type="number" id="fatId" name="fat" className='inp' required onChange={inputHandle} />
                </div>


            <button className='form-btn' >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default FoodData;