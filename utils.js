import { OPEN, CLOSE, HIGH, LOW, VOLUME, BASE_URL } from "./constant.js";

// creates a JavaScript DOM element
export function createDOM(tag, text) {
    var entryDOM = document.createElement(tag);
    var textNode = document.createTextNode(text);
    entryDOM.appendChild(textNode);
    return entryDOM;
}

// empty all the divs and arrays
export function emptyAll() {
  document.getElementById("Simple Averages").innerHTML = "";
  document.getElementById("Exponential Averages").innerHTML = "";
  document.getElementById("MACD").innerHTML = "";
  document.getElementById("Bollinger Bands").innerHTML = "";
  document.getElementById("Latest Price Info").innerHTML = "";
  document.getElementById("Error").innerHTML = "";
  OPEN.length = 0;
  CLOSE.length = 0;
  HIGH.length = 0;
  LOW.length = 0;
  VOLUME.length = 0;
}

// checks if a object contains all the valid parameters
export function isvalid(priceObject){
  var keys = ['open', 'close', 'high', 'low', 'volume'];
  
  for(var i = 0; i < keys.length; i++){
    if(!(keys[i] in priceObject)){
      return false;
    }
  }
  return true;
}

// round the number
export function round(val){
  return Math.round(val * 100) / 100;
}

// calculate simple moving average
export function calculateAverage(days, start=0){
  if(start + days > CLOSE.length){
    return 0;
  }
  var sum = 0;
  for(var i = start; i < start + days; i++){
    sum = sum + CLOSE[i];
  }
  return sum/days;
}

// calculate exponential moving average
export function calculateExponentialAverage(days, start=0){
  var expoAverage = calculateAverage(days, start+days);

  var multiplier = 2/(days+1);  // multiplier = 2/(number of observations + 1)

  for(var i = start + days -1; i >= start; i--){
    expoAverage = CLOSE[i] * multiplier + expoAverage * (1 - multiplier);
  }
  return expoAverage;
}

// calculate standard deviation
export function calculateStandardDeviation(days, start=0){
  var average = calculateAverage(days, start);
  var sum = 0;
  for(var i = start; i < start + days; i++){
    sum = sum + Math.pow((CLOSE[i] - average), 2);
  }
  sum = Math.sqrt(sum/days);
  return sum;
}

// get the url from base url and symbol
export function getURL(symbol) {
    var startDate = new Date();
    var endDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    // console.log(startDate, " ", endDate);
    var url = BASE_URL;
    url = url.replace("{stock}", symbol).replace("{start-date}", Math.floor(startDate.getTime() / 1000)).replace("{end-date}", Math.floor(endDate.getTime() / 1000));
    // console.log(url);
    return url;
}
