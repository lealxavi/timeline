var DatesAndLabels = function (json) {

  this.json   = json;
  this.min    = null; // values assigned after parse()
  this.max    = null;

  this.parse = function () {
  
    var tmpMin  = Number.MAX_VALUE;
    var tmpMax  = Number.MIN_VALUE;

    for (var i = 0; i < this.json.length; i++) {

      var beginDate = new monthYearType(this.json[i].begin);
      var endDate   = new monthYearType(this.json[i].end);

      var beginToNumber = beginDate.toNumber();
      var endToNumber   = endDate.toNumber();
      
      if (beginToNumber > endToNumber) 
        throw "There's a problem with the date ("+ i +") of the string";

      this.json[i].months = monthYearType.monthsBetweenTwoDates(beginDate,endDate);

      if (beginToNumber < tmpMin) {
        this.min = beginDate;
        tmpMin   = beginToNumber;
      }
      if (endToNumber > tmpMax) {
        this.max = endDate;
        tmpMax   = endToNumber;
      }
    }
    this.months = monthYearType.monthsBetweenTwoDates(this.min,this.max);
  }
  
  this.parse();

};