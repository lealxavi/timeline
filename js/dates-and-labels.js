var DatesAndLabels = function (json) {

  this.json   = json;
  this.min    = null;
  this.max    = null;
  this.months = null;

  this.parse = function () {
  
    var tmpMin  = Number.MAX_VALUE;
    var tmpMax  = Number.MIN_VALUE;

    for (var i = 0; i < this.json.length; i++) {

      var beginToNumber = this.dateToNumber(this.json[i].begin);
      var endToNumber   = this.dateToNumber(this.json[i].end);
      
      if (beginToNumber > endToNumber) 
        throw "There's a problem with the date ("+ i +") of the string";

      this.json[i].months = this.monthsBetweenTwoDates(this.json[i].begin,this.json[i].end);

      if (beginToNumber < tmpMin) {
        this.min = this.json[i].begin;
        tmpMin   = beginToNumber;
      }
      if (endToNumber > tmpMax) {
        this.max = this.json[i].end;
        tmpMax   = endToNumber;
      }
    }

    this.months = this.monthsBetweenTwoDates(this.min,this.max);
  }

  this.monthsBetweenTwoDates = function (beginDate, endDate) {
    var baseYear   = parseInt(beginDate.split("/")[1]);
    var lastYear   = parseInt(endDate.split("/")[1]);

    var beginMonth = parseInt(beginDate.split("/")[0]);
    var endMonth   = parseInt(endDate.split("/")[0]);


    return (((lastYear-baseYear) * 12) + endMonth)-beginMonth+1;
  }

  this.dateToNumber = function (date) {
    return parseInt(date.split("/")[1] + date.split("/")[0]);
  }

  this.parse();

};