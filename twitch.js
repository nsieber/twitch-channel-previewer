var channelNames = ["freecodecamp", "storbeck", "terakilobyte",
"habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff",
"brunofin","comster404","test_channel","cretetion","sheevergaming",
"TR7K","OgamingSC2","ESL_SC2"];
var mainDiv = document.getElementById('channels');

function buildURL(channelName, type) {
	return 'https://api.twitch.tv/kraken/' + type + '/' + channelName + '?callback=?';
}

channelNames.forEach(function(channelName) {
	var streamURL = buildURL(channelName, 'streams');
	var channelURL = buildURL(channelName, 'channels');
	var logo, channelDiv, url;
	$.getJSON(streamURL, function(data) {
		var status;
		if (data.stream === null) {
			status = 'offline';
		} else if (data.stream === undefined) {
			status = 'channel closed';
		} else {
			status = data.stream.game;
		}
		$.getJSON(channelURL, function(data) {
			var channelDiv = document.createElement('div');
			channelDiv.setAttribute('class', 'col-md-4 channelDisplay');
			logo = data.logo != null ? data.logo : 
			"https://cdn.rawgit.com/ayoisaiah/freeCodeCamp/master/twitch/images/placeholder-2.jpg";
			url = data.url;
			channelDiv.innerHTML = makeChannel(channelName, status, logo, url);
			mainDiv.appendChild(channelDiv);
		})
	})
})

function makeChannel(channelName, status, logo, url) {
	var html = '<div class="colorMe"><img class="logo" src="'+ 
	logo+'"><div class="channelContents"><h3 class="text-center"><a href="'+
	url+'">'+channelName+'</a></h3><div class="text-center status">'+status+
		'</div></div></div>';  
  return html;
}




