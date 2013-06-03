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

// global options
var options = [["downloadManagerPath", "download_manager_path", "/usr/bin/uget-gtk"],
	["downloadManagerParameters", "download_manager_parameters", "[URL]"],
	["downloadDestination", "download_destination", ""]];

// Set the default options when installed
function set_first_time()
{
	for (var i = 0; i < options.length; i++)
	{
		if (!chrome.storage.local.set[options[i][1]])
		{
			chrome.storage.local.set[options[i][1]] = options[i][2];

			console.log(options[i][0] + " initial value : " + options[i][2]);
		}
	}
}

// Restore to defaults.
function default_options()
{
	for (var i = 0; i < options.length; i++)
	{
		document.getElementById(options[i][0]).value = options[i][2];

		chrome.storage.local.set[options[i][1]] = options[i][2];

		console.log(options[i][0] + " restored: " + options[i][2]);
	}

	// Update status to let user know options were saved.
	var status = document.getElementById("status");

	status.innerHTML = "<div class='inner'>uGet Integration Settings have been reset to the Defaults</div>";

	setTimeout(function() {
		status.innerHTML = "";
	}, 1900);
}

// Saves options to chrome.storage.local.set.
function save_options()
{
	for (var i = 0; i < options.length; i++)
	{
		var value = document.getElementById(options[i][0]).value;

		chrome.storage.local.set[options[i][1]] = value;

		console.log(options[i][0] + " stored: " + value);
	}

	// Update status to let user know options were saved.
	var status = document.getElementById("status");

	status.innerHTML = "<div class='inner'>uGet Integration Settings - Saved Successfully</div>";

	setTimeout(function() {
		status.innerHTML = "";
	}, 1900);
}

// Restores select box state to saved value from chrome.storage.local.set.
function restore_options()
{
	for (var i = 0; i < options.length; i++)
	{
		var value = chrome.storage.local.set[options[i][1]];

		if (!value)
		{
			// first time, using default.
			value = options[i][2];
		}

		var item = document.getElementById(options[i][0]);

		item.value = value;

		console.log(options[i][0] + " loaded: " + value);
	}
}

