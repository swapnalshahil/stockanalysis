import { createDOM , round} from "../utils.js";
import { OPEN, CLOSE, HIGH, LOW, VOLUME, BASE_URL } from '../constant.js';

// Update the last trading price, open price, high price, low price and volume
export function updateLastTradingPrice(){
    var ltpDOM = document.getElementById("Latest Price Info");
    ltpDOM.appendChild(createDOM("h4", "Latest Price Info"));

    var ltplistDOM = document.createElement("ol");
    ltplistDOM.style = "list-style-type:disc";

    ltplistDOM.appendChild(createDOM("li", "Last Traded Price: " + round(CLOSE[0])));
    ltplistDOM.appendChild(createDOM("li", "Open: " + round(OPEN[0])));
    ltplistDOM.appendChild(createDOM("li", "High: " + round(HIGH[0])));
    ltplistDOM.appendChild(createDOM("li", "Low: " + round(LOW[0])));
    ltplistDOM.appendChild(createDOM("li", "Volume: " + round(VOLUME[0])));

    ltpDOM.appendChild(ltplistDOM);

}