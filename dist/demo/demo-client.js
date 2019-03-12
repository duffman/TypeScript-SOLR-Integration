"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const solr_client_1 = require("@lib/solr-client");
const types_1 = require("@lib/types");
const const_1 = require("@lib/const");
const doc_parser_1 = require("@lib/doc-parser");
const solr_http_request_1 = require("@lib/core/solr-http-request");
const logger_1 = require("@lib/utils/logger");
const http = require("http");
class DemoClient {
    constructor() {
        this.solrClient = new solr_client_1.SolrClient(types_1.ServerProtocol.HTTP, const_1.Const.LOCALHOST, 8983);
    }
    testPost(data) {
        return new Promise((resolve, reject) => {
            let dataEncoded = JSON.stringify(data);
            let req = http.request({
                host: 'localhost',
                port: "8983",
                path: '/solr/zap/update',
                method: 'POST',
                headers: {
                    'Content-Length': Buffer.byteLength(dataEncoded),
                    'Content-Type': 'application/json',
                },
            }, res => {
                let buffers = [];
                res.on('error', reject);
                res.on('data', buffer => buffers.push(buffer));
                res.on('end', () => res.statusCode === 200
                    ? resolve(Buffer.concat(buffers))
                    : reject(Buffer.concat(buffers)));
            });
            req.write(dataEncoded);
            req.end();
        });
    }
    searchTechProducts() {
        this.solrClient.use("zap");
        let query = this.solrClient.query("*");
        this.solrClient.execute(query).then(res => {
            console.log("Res ::", res);
        }).catch(err => {
            console.log("Err ::", err);
        });
    }
    addItems() {
        let req = new solr_http_request_1.SolrHttpRequest();
        let items = new Array();
        let item = new doc_parser_1.Doc("id198", ["cat111"], "ANAlleBanan i skogen", 1, "12");
        for (let i = 0; i < 5; i++) {
            let doc = {
                id: "id" + i,
                name: "balle NR: " + i
            };
            items.push(doc);
            //items = Object.assign(items, doc);
        }
        console.dir(items, { depth: null, colors: true });
        let data = JSON.stringify(items);
        //let data = Convert.docToJson(items);
        console.log("DATA ::", data);
        // http://localhost:8983/solr/zap/update?_=1552174654572&commitWithin=1000&overwrite=true&wt=json
        let updUrl = "http://localhost:8983/solr/zap/update?commitWithin=1000&overwrite=true&wt=json";
        let testData = '[{ "id": "kalle", "name": "baaaaallle"}]';
        this.testPost(testData);
        req.postData2(updUrl, items).then(res => {
            console.log("RIFFE ::", res);
        }).catch(err => {
            logger_1.Log.error("execute :: ", err);
        });
        let test = { "id": "kalle", "name": "baaaaallle" };
        req.postData2(updUrl, test).then(res => {
            console.log("RIFFE ::", res);
        }).catch(err => {
            logger_1.Log.error("execute :: ", err);
        });
        /*
        const request = require('request');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };


        request.post(updUrl, items, (error, res, body) => {
            if (error) {
                console.error(error);
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
        });
        */
        /*

        req.postData2(updUrl, data).then(r2 => {
            console.log("RIFFE ::", r2);
        }).catch(err => {
            Log.error("execute :: ", err);
        });

        req.postData(updUrl, data, false).then(res => {
            Log.info("addItems :: ", res);


        }).catch(err => {
            Log.error(this.constructor.name + " :: execute :: ", err);
        });
*/
    }
    testSelect() {
        let url = "http://localhost:8983/solr/zap/select?q=name:The";
        let client = new solr_client_1.SolrClient();
        client.showDebug();
    }
    cp() {
        let client = new solr_client_1.SolrClient();
        let url = "http://localhost:8983/solr/zap/select?q=name:The";
        client.executeUrl(url).then(res => {
            console.log("CPCP ::", res);
        }).catch(err => {
            console.log("ERR ::", err);
        });
    }
}
exports.DemoClient = DemoClient;
let client = new DemoClient();
//client.searchTechProducts();
client.addItems();
//client.cp();
