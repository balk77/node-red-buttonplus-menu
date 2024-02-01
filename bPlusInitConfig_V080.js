// In this node you specify the basic information for one
// particular button+ in your environment.
// Put this function between an inject and an MQTT Publish
// And only run it ONCE. Except if you replace a ButtonPlus
// or the unit is reset to the factory settings.
// <Inject> --- <bPlusInitConfig> --- <MQTT Punblish>
// The configuration is sent to the button+ device and
// saved to the retained storage on disk.
// Make sure you enabled file based retension for your broker
// (See the wiki on https://github.com/balk77/node-red-buttonplus-menu/wiki)
// V0.80, 20240201 Rene Boeije
//
// The name of your device. Can be the room where it is placed
// No spaces or special characters, case sensitive
var bplusdevice = "werkkamer";
// The IP-address of your button+. It is displayed on the display unless
// you (or other function) disabled it. If not visible, press the left
// button next to the USB-connector at the bottom of your button+. A 
// popup will show IP-Address,  firmware version and internal temperature.
var ip = "192.168.0.XXX"; 
// The base topic of all Button+ related MQTT. Only change if you have 
// a good reason and know the impact.
var basetopic = "buttonplus/" // first level of the mqtt topic
// The MAC-address of your unit. Just for reference, you are not able to change it.
// (In the unit, it is the pysical MAC-address)
var mac = "F4:12:FA:44:F2:6C"; 
//var firmware = "1.08"; // Depricated
// The location of the device. Can be the floor or room number.
// Is free text for display purposes
var location = "verdieping";
// Auto backup determines if the setup is saved on the buttonPlus server.
// True: It is saved on every change
// False: It is not saved, sof if y reset the unit to factory settings
// the config is lost.
// NOTE: Not sure if this is in operation.
var autobackup = true; // keep at true, unsure what it does
// By default, the IP-address and Wifi status is displayed in the lower
// left corner. This will overwrite the label and text of button 0, which is 
// not desirable. Set it to 0 to disable this function, to 1 to put it on top
// or 2 to leave it at the default position 
var statusbar = 0; 

// Number of bars below the ButtonPlus display (1-3)
// If 1, the display is at its lowest position (3rd connector from top)
// If 3, it is on the top position.
var numbars = 1;
// The name of the MQTT-broker the button+ connects to. This Node-Red flow 
// currently only supports one MQTT-broker. The ID is a name.
// No spaces and/or special characters.
var mqttbrokerid = "VM";
// The IP-address of your MQTT-broker. (Maybe domain name is allowed, not tested)
var mqtturl = "mqtt://192.168.0.XX";
// The MQTT-port teh broker listens to, normally 1883
var mqttport = 1883;
// The Websocket-port the broker listens to, normally 9001
// Set o 0 if not used
var mqttwsport = 0;
// MQTT broker credentials
var mqttusername = "XXX";
var mqttpassword = "XXX";

// add pages, should start with "main"; 
// when more pages are added you should change some switch blocks as well
var pages = ["main", "avond", "muziek","overdag"];
var buttonpages = ["main", "avond", "muziek", "overdag"];

// nothing to be changed below this line
// -------------------------------------

// retrieve existing config from disk, or create when non-existent
// this retrieves configuration for all configured B+ devices
var bplusconfig = global.get("bplusconfig", "file");
if (bplusconfig == undefined) {
    bplusconfig = {};

}

// assemble the base topics
var buttontopic = basetopic + bplusdevice + "/button/";
var displaytopic = basetopic + bplusdevice + "/display/";
var buttonsubscriptiontopic = buttontopic + "+/state";
var pagetopic = basetopic + bplusdevice+"/page";
var buttonpagetopic = basetopic + bplusdevice + "/buttonpage";
var brightnesstopic = basetopic + bplusdevice + "/brightness";
var updatetopic = basetopic + bplusdevice + "/update";

// assemble to configuration object
bplusconfig[bplusdevice] = {
    'ip': ip,
    'id': bplusdevice,
    'basetopic': basetopic,
    'buttontopic': buttontopic,
    'displaytopic': displaytopic,
    'buttonsubscriptiontopic': buttonsubscriptiontopic,
    'pagetopic': pagetopic,
    'buttonpagetopic': buttonpagetopic,
    'updatetopic': updatetopic,
    'brightnesstopic': brightnesstopic,
    'numbars': numbars,
//    'mac': mac, // Depricated
//    'firmware': firmware, // Depricated
    'location': location,
    'autobackup': autobackup,
    'statusbar': statusbar,
    'pages': pages,
    'buttonpages': buttonpages,
    'mqttbrokers': [
        {
            'brokerid': mqttbrokerid,
            'url': mqtturl,
            'port': mqttport,
            'wsport': mqttwsport,
            'username': mqttusername,
            'password': mqttpassword
        }
    ],
    'configJSONcore': {
        "name": bplusdevice,
        "location": location,
        "autobackup": autobackup,
        "brightnesslargedisplay": 76,
        "brightnessminidisplay": 80,
        "ledcolorfront": 0,
        "ledcolorwall": 0,
        "color": 0,
        "statusbar": statusbar
    }
};

// save the config for all devices back to the disk
global.set("bplusconfig", bplusconfig, "file");
flow.set("buttonpages", buttonpages);
msg.bplusdevice = bplusdevice;
msg.updatetopic = updatetopic;
msg.ipaddress = ip
msg.payload = bplusconfig
return msg;
