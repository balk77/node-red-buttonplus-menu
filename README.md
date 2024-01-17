# node-red-buttonplus-menu
**Complete rewrite**


Notes:
* Topics on Buttonplus device **are changed**. **MQTT** handles and maintains the state of the menu
* Topics follow this naming convention: https://github.com/koenhendriks/ha-button-plus/wiki/mqttstructure.md <-- to be updated, page is added `buttonplus/<device>/button/<page>/<buttonID>/state`
* Uses the following additional nodes:
  * node-red-contrib-home-assistant-websocket
  * https://flows.nodered.org/node/node-red-contrib-state-machine
* Requires configuration of Node Red with [file based storage of variables](https://stevesnoderedguide.com/node-red-variables). [Read this](https://community.home-assistant.io/t/persistent-states-node-red/76174) when using the addon
* See these topics on GoT
  * https://gathering.tweakers.net/forum/list_messages/2201036
  * https://gathering.tweakers.net/forum/list_messages/2225490

## Contents of `node_red_menu.flow`
<img width="954" alt="Screenshot 2024-01-14 at 17 13 32" src="https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/8583e361-bc71-4ce0-945b-2759a7be226a">

## Contents of `node_red_update_display.flow`
<img width="678" alt="Screenshot 2024-01-14 at 17 16 32" src="https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/ebca9cea-3545-4ae5-bfa6-902950640b46">

