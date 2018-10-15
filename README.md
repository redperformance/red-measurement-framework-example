[![alt text](img/RMFrp.png "Logo Title Text 1")](https://redperformance.no/)

#### Outline
The RED Measurement Framework (RMF) repository relies on two custom javascripts, namely - events.js and measurement-framework.js.
These scripts allow for the implementation of RMF in Google Tag Manager (GTM), ultimately leading to segmentation of consumers into different "funnel stages".

#### GTM and GA setup
*GA setup*

Unique Google Analytics (GA) variables are used in order for the script and GTM implementation to integrate properly with GA.

- In measurement-framework.js ```clientIdSetter(<index_no>)``` must be set for each GA account.
- In measurement-framework.js the userTrails section, must be modified in accordance to funnel-stage
agreements.

The following two screenshots exemplify the path you need to use in order to obtain the clientIdSetter value:

![alt text](img/custom_dimensions.png)
![alt text](img/client_id.png)

When setting the client ID, you must also remember to set the following custom dimensions:

- Raw user trail 
- User funnel stage 
- Event funnel stage
- Triggering event

*GTM setup*

In GTM the following steps must be done in order for RMF to be implemented correctly.

Variables to create:

- **Custom Task Runner**
	- Name : Custom Task Runner
	- Variable Type : Data Layer Variable
	- Data Layer Variable Name : customTaskRunner
	- Data Layer Version : Version 2

- **User Funnel Stage Changed**
	- Name : User Funnel Stage Changed
	- Variable Type : Data Layer Variable
	- Data Layer Variable Name : funnelStageChanged
	- Data Layer Version : Version 2	

- **User Funnel Stage**
	- Name : User Funnel Stage
	- Variable Type : Data Layer Variable
	- Data Layer Variable Name : funnelStage
	- Data Layer Version : Version 2

- **User Funnel Change Label**
	- Name : User Funnel Change Label
	- Variable Type : Data Layer Variable
	- Data Layer Variable Name : funnelChangeLabel
	- Data Layer Version : Version 2

- **User Raw Trail**
	- Name : User Raw Trail
	- Variable Type : 1st Party Cookie
	- Cookie Name : rmf

- **Triggering Event**
	- Name : Triggering Event
	- Variable Type : Data Layer Variable
	- Data Layer Variable Name : eventAction
	- Data Layer Version : Version 2

- **GA settings**
	- The below screenshot documents the configuration:
	![alt text](img/GAsettings.png)
	

Triggers to create:

- **User Funnel Stage Changed**
	- The below picture documents the configuration:
	![alt text](img/Userfunnelstagechanged.png) 	
- **RMF Timer**
	- The below picture documents the configuration:
	 ![alt text](img/RMF_timertrigger.png)

Tags to create:

- **GA - RMF Timer**
	- The below screenshot and code snippt documents the 	configuration:
	![alt text](img/RMF_timertag.png) 

	- the content of the HTML in the Custom HTML Tag: 

```
<script>
(function() {
    // CHANGE THESE THREE:
    var eventName = 'RMF sequence'; // The event name that is pushed into dataLayer
    var interval = 1500; // The interval in milliseconds
    var limit = 1; // The number of times the timer fires

    // OTHER SETTINGS:
    var timerNumber = 1;
    var startTime = new Date().getTime();

    var fireTimer = function() {
      var timeNow = new Date().getTime();
      window.dataLayer.push({
        'event' : eventName,
        'custom.timerCurrentTime' : timeNow,
        'custom.timerElapsedTime' : timeNow - startTime,
        'custom.timerStartTime' : startTime,
        'custom.timerEventNumber' : timerNumber,
        'custom.timerId' : timerId,
        'custom.timerInterval' : interval,
        'custom.timerLimit' : limit
      });
      timerNumber += 1;
      if (limit < timerNumber) { 
        window.clearInterval(timerId);
      }
    };

    var timerId = window.setInterval(fireTimer, interval);
  })();
</script>
```

- **GA - User Funnel Stage Changed**
	- The below screenshot documents the configuration:
	![alt text](img/UserFStageTag.png)

- **GA - Debug User Funnel Stages**
	- The below screenshot documents the configuration:
	![alt text](img/Debug.png)

For the above tags the User Funnel Stage Changed trigger, we just created, is to be used.

## Installation
A chronological list is provided below - explaining the installation of RMF:

- Make sure you have installed npm. 
- $ ```npm install i measurement-framework```
- $ ```npm install``` (installing devdependencies)

#### Compressing the measurement-framework.js code for GTM
Finally, to compress the measurement-framework.js file, type the following into
the terminal:

- $ ```rollup -c```

Confirming the compression has been successful, look inside the dist folder.
If the file is there, copy its contents and make a custom html tag in the desired GTM account.

*GTM tag setup*

In the custom html section, type the following:

```
<script>
<between the script tags insert the copied compression of measurement-framework.js>
</script>
```
Additionally, the trigger to be used is "All Pages". Finally, pick and awesome name for your RMF tag.

## [![alt text](img/RMF.png "Logo Title Text 1")](https://redperformance.no/)