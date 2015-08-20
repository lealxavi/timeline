
var monthYearType = function(dateString) {


  this.dateString = dateString;
  this.month = parseInt(dateString.split("/")[0]);
  this.year  = parseInt(dateString.split("/")[1]);

  this.next = function () {

    if(this.month == 12) {
      this.month = 1;
      this.year +=  1;
    } else {
      this.month += 1;
    }

  }

  this.toNumber = function () {

    monthString = (this.month<10?"0":"") + this.month.toString();
    return parseInt(this.year.toString() + monthString);
  }

  this.lessOrEqualTo = function (dateToCompare) {
    return this.toNumber() <= dateToCompare.toNumber();
  }

  this.equalTo = function (dateToCompare) {
    return dateToCompare.month == this.month && dateToCompare.year == this.year;
  }

  this.insideRange = function (startDate,endDate) {
    var dateToNumber = this.toNumber(); 
    return startDate.toNumber() <= dateToNumber && dateToNumber <= endDate.toNumber(); 
  }

}