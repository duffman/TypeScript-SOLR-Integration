"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const types_1 = require("@lib/types");
class SolrHttpRequest {
    constructor() {
        this.baseRequest = request.defaults({
            headers: {
                "content-type": types_1.ContentType.Json,
                "User-Agent": "ColdmindSolrClient",
            },
            "gzip": false,
            "json": true
        });
        let baseOptions = {
            'headers': {
                "Accept-Encoding": "*",
                "Accept": "*",
                //content-type": "application/x-www-form-urlencoded",
                "content-type": types_1.ContentType.Json,
                "User-Agent": "TopZap",
            },
            'gzip': false
        };
    }
    postData(url, payload = null, parseJson = true) {
        let newRequest = request.defaults({
            uri: url,
            json: parseJson,
            payload
        });
        return new Promise((resolve, reject) => {
            return newRequest(this.baseOptions, (error, response, body) => {
                console.log("postData ::", body);
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    postData2(url, payload) {
        return new Promise((resolve, reject) => {
            this.baseRequest.post(url, payload, (err, httpResponse, jsonData) => {
                console.log("err ::", err);
                //console.log("httpResponse ::", httpResponse);
                console.log("jsonData ::", jsonData);
                if (err) {
                    reject(err);
                }
                else {
                    resolve(jsonData);
                }
            });
        });
    }
}
exports.SolrHttpRequest = SolrHttpRequest;
