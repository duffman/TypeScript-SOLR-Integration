/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */


var http = require("http");

var options = {
	"method": "POST",
	"hostname": [
		"localhost"
	],
	"port": "8983",
	"path": [
		"solr",
		"zap",
		"update"
	],
	"headers": {
		"Content-Type": "application/xml,text/xml",
		"cache-control": "no-cache"
	}
};

var req = http.request(options, (res) => {
	var chunks = [];

	console.log("RES ::", res);

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write("<delete><query>*:*</query></delete>");
req.end();