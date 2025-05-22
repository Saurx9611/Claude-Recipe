import React from "react"
import CaludeRecipe from "./CaludeRecipe"
import Ingredientlist from "./Ingredientlist"
import {getRecipeFromMistral} from "../ai"
export default function Main(){
    const [ingredients,setIngredients]=React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection=React.useRef(null)
    const token = import.meta.env.VITE_API_TOKEN;
    // console.log("env:", import.meta.env);
    // console.log("token:", import.meta.env.VITE_API_TOKEN)
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients=>[...prevIngredients,newIngredient])
    }
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            // recipeSection.current.scrollIntoView({behavior: "smooth"})
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])
    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
        // console.log(recipeMarkdown)
    }
    return(
        <>
           <main className="container">
              <form 
              action={addIngredient}
              className="add-ingredient-form"> 
                  <input 
                     type="text" 
                     placeholder="e.g. oreganao"
                     aria-label="Add-ingredient"
                     name="ingredient"
                  />
                  <button >Add ingredient</button>
              </form>
              {ingredients.length >0 && 
              <Ingredientlist 
                 ref={recipeSection}
                 getRecipe={getRecipe}  
                 ingredients={ingredients}
              /> 
              }
              { 
                 recipe && <CaludeRecipe recipe={recipe}/>
              }
           </main>
        </>
    )
}