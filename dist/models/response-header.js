'use strict';Object.defineProperty(exports,'__esModule',{value:true});class ResponseHeader{constructor(responseHeader=new ResponseHeaderClass(),error=new ResponseError()){this.responseHeader=responseHeader;this.error=error;}}exports.ResponseHeader=ResponseHeader;class ResponseError{constructor(metadata=[],msg='',code=-1){this.metadata=metadata;this.msg=msg;this.code=code;}}exports.ResponseError=ResponseError;class ResponseHeaderClass{constructor(status=-1,QTime=0){this.status=status;this.QTime=QTime;}}exports.ResponseHeaderClass=ResponseHeaderClass;var RespHeaderFactory;(function(RespHeaderFactory){function createError(msg,code){let result=new ResponseHeader(new ResponseHeaderClass(-100),new ResponseError([],msg,code));return result;}RespHeaderFactory.createError=createError;function toResponseHeader(json){return JSON.parse(json);}RespHeaderFactory.toResponseHeader=toResponseHeader;function responseHeaderToJson(value){return JSON.stringify(value);}RespHeaderFactory.responseHeaderToJson=responseHeaderToJson;}(RespHeaderFactory=exports.RespHeaderFactory||(exports.RespHeaderFactory={})));