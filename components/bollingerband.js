import { createDOM, round, calculateStandardDeviation, calculateAverage } from "../utils.js";

/*
A Bollinger Band is a technical analysis tool defined by a set of 
trendlines plotted two standard deviations (positively and negatively) 
away from a simple moving average (SMA) of a security's price.
*/

export function updateBollingerBand() {
    // console.log("from bollingerBand.js");
    var bollingerDOM = document.getElementById("Bollinger Bands");
    bollingerDOM.appendChild(createDOM("h4", "Bollinger Bands"));

    var middleBollingerBand = calculateAverage(20);
    var upperBollingerBand = middleBollingerBand + calculateStandardDeviation(20);
    var lowerBollingerBand = middleBollingerBand - calculateStandardDeviation(20);

    var bollingerlistDOM = document.createElement("ol");
    bollingerlistDOM.style = "list-style-type:disc";

    bollingerlistDOM.appendChild(createDOM("li", "Upper Bollinger Band value: " + round(upperBollingerBand)));
    bollingerlistDOM.appendChild(createDOM("li", "Middle Bollinger Band value: " + round(middleBollingerBand)));
    bollingerlistDOM.appendChild(createDOM("li", "Lower Bollinger Band value: " + round(lowerBollingerBand)));
    bollingerlistDOM.appendChild(
      createDOM(
        "li",
        `For a Bullish trade setup, Upper and Lower Bollinger Band can be used as Target and Stoploss respectively
         and vice-versa for a Bearish trade setup.`)
    );


    bollingerDOM.appendChild(bollingerlistDOM);

}
