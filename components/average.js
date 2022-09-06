import { createDOM, calculateAverage, round, calculateExponentialAverage } from "../utils.js";

// updateAverage -> Simple Average (Equal Weightage to each data points)
export function updateAverage() {
    // console.log("from average.js");
    var averageDOM = document.getElementById("Simple Averages");
    averageDOM.appendChild(createDOM("h4", "Simple Averages"));
    
    var averagelistDOM = document.createElement("ol");
    averagelistDOM.style = "list-style-type:disc";

    var average10 = calculateAverage(10);
    var average30 = calculateAverage(30);
    var average60 = calculateAverage(60);
    // var average100 = calculateAverage(100);
    averagelistDOM.appendChild(createDOM("li", "10 Days Average: " + round(average10)));
    averagelistDOM.appendChild(createDOM("li", "30 Days Average: " + round(average30)));
    averagelistDOM.appendChild(createDOM("li", "60 Days Average: " + round(average60)));
    // averagelistDOM.appendChild(createDOM("li", "100 Days Average: " + round(average100)));
    
    averageDOM.appendChild(averagelistDOM);
}

// updateExponentialAverage -> (EMA) Exponential Moving Average (More Weightage is given to recent data points)
export function updateExponentialAverage() {
    // console.log("from expo average.js");
    var averageDOM = document.getElementById("Exponential Averages");
    averageDOM.appendChild(createDOM("h4", "Exponential Averages"));
    
    var averagelistDOM = document.createElement("ol");
    averagelistDOM.style = "list-style-type:disc";

    var average10 = calculateExponentialAverage(10);
    var average30 = calculateExponentialAverage(30);
    var average60 = calculateExponentialAverage(60);
    
    averagelistDOM.appendChild(createDOM("li", "10 Days Exponential Average is: " + round(average10)));
    averagelistDOM.appendChild(createDOM("li", "30 Days Exponential Average is: " + round(average30)));
    averagelistDOM.appendChild(createDOM("li", "60 Days Exponential Average is: " + round(average60)));
    
    
    averageDOM.appendChild(averagelistDOM);
}