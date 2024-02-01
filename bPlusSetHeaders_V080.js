// This function sets the header, a message on the main screen
// to indicate that the bas confg is succesfully transfers 
// and as a proof of successful broker connection, it 
// subscribes to the topic of the internal temperature sensor.
// Note that to make this happen without a flow, we have to break 
// the naming conventions of the display item for this test.
// DO NOT EDIT THIS FILE
// 20240201 V0.80 René Boeije, initial release  parts based on code of balk77
var configJSON = {};
var bplusdevice = flow.get('bplusdevice', 'file');
var bplusconfig = global.get('bplusconfig', 'file');
var configJSONcore = flow.get('configJSONcore', 'file');
var ipaddress = msg.ipaddress;
var mqttbrokers = bplusconfig[bplusdevice].mqttbrokers;
//msg.ipaddress = bplusconfig[bplusdevice].ip;
configJSON['core'] = configJSONcore;
configJSON['mqttbrokers'] = mqttbrokers;
// Setup message to be displayed to prove that the config
// was succesfully loaded and an item to display the temp.
// Note: We abuse the 'unit' property in a terrible way!
var displayitempage = [
    {
    "displayitem": 1,
    "page": "main",
    "x": 0,
    "y": 20,
    "fontsize": 2,
    "width": 100,
    "label": "Info",
    "value": "",
    "unit": "If you can read this message, \nthe core configuration is \nsuccesfully loaded to your Button+",
    "round": 0,
    "align": 0,
    "topics": []
    },
    {
    "align": 0,
    "fontsize": 2,
    "label": "Temperature",
    "round": 1,
    "topics": [
        {
            "brokerid": mqttbrokers[0].brokerid,
            "eventtype": 15,
            "payload": "",
            "topic": bplusdevice + "/sensors/temperature"
        }
    ],
    "unit": "°C",
    "width": 30,
    "x": 0,
    "y": 10
}
];
configJSON['mqttdisplays'] = displayitempage

// Make the sensor publish its value
var tempSensor = [
    {
    "interval": 10,
    "sensorid": 1,
    "topic": {
        "brokerid": mqttbrokers[0].brokerid,
        "eventtype": 18,
        "payload": "",
        "topic": bplusdevice + "/sensors/temperature"
        }
    }
]

configJSON['mqttsensors'] = tempSensor
msg.payload = configJSON;
msg.url='http://'+ipaddress+'/configsave'

msg.headers = {};
msg.headers["Accept"] = 'application/json';
msg.headers["Accept-Encoding"] = 'gzip, deflate, br';
msg.headers["json"] = true;
return msg;
