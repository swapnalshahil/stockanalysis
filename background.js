import { createDOM, emptyAll, getURL, isvalid } from "../utils.js";
import { OPEN, CLOSE, HIGH, LOW, VOLUME } from './constant.js';
import { updateLastTradingPrice } from './components/ltp.js';
import { updateAverage, updateExponentialAverage } from "./components/average.js";
import { updateBollingerBand } from "./components/bollingerband.js";
import { updateMACD } from "./components/macd.js";

function getStockReport(stockUrl) {
  emptyAll();
  // console.log("hello from getStockReport");
  jQuery.get(stockUrl, function (data) {
      var dataStr = String(data);
      var indexofHistoricalData = dataStr.indexOf("HistoricalPriceStore");
      var jsonArrayStart = indexofHistoricalData + 32;
      var jsonArrayEnd = jsonArrayStart+1;
      while(dataStr[jsonArrayEnd] != ']'){
        jsonArrayEnd = jsonArrayEnd + 1;
      }
      var jsonString = dataStr.substring(jsonArrayStart, jsonArrayEnd+1);
      
      try {
        var jsonArray = jQuery.parseJSON(jsonString);
      } catch (error) {
        document
          .getElementById("Error")
          .appendChild(createDOM("p", " Invalid Stock Symbol"));
          // console.log("Invalid Stock Symbol");
          return;
      }
        // console.log(jsonArray);
        for (var i in jsonArray) {
          var priceObject = jsonArray[i];
          if(isvalid(priceObject)){
            OPEN.push(priceObject.open);
            CLOSE.push(priceObject.close);
            HIGH.push(priceObject.high);
            LOW.push(priceObject.low);
            VOLUME.push(priceObject.volume);
          }
        }
        if(CLOSE.length < 100){
            // console.log("Insufficient Data");
            document.getElementById("Error").appendChild(createDOM("p", " Insufficient Data Points"));
            return;
        }

        updateLastTradingPrice();
        updateAverage();
        updateExponentialAverage();
        updateMACD();
        updateBollingerBand();
    });
    
}
window.onload = function () {
    // emptyAll();
    var btn = document.getElementById("getStockReport");
    var stocksymbol = document.getElementById("stocksymbol");

    btn.onclick = function () {
        // emptyAll();
        // console.log(stocksymbol.value);
        var symbol = stocksymbol.value;
        var stockUrl = getURL(symbol);
        // console.log(stockUrl);
        getStockReport(stockUrl);
    }
}