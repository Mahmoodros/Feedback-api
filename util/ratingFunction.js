export const  convertToNumericRating=function(feedback) {
    switch (feedback) {
      case "Excellent":
        return 5;
      case "Good":
        return 4;
      case "Average":
        return 3;
      case "Need Improvement":
        return 2;
      default:
        return 0;
    }
  }