// Copyright 2011 Roque Pinel.
//
// This file is part of Simple Get.
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

Options = {
	// global options
	values: {
		download_manager_path: "/usr/bin/uget-gtk",
		download_manager_parameters: "[URL]",
		download_destination: "",
		multiple_calls: false,
	},

	getKeys: function() {
		var keys = [];
		for (var key in Options.values) {
			keys.push(key);
		}
		return keys;
	},

	getStorage: function() {
		return chrome.storage.local;
	},

	// Set the default options when installed
	setFirstTime: function() {
		Options.getStorage().get(Options.getKeys(), function(items) {
			for (var key in Options.values) {
				if (!items[key]) {
					Options.restoreOptions(true);
					break;
				}
			}
		});
	},

	// Restore to defaults.
	defaultOptions: function() {
		Options.getStorage().set(Options.values, function() {
			for (var key in Options.values) {
				var element = document.querySelector("#download_options #" + key);

				if (Options.isCheckbox(element)) {
					element.checked = Util.parseBoolean(Options.values[key]);
				} else {
					element.value = Options.values[key];
				}

				console.log(key + " restored: " + Options.values[key]);
			}
			Options.setStatus("uGet Integration Settings have been reset to the Defaults");
		});
	},

	// Saves options to chrome.storage.local.set.
	saveOptions: function() {
		var newValues = {};
		for (var key in Options.values) {
			var element = document.querySelector("#download_options #" + key);

			if (Options.isCheckbox(element)) {
				newValues[key] = Util.parseBoolean(element.checked);
			} else {
				newValues[key] = Options.values[key];
			}
		}

		Options.getStorage().set(newValues, function() {
			for (var key in Options.values) {
				console.log(key + " stored: " + newValues[key]);
			}

			Options.setStatus("uGet Integration Settings - Saved Successfully");
		});
	},

	setStatus: function(message) {
		// Update status to let user know options were saved.
		var status = document.querySelector("#download_options #status");

		status.innerHTML = "<div class='inner'>" + message + "</div>";

		setTimeout(function() {
			status.innerHTML = "";
		}, 1900);
	},

	// Restores select box state to saved value from chrome.storage.local.set.
	restoreOptions: function(force) {
		if (typeof force === "undefined") {
			force = false;
		}

		Options.getStorage().get(Options.getKeys(), function(items) {
			for (var key in Options.values) {
				var value = items[key];

				// first time, using default.
				if (force || !value) {
					value = Options.values[key];
				}

				var element = document.querySelector("#download_options #" + key);

				if (Options.isCheckbox(element)) {
					element.checked = Util.parseBoolean(value);
				} else {
					element.value = value;
				}

				console.log(key + (force ? " initialized: " : " loaded: ") + value);
			}
		});
	},

	isCheckbox: function(element) {
		return element.type == "checkbox";
	},

	// Events

	onLoad: function() {
		if(!document.querySelector("#download_options"))
			return;

		document.querySelector("#download_options #save").addEventListener("click", Options.saveOptions);
		document.querySelector("#download_options #reset").addEventListener("click", Options.defaultOptions);

		Options.restoreOptions();
	}
};

document.addEventListener("DOMContentLoaded", Options.onLoad);

