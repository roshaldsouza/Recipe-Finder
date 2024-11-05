// Fetch recipes based on user input
function searchRecipe() {
    const query = document.getElementById('searchInput').value;
    if (query === '') {
        alert('Please enter a recipe name!');
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.meals);
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

// Display recipes in the DOM
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    if (!recipes) {
        recipeList.innerHTML = '<p>No recipes found. Try another search!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');

        recipeItem.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h2>${recipe.strMeal}</h2>
            <p><strong>Category:</strong> ${recipe.strCategory}</p>
            <p><strong>Area:</strong> ${recipe.strArea}</p>
            <a href="${recipe.strSource}" target="_blank">View Recipe</a>
        `;

        recipeList.appendChild(recipeItem);
    });
}
