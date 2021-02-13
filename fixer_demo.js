"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fixer = void 0;
//Time library that we will use to increment dates.
var moment = require('moment');
//Axios will handle HTTP requests to web service
var axios = require('axios');
//Reads keys from .env file
var dotenv = require('dotenv');
//Copy variables in file into environment variables
dotenv.config();
//Class that wraps fixer.io web service
var Fixer = /** @class */ (function () {
    function Fixer() {
        //Base URL of fixer.io API
        this.baseURL = 'https://api.nomics.com/v1';
    }
    //Returns a Promise that will get the exchange rates for the specified date
    Fixer.prototype.getHistoricalRates = function (startDate, endDate) {
        //Build URL for API call
        var url = this.baseURL + "/currencies/sparkline?key=";
        url += process.env.NOMICS_API_KEY + "&ids=BTC,ETH,XRP&start=";
        url += startDate + "&end=" + endDate;
        //Output URL and return Promise
        console.log("Building fixer.io Promise with URL: " + url);
        return axios.get(url);
    };
    return Fixer;
}());
exports.Fixer = Fixer;
//Gets the historical data for a range of dates.
function getHistoricalData(startDate2, endDate2, numDays) {
    return __awaiter(this, void 0, void 0, function () {
        var startDate, endDate, fixerIo, promiseArray, i, resultArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startDate = moment(startDate2);
                    endDate = moment(endDate2);
                    fixerIo = new Fixer();
                    promiseArray = [];
                    //Work forward from start date
                    for (i = 0; i < numDays; ++i) {
                        //Add axios promise to array
                        promiseArray.push(fixerIo.getHistoricalRates("2018-04-14T00%3A00%3A00Z", "2018-04-14T00%3A00%3A00Z"));
                        //Increase the number of days
                        startDate.add(1, 'days');
                        endDate.add(1, 'days');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(promiseArray)];
                case 2:
                    resultArray = _a.sent();
                    //Output the data
                    resultArray.forEach(function (result) {
                        //console.log(result);
                        //data contains the body of the web service response
                        var data = result['data'];
                        console.log(data);
                        //Output the result - you should put this data in the database
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var dt = data_1[_i];
                            console.log("currency: " + dt.currency +
                                " timestamps: " + dt.timestamps +
                                " prices: " + dt.prices);
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("Error: " + JSON.stringify(error_1));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Call function to get historical data
getHistoricalData("2018-04-14", "2018-04-14", 1);
//# sourceMappingURL=fixer_demo.js.map