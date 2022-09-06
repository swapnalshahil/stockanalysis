import { createDOM, round, calculateExponentialAverage } from "../utils.js";
/*
Moving average convergence divergence (MACD) is a trend-following 
momentum indicator that shows the relationship between two moving averages 
of a security’s price. The MACD is calculated by subtracting the 26-period 
exponential moving average (EMA) from the 12-period EMA.
*/
export function updateMACD(){
    var macdDOM = document.getElementById("MACD");
    macdDOM.appendChild(createDOM("h4", "MACD"));

    var ema12 = new Array();
    var ema26 = new Array();

    for(var index =0; index<18;index++){
        ema12.push(calculateExponentialAverage(12, index));
        ema26.push(calculateExponentialAverage(26, index));
    }

    var signalLineValue = 0;
    var macdvalue = ema12[0] - ema26[0];
    for( var i=9;i<18;i++){
        signalLineValue += ema12[i] - ema26[i];
    }
    signalLineValue = signalLineValue/9;
    var multiplier = 2/(9+1);   // days = 9;

    for(var i = 8;i>=0;i--){
        signalLineValue = (ema12[i] - ema26[i]) * multiplier + (signalLineValue * (1-multiplier));
    }
    var trendtype = "";
    if(signalLineValue > macdvalue){
        trendtype = "MACD Line is below Signal Line, indicating a Bearish trend.";
    }else if(signalLineValue < macdvalue){
        trendtype = "MACD Line is above Signal Line, indicating a Bullish trend.";
    }else{
        trendtype = "MACD Line is equal to Signal Line, indicating a Neutral trend.";
    }
    var macdListDOM = document.createElement("ol");
    macdListDOM.style = "list-style-type:disc";
    macdListDOM.append(createDOM("li", "MACD value is: " + round(macdvalue)));
    macdListDOM.append(createDOM("li", "Signal Line value is: " + round(signalLineValue)));
    macdListDOM.append(createDOM("li", trendtype));

    macdDOM.appendChild(macdListDOM);


}
