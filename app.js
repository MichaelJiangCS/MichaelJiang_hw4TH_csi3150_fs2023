import usedCars from "./usedCars.js";

const carList = document.querySelector(".carList");

//const minYearInput = document.getElementById("minYearInput");
//const maxYearInput = document.getElementById("maxYearInput");
const carMake = document.getElementById("carBrand");
const carMileage = document.getElementById("mileageInput");
//const carPrice = document.getElementById("priceInput");

const filterButton = document.querySelector(".filterButton");

function dataInput (allCars) {
    carList.innerHTML = ``;

    allCars.forEach(car => {
        const carDiv = document.createElement("div"); //create a div tag for each car data, element = tag name
        carDiv.classList.add("carData"); // create class name for each carDiv
        carDiv.innerHTML = 
        `<p>

        year: ${car.year},
        make: ${car.make},
        model: ${car.model},
        mileage: ${car.mileage},
        price: ${car.price},
        color: ${car.color},
        gasMileage: ${car.gasMileage}.
    
        </p>`;

        carList.append(carDiv);
    });
}; 

// input car data into .carList
dataInput(usedCars); 

// filter button on click: apply filter & update filtered cars data
filterButton.addEventListener("click", () => {
    const filteredCars = filter(usedCars);
    // TODO: need validation on initial filter click
    dataInput(filteredCars);
});

// filter function
function filter(cars) {
    const minYear = parseInt(document.getElementById("minYearInput").value) || 0;
    const maxYear = parseInt(document.getElementById("maxYearInput").value) || Infinity;
    //const selectedMakeOption = carMake.options[userSelect.selectedIndex];
    //const selectedMake = selectedMakeOption.textContent;
    const make = carMake.value;
    const maxMileage = parseInt(document.getElementById("mileageInput").value) || Infinity;
    const maxPrice = parseInt(document.getElementById("priceInput").value) || Infinity;
    const selectedColor = Array.from(document.querySelectorAll(".color-checkbox:checked")).map(
        input => input.value
    );

    const filteredCars = cars.filter(car => {
        return car.year >= minYear
        && car.year <= maxYear
        && (car.make === make || make === "All") 
        && car.mileage <= maxMileage
        && car.price <= maxPrice
        && (selectedColor.includes(car.color) || selectedColor.length === 0);
    });
    

    return filteredCars;
};