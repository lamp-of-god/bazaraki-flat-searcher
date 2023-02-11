"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatInfo = exports.FlatType = void 0;
var FlatType;
(function (FlatType) {
    FlatType["Studio"] = "Studio";
    FlatType["OneBedroom"] = "OneBedroom";
    FlatType["TwoBedrooms"] = "TwoBedrooms";
    FlatType["Unknown"] = "Unknown";
})(FlatType = exports.FlatType || (exports.FlatType = {}));
class FlatInfo {
    get flatType() {
        switch (true) {
            case this.link.includes('studio'):
                return FlatType.Studio;
            case this.link.includes('1-bedroom'):
                return FlatType.OneBedroom;
            case this.link.includes('2-bedroom'):
                return FlatType.TwoBedrooms;
            default:
                return FlatType.Unknown;
        }
    }
    ;
    constructor(price, link, dateAndLocation) {
        this.price = price;
        this.link = link;
        this.dateAndLocation = dateAndLocation;
    }
}
exports.FlatInfo = FlatInfo;
//# sourceMappingURL=flat-info.js.map