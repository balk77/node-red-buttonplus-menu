# node-red-buttonplus-menu
This Node Red flow creates a page menu structure on you Buttonplus device. Page `main` is always visible, for things like time etc. You can also assign buttons to `main`, for instance as a trigger to change the menu page.
**Installation**
* Create a new flow from `node_red_menu.flow`
* Open `01 global config` and add device configuration parameters, add page names as well. Keep `main` as first page!
* Edit `02 pagebutton` to assign buttons to `main`. See `Description` tab inside the node.
* Edit the node below `03 Contains the default button labels`. The text behind msg.label.3 will for instance appear on the right button, 1st row below display. `toplabel` defines the toplabel and `ledrgb` the color of the led
* Edit the nodes below `04 Displayitems for Main`. Add parameters like position, size, page it belongs to. When you add a field, simply copy a node and place it in the flow. Make sure to update the displayitem to a unique number.
* Do the same for `05 Displayitems from pages`; add node in the page flow you like. Top connection of the Switch node is the first page after `menu`
* `06 Switch` only needs update if you have more than 6 pages. Switch based on `msg.page` containing the page name of the pressed button.
* The subflows under `07` contain the actions per page. Signals are split between `press`, `release` and `longpress` (`msg.state`). `msg.button` contains the button number.


Notes:
* Based on firmwate 1.08
* Active page can be set by sending a page name to `<basetopic>/<bplusdevice>/page`, for instance `buttonplus/wk1/page`
* Brightness can be controlled by sending a numeric value (1-100) to `<basetopic>/<bplusdevice>/brightness`, for instance `buttonplus/wk1/brightness`
* Blocks requiring configuration are placed in yellow groups.
* Topics follow this naming convention: https://github.com/koenhendriks/ha-button-plus/wiki/mqttstructure.md <-- to be updated, page is added `buttonplus/<device>/button/<page>/<buttonID>/state`
* Uses the following additional nodes:
  * node-red-contrib-home-assistant-websocket
  * ~~https://github.com/hufftheweevil/node-red-contrib-persistent-fsm~~ no longer needed
  * ~~https://github.com/TotallyInformation/node-red-contrib-moment~~ no longer used
* Requires configuration of Node Red with [file based storage of variables](https://stevesnoderedguide.com/node-red-variables). [Read this](https://community.home-assistant.io/t/persistent-states-node-red/76174) when using the addon
* See these topics on GoT
  * https://gathering.tweakers.net/forum/list_messages/2201036
  * https://gathering.tweakers.net/forum/list_messages/2225490

## Contents of `node_red_menu.flow`
<img width="1349" alt="Screenshot 2024-01-20 at 08 40 08" src="https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/4f4f5af4-f0a8-494c-ac18-f78664ddabec">


## Partial contents of `node_red_update_display.flow`
<img width="1170" alt="Screenshot 2024-01-20 at 08 49 38" src="https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/83035ba2-f6f0-49b8-9ac3-8f900bbc9710">

