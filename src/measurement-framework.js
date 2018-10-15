import MeasurementFramework, {
    contentEngaged,
    userTrail,
    clientIdSetter,
    customTask,
    ajaxComplete
} from "measurement-framework"
import * as event from "./events";
import events from "./events";
import {greater} from "measurement-framework/lib/userTrail";


// Content Viewed (contentEngagement) Event Name
let eventName = "Content Viewed"
// Content Viewed (contentEngagement) Event Timer
let secondsToTrigger = 20

// contentEngagement Example for debug
contentEngaged(eventName, secondsToTrigger, function (dataLayerPush) {
    dataLayerPush.debugText = "Target time for Content Viewed is 20 seconds."
})




// customTask Example
customTask(function (model) {
    let tid = model.get("&tid");
    console.log("GATID: ", tid);
});


// clientIdSetter Example. 1 = index in Google Analytics/Google Tag Manager
clientIdSetter(1);


//Usertrail Example
userTrail(events, [
    function () {
        return "Aware"; // Aware if you just visit
    },
    function () {
        return (
            greater(event.CONTENT_VIEWED, 0) || // 0 = greater than 0
            greater(event.INTERESTED_EVENT, 0) ||
            greater(event.INTERESTED_EVENT_TWO, 0)
            // 0 = greater than 0
        ) ? "Interested" : false;
    },
    function () {
        return (
            greater(event.CONSIDERING_EVENT, 1)
        ) ? "Considering" : false;
    },
    function () {
        return (
            greater(event.STORE_VISIT_INTENT_EVENT, 0)
        ) ? "Store Visit Intent" : false;

    },
    function () {
        return (
            greater(event.CART_VIEWED, 0)
        ) ? "Ecommerce Intent" : false;

    },
    function () {
        return (
            greater(event.ORDER_COMPLETED, 0)
        ) ? "Ecommerce Purchase" : false;

    }
]);


MeasurementFramework.init()