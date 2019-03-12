"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
var Condition;
(function (Condition) {
    Condition[Condition["Unset"] = 0] = "Unset";
    Condition[Condition["Operator"] = 1] = "Operator";
    Condition[Condition["Not"] = 2] = "Not";
    Condition[Condition["Equals"] = 3] = "Equals";
    Condition[Condition["Contains"] = 4] = "Contains";
    Condition[Condition["Default"] = 5] = "Default";
})(Condition = exports.Condition || (exports.Condition = {}));
class Query {
    constructor() {
        this.query = [];
    }
    where(field, val = null, opt = Condition.Unset) {
        let prefix = '';
        if (!this._ignoreNextWherePrefix && this.query.length > -1) {
            //prefix =  (opt.Operator) || 'AND ';
        }
        if (opt && opt === Condition.Not)
            prefix += '-';
        delete this._ignoreNextWherePrefix;
        this._buildingWhere = true;
        this.query.push(prefix + field + ':');
        if (val)
            this.equals(val);
        return this;
    }
    _ensureIsBuildingWhere(method) {
        if (!this._buildingWhere) {
            let msg = method + '() must be used after where() when called with these arguments';
            throw new Error(msg);
        }
    }
    isString(val) {
        return (typeof val === 'string');
    }
    equals(val, opt = Condition.Equals) {
        this._ensureIsBuildingWhere('equals');
        if (this.isString(val)) {
            switch (opt) {
                case Condition.Equals:
                    val = this.quote(val);
                    break;
                case Condition.Contains:
                    val = '(*' + val.split(' ').join(' AND ') + '*)';
                    break;
            }
        }
        this.query.push(val);
        this._buildingWhere = false;
        return this;
    }
    in(values, separator) {
        this._ensureIsBuildingWhere('in');
        if (!Array.isArray(values))
            values = values.split(separator || ',');
        values = values.map(function (val) {
            return typeof val === 'string' ? this.quote(val) : val;
        });
        this.query.push('(' + values.join(' ') + ')');
        this._buildingWhere = false;
        return this;
    }
    begin() {
        if (this.query.length && !this._ignoreNextWherePrefix)
            this.query.push('AND ');
        this._ignoreNextWherePrefix = true;
        this.query.push('(');
        return this;
    }
    end() {
        this.query.push(')');
        return this;
    }
    or() {
        this._ignoreNextWherePrefix = true;
        this.query.push(' OR ');
        return this;
    }
    any(conditions, opt = Condition.Unset) {
        this.begin();
        let first = true;
        for (let field in conditions) {
            if (first)
                first = false;
            else
                this.or();
            this.where(field).equals(conditions[field], opt);
        }
        this.end();
        return this;
    }
    between(start, end, caller = null) {
        this._ensureIsBuildingWhere('between' || caller);
        let startVal = start > -1 ? start.toString() : "*";
        let endVal = end > -1 ? end.toString() : "*";
        this.query.push(`[${startVal} TO ${endVal}]`);
        this._buildingWhere = false;
        return this;
    }
    betweenWithOpenIntervals(start = -1, end = -1, caller = null) {
        this._ensureIsBuildingWhere('between' || caller);
        let startVal = start > -1 ? start.toString() : "*";
        let endVal = end > -1 ? end.toString() : "*";
        this.query.push(`{${startVal} TO ${endVal}}`);
        this._buildingWhere = false;
        return this;
    }
    lt(val) {
        return this.betweenWithOpenIntervals(null, val);
    }
    gt(val) {
        return this.betweenWithOpenIntervals(val, null);
    }
    ;
    lte(val) {
        return this.between(null, val);
    }
    gte(val) {
        return this.between(val, null);
    }
    build() {
        let result = "";
        if (this.query.length > 0) {
            result = this.query.join(' ');
        }
        else {
            result = "*:*";
        }
        return result;
    }
    quote(value) {
        return '"' + value + '"';
    }
}
exports.Query = Query;
