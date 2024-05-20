import mongoose, { connect } from "mongoose";
const { Schema, model } = mongoose;
const feedbackSchema = new Schema({
    username:{type:String,required:true},
    squadName:{type:String},
    technicalFeedback: {type:String,required:true},
    technicalFeedbackRemarks:{type:String},
    domainFeedback: {type:String,required:true},
    domainFeedbackRemarks: {type:String},
    activeParticipationFeedback: {type:String}, 
    activeParticipationFeedbackRemarks: {type:String},
    ResponsivenesstouserFeedback: {type:String,required:true},
    ResponsivenesstouserFeedbackRemarks: {type:String},
    // qualityOfDeliverablesFeedback: {type:String,required:true},
    // qualityOfDeliverablesFeedbackRemarks: {type:String,required:true},
    solutioningQualityFeedback: {type:String,required:true},
    solutioningQualityFeedbackRemarks: {type:String},
    documentationQualityFeedback: {type:String,required:true},
    documentationQualityFeedbackRemarks: {type:String},
    testCoverageQualityFeedback: {type:String,required:true},
    testCoverageQualityFeedbackRemarks: {type:String},
    testingQualityFeedback: {type:String,required:true},
    testingQualityFeedbackRemarks: {type:String},
    postProductionIssuesDefectsFeedback: {type:String,required:true},
    postProductionIssuesDefectsFeedbackRemarks: {type:String},
    contributionbySquadLeadFeedback: {type:String,required:true},
    contributionbySquadLeadFeedbackRemarks: {type:String},
    workasTeamFeedback: {type:String,required:true},
    workasTeamFeedbackRemarks: {type:String},
    understandingFeedback: {type:String,required:true},
    understandingFeedbackRemarks: {type:String},
    communicationFeedback: {type:String,required:true},
    communicationFeedbackRemarks: {type:String},
    anyOtherCommentsFeedback: {type:String},
    averagePercentage:{type:Number}
  });
  export  const Feedback = model("Feedback", feedbackSchema);
 