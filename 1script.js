//alert("just checking connections");
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

//event Listener

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click' , getMealRecipe);

//get meal list that matches with the ingredients

function getMealList(){
    let searchInputTxt = document.getElementById("search-input").value.trim();
    //console.log(searchInputTxt);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idmeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt= "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Meal NOT FOUND :)";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
}

//get Meal Recipe
function getMealRecipe(e){
    e.preventDefault();
    //console.log(e.target);
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))


    }
}

//CREATE A MODAL
function mealRecipeModal(meal) {
    console.log(meal);
    meal=meal[0];
    let  html= `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instruction:</h3>
            <p>${meal.strInstruction}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
        `;
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
}