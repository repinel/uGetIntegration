// Copyright 2011 Roque Pinel.
//
// Based on the Simple Get extension.
//
// **** **** **** **** **** ****
//
// Copyright 2013 uGet Integration.
//
// This file is part of uGet Integration.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

Main = {
	downloadURLs: function(urls) {
		console.log("URLs: " + urls);

		Options.getStorage().get(Options.getKeys(), function(items) {
			var application = items["download_manager_path"];
			var destination = items["download_destination"];
			var urlParams = items["download_url_parameters"];
			var additionalParams = items["download_additional_parameters"];
			var multipleCalls = Util.parseBoolean(items["multiple_calls"]);

			console.log("DownloadMangerPath: " + application);
			console.log("DownloadDestination: " + destination);
			console.log("DownloadURLParams: " + urlParams);
			console.log("DownloadAdditionalParams: " + additionalParams);
			console.log("MultipleCalls: " + multipleCalls);

			additionalParams = additionalParams.replace("[FOLDER]", '"' + destination + '"');

			var parameters = "";
			for (var i = 0; i < urls.length; i++) {
				if (multipleCalls)
					parameters = "";

				parameters += " " + urlParams.replace("[URL]", '"' + urls[i] + '"');
				
				if (multipleCalls) {
					parameters += " " + additionalParams;
					Main.sendMessage(application, parameters);
				}
			}
			if (!multipleCalls) {
				parameters += " " + additionalParams;
				Main.sendMessage(application, parameters);
			}
		});
	},
	
	sendMessage: function(application, parameters) {
		port = chrome.extension.connectNative("com.ugetdm.integration");
		port.onDisconnect.addListener(Main.onDisconnected);
		port.postMessage({"application": application, "parameters": parameters});
	},

	onDisconnected: function() {
		var message = chrome.runtime.lastError.message;
		console.log("Failed to connect: " + message);

		if (message == "Error when communicating with the native messaging host.")
			return; // ignore

		alert("Please install the uGet Integration host application.");
	},

	downloadLinkOnClick: function(info, tab) {
		console.log("DownloadLink: " + info.menuItemId + " was clicked.");
		Main.downloadURLs([info.linkUrl]);
	},

	downloadAllOnClick: function(info, tab) {
		console.log("DownloadAll: " + info.menuItemId + " was clicked.");
		chrome.tabs.executeScript(null, { file: "download_all.js" });
	}
};

Menu = {
	options: [
		["uGet Link", ["link"], Main.downloadLinkOnClick],
		["uGet All Links", ["page"], Main.downloadAllOnClick]
	],
};


/* creating the context menu */

for (var i = 0; i < Menu.options.length; i++) {
	var id = chrome.contextMenus.create({
		"title": Menu.options[i][0],
		"contexts": Menu.options[i][1],
		"onclick": Menu.options[i][2]
	});

	console.log("'" + Menu.options[i][0] + "' item: " + id);
}

//var links = [];
var linksStr = "";

chrome.extension.onConnect.addListener(
	function(port) {
		port.onMessage.addListener(
			function(msg) {
				console.log("Connection type: " + msg.type);

				if (msg.type == "setLinks") {
					linksStr = msg.links;

					var popup = window.open(
						"donwload_all_popup.html",
						'Download All - Selection',
						'width = 712, height = 450, resizable = 0, toolbar = no, menubar = no, status = no, scrollbars = no'
					);

					// ensure that the focus was changed
					if (window.focus) {
						popup.focus();
					}
				} else if (msg.type == "getLinks") {
					port.postMessage({links: linksStr});
				} else if (msg.type == "downloadLinks") {
					links = JSON.parse(msg.links);

					console.log(links.length + " links returned");

					Main.downloadURLs(links);
				}
			}
		);
	}
);



