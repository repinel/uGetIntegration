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

DownloadAllPopup = {

	links: [],

	listLinks: function() {
		var port = chrome.extension.connect();

		port.postMessage({
			type: "getLinks"
		});

		port.onMessage.addListener(
			function getResp(response) {
				if (response.links) {
					DownloadAllPopup.links = JSON.parse(response.links);

					var linksTable = document.getElementById('links_table');
					var index = linksTable.rows.length;

					for (var i = 0; i < DownloadAllPopup.links.length; i++) {
						var row = linksTable.insertRow(index++);

						var cell1 = row.insertCell(0);
						cell1.innerHTML = '<input type="checkbox" class="check_links" value="' + i + '" checked="checked" />';

						var cell2 = row.insertCell(1);
						cell2.innerHTML = '<a href="' + DownloadAllPopup.links[i] + '">' + DownloadAllPopup.links[i] + '</a>';
					}
				}
			}
		);
	},

	selectAll: function(item) {
		var checkBoxes = document.getElementsByClassName('check_links');
		for (var i = 0; i < checkBoxes.length; i++) {
			checkBoxes[i].checked = item.checked;
		}
	},

	evalExtensions: function(check) {
		var extensionsStr = document.getElementById('extensions').value;
		var extensions = extensionsStr.replace(' ', '').split(',');
		var checkBoxes = document.getElementsByClassName('check_links');

		for (var i = 0; i < checkBoxes.length; i++) {
			for (var j = 0; j < extensions.length; j++) {
				if (extensions[j] != "" && DownloadAllPopup.links[i].match(extensions[j] + "$")) {
					if (check) {
						checkBoxes[i].checked = true;
					} else {
						checkBoxes[i].checked = false;
					}
					break;
				}
			}
		}
	},

	downloadAll: function() {
		var checkBoxes = document.getElementsByClassName('check_links');

		var linksStr = "[";

		for (var i = 0; i < checkBoxes.length; i++) {
			if (checkBoxes[i].checked) {
				linksStr += '"' + DownloadAllPopup.links[i] + '",';
			}
		}

		if (linksStr.charAt(linksStr.length - 1) == ',') {
			linksStr = linksStr.substring(0, linksStr.length - 1);
		}

		linksStr += "]";

		var port = chrome.extension.connect();

		port.postMessage({
			type: "downloadLinks",
			links: linksStr
		});

		// closing pop-up
		self.close();
	},

	// Events

	onLoad: function() {
		if(!document.querySelector("#download_all_popup"))
			return;

		document.querySelector("#download_all_popup #check").addEventListener("click", function() { DownloadAllPopup.evalExtensions(true); });
		document.querySelector("#download_all_popup #uncheck").addEventListener("click", function() { DownloadAllPopup.evalExtensions(false); });

		document.querySelector("#download_all_popup #download").addEventListener("click", DownloadAllPopup.downloadAll);
		document.querySelector("#download_all_popup #close").addEventListener("click", function(){ self.close(); });

		document.querySelector("#download_all_popup #check_all").addEventListener("click", function(){ DownloadAllPopup.selectAll(this); });

		DownloadAllPopup.listLinks();
	}
};

document.addEventListener("DOMContentLoaded", DownloadAllPopup.onLoad);

