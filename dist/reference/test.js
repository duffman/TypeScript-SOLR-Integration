const solr=require('solr-client');var client=solr.createClient();client.autoCommit=true;var docs=[];for(var i=0;i<=10;i++){var doc={id:12345+i,title_t:'Title '+i,description_t:'Text'+i+'Alice'};docs.push(doc);}client.add(docs,function(err,obj){if(err){console.log(err);}else{console.log(obj);}});