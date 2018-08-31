![alt text](img/RMFrp.png "Logo Title Text 1")


#### Outline
This repository consists of two custom javascripts, namely - events.js and measurement-framework.js.
These scripts allow for the implementation of RMF in GTM, ultimately leading to segmentation of consumers into
different "funnel stages".


#### Head-ups
Unique Google Analytics (GA) variables is used in order for the scripts to integrate properly with GA.
- In measurement-framework.js ```clientIdSetter(<index_no>)``` must be set for each GA account.
- In measurement-framework.js the userTrails section, must be modified in accordance to funnel-stage
agreements made with clients.

The following two screenshots exemplify the path you need to use in order to obtain the clientIdSetter value:

![alt text](img/custom_dimensions.png)

![alt text](img/client_id.png)

When setting the client ID, you must also remember to set the following custom dimensions:

raw user trail, user funnel stage, event funnel stage and triggering event

Finally, the following goal must be set up in Google Analytics for integrating data with datastudio.
The goal menu can be accessed through the view tab.

Goal : User Funnel Stage Changed
Goal Type : Event

## Installation
A chronological list is provided below - explaining the installation of RMF:

- Make sure you have installed npm. 
- Run ```npm install i measurement-framework```
- run ```npm install``` (installing devdependencies)

#### Compressing the measurement-framework.js code for GTM
Finally, to compress the measurement-framework.js file, type the following into
the terminal:

- run ```rollup -c```


Confirming the compression has been successful, look inside the dist folder.
If the file is there, copy its contents and make a custom html tag in the desired GTM account.
In the custom html section, type the following:

```
<script>
<between the script tags insert the copied compression of measurement-framework.js>
</script>
```
Additionally, the trigger to be used is "All Pages"

## ![alt text](img/RMF.png "Logo Title Text 1")