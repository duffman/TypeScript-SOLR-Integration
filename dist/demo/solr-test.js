'use strict';Object.defineProperty(exports,'__esModule',{value:true});const solr_client_1=require('../lib/solr-client');const solr_query_builder_1=require('../lib/core/solr-query-builder');let client=new solr_client_1.SolrClient();let qb=new solr_query_builder_1.SolrQueryBuilder();qb.all();