// AddRecipeForm component
import { useState } from 'react';


const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        ingredients: '',
        steps: '',
      });
    const [isFormValid, setIsFormValid] = useState(false);

      const validateForm = () => {   
        const newErrors = {
          title: '',
          ingredients: '',
          steps: '',
        };
        let isValid = true;
    
        if (title.trim() === '') {
          newErrors.title = 'Recipe title is required';
          isValid = false;
        }
        if (ingredients.trim() === '') {
          newErrors.ingredients = 'Ingredients are required';
          isValid = false;
        }

        if (steps.trim() === '') {
          newErrors.steps = 'Steps are required';
          isValid = false;
        }

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

    const handleSubmit = (event) => {
      event.preventDefault();
      validateForm();
      if (isFormValid) {
        const newRecipe = {
            title,
            ingredients,
            steps,
          };
      setTitle('');
      setIngredients('');
      setSteps('');

    };

    return (
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-7 lg:px-8">
       <h1 className="text-3xl font-bold mb-4">Add a New Recipe Here</h1>
       <form onSubmit={handleSubmit}>
      
      <div className="mb-4"> 
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title"> Recipe Title  </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients"> Ingredients </label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ingredients"
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="steps"> Preparation Steps </label>
         <textarea className="shadow appearance-none border rounded w-full py-2 px-3
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="steps"
          name="steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>
         <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
           rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Add Recipe
        </button>

      </form>
    </div>
    )
   }};
export default AddRecipeForm;