# node-red-buttonplus-menu

Notes:
* Topics on Buttonplus device remain unchanged. Node red handles maintains the state of the menu
* Topics follow this naming convention: https://github.com/koenhendriks/ha-button-plus/wiki/mqttstructure.md
* Uses the following additional nodes:
  * node-red-contrib-home-assistant-websocket
* Requires configuration of Node Red with [file based storage of variables](https://stevesnoderedguide.com/node-red-variables). [Read this](https://community.home-assistant.io/t/persistent-states-node-red/76174) when using the addon

Contents of `node_red_menu.flow`
![node-red-buttonplus-menu-node_red_menu flow](https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/f3d03355-e091-4de2-8783-b7629eaf5abd)

Contents of `node_red_update_display.flow`
![node-red-buttonplus-menu-node_red_update_display flow](https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/d6bd88e3-5da6-47e0-ab0a-b91796e41f9c)
