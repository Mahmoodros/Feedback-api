import { User } from "../model/userdb.js";
import { Feedback } from "../model/feedbackdb.js";
import { convertToNumericRating } from "../util/ratingFunction.js";
import ExcelJS from 'exceljs';

export const getFeedbackForm = async (req, res) => {
  const { squad } = req.query;
  const username = req.session.username;
  console.log(squad);

  try {
    // Find the user in the database
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user has only one squad
    if (user.squadDetails.length === 1) {
      // If user has only one squad, use that squad
      const selectedSquad = user.squadDetails[0];
      req.session.squadName = squad;
      await req.session.save();
      return res.render("feedbackForm.ejs", { squadDetails: selectedSquad });
    }

    // Check if the selected squad exists for the user
    const selectedSquad = user.squadDetails.find((s) => s.squadName === squad);
    if (!selectedSquad) {
      return res.status(404).send("Squad not found for the user");
    }

    console.log("Selected Squad:", selectedSquad);
    req.session.squadName = squad;
    await req.session.save();

    // Render the feedback form with prepopulated squad details
    res.render("feedbackForm.ejs", { squadDetails: selectedSquad });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const submitFeedback = async (req, res) => {
  const squadName = req.session.squadName;
  console.log(squadName);

  const { username } = req.session; // Retrieve username from session
  console.log(username);
  const {
    technicalFeedback,
    technicalFeedbackRemarks,
    domainFeedback,
    domainFeedbackRemarks,
    activeParticipationFeedback,
    activeParticipationFeedbackRemarks,
    ResponsivenesstouserFeedback,
    ResponsivenesstouserFeedbackRemarks,
    solutioningQualityFeedback,
    solutioningQualityFeedbackRemarks,
    documentationQualityFeedback,
    documentationQualityFeedbackRemarks,
    testCoverageQualityFeedback,
    testCoverageQualityFeedbackRemarks,
    testingQualityFeedback,
    testingQualityFeedbackRemarks,
    postProductionIssuesDefectsFeedback,
    postProductionIssuesDefectsFeedbackRemarks,
    contributionbySquadLeadFeedback,
    contributionbySquadLeadFeedbackRemarks,
    workasTeamFeedback,
    workasTeamFeedbackRemarks,
    understandingFeedback,
    understandingFeedbackRemarks,
    communicationFeedback,
    communicationFeedbackRemarks,
    anyOtherCommentsFeedback
  } = req.body;
  const squadname = req.session.squadName || null;
  console.log(req.body);
  const technicalRating = convertToNumericRating(technicalFeedback);
  const domainRating = convertToNumericRating(domainFeedback);
  const activeParticipationRating = convertToNumericRating(
    activeParticipationFeedback
  );
  const ResponsivenesstouserRating = convertToNumericRating(
    ResponsivenesstouserFeedback
  );
  const solutioningQualityRating = convertToNumericRating(
    solutioningQualityFeedback
  );
  const documentationQualityRating = convertToNumericRating(
    documentationQualityFeedback
  );
  const testCoverageQualityRating = convertToNumericRating(
    testCoverageQualityFeedback
  );
  const testingQualityRating = convertToNumericRating(testingQualityFeedback);
  const postProductionIssuesDefectsRating = convertToNumericRating(
    postProductionIssuesDefectsFeedback
  );
  const contributionbySquadLeadRating = convertToNumericRating(
    contributionbySquadLeadFeedback
  );
  const workAsaTeamRating = convertToNumericRating(workasTeamFeedback);
  const understandingRating = convertToNumericRating(understandingFeedback);
  const communicationRating = convertToNumericRating(communicationFeedback);
  const averageRating =
    (technicalRating +
      domainRating +
      activeParticipationRating +
      ResponsivenesstouserRating +
      solutioningQualityRating +
      documentationQualityRating +
      testCoverageQualityRating +
      testingQualityRating +
      postProductionIssuesDefectsRating +
      contributionbySquadLeadRating +
      workAsaTeamRating +
      understandingRating +
      communicationRating) /
    13;
  console.log(
    technicalRating,
    domainRating,
    activeParticipationRating,
    ResponsivenesstouserRating,
    solutioningQualityRating,
    documentationQualityRating,
    testCoverageQualityRating,
    testingQualityRating,
    postProductionIssuesDefectsRating,
    contributionbySquadLeadRating,
    workAsaTeamRating,
    understandingRating,
    communicationRating
  );
  const averagePercentage = (averageRating / 5) * 100;
  const dataSent = new Feedback({
    username,
    squadName,
    averagePercentage,
    technicalFeedback,
    technicalFeedbackRemarks,
    domainFeedback,
    domainFeedbackRemarks,
    activeParticipationFeedback,
    activeParticipationFeedbackRemarks,
    ResponsivenesstouserFeedback,
    ResponsivenesstouserFeedbackRemarks,
    solutioningQualityFeedback,
    solutioningQualityFeedbackRemarks,
    documentationQualityFeedback,
    documentationQualityFeedbackRemarks,
    testCoverageQualityFeedback,
    testCoverageQualityFeedbackRemarks,
    testingQualityFeedback,
    testingQualityFeedbackRemarks,
    postProductionIssuesDefectsFeedback,
    postProductionIssuesDefectsFeedbackRemarks,
    contributionbySquadLeadFeedback,
    contributionbySquadLeadFeedbackRemarks,
    workasTeamFeedback,
    workasTeamFeedbackRemarks,
    understandingFeedback,
    understandingFeedbackRemarks,
    communicationFeedback,
    communicationFeedbackRemarks,
    anyOtherCommentsFeedback
  });
  try {
    await dataSent.save();
    // Perform actions after successful save (e.g., redirect to a confirmation page)
    res.send(`
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          <style>
          body{
          background-color:lightblue;width: 100%;
          height: 100%;
          /* overflow: hidden; */
          margin: 0;
          display: flex;
          flex-direction: column;
          }
          #footer {
           margin-top: auto;
           text-align: right;
           padding-right: 2%;
           }
           .bottomimage {
            display: flex;
             }
          </style>
          <div class="front" style="background-color:3f51b5">
          <img src="https://www.tcs.com/content/dam/global-tcs/en/images/home/tcs-logo-1.svg" alt="tcs logo" class="image2">
        </div>
        <h2 style="text-align: center;">Your satisfaction index for ${squadName} is: ${averagePercentage.toFixed(
      2
    )}%</h2>
          </form>
          <form action="/download-feedback" method="GET">
          <button type="submit" style="margin-left:45%;background-color:4caf50;color:white">Download Feedback</button>
      </form>
      </body>
      </html>`);
    res.end();
  } catch (error) {
    console.error("Error saving data:", error);
    // Handle the error gracefully
  }
};

export const downloadFeedback = async (req, res) => {
  const squadName = req.session.squadName;
  const username = req.session.username;


  try {
      const feedback = await Feedback.findOne({
          username: new RegExp(`^${username}$`, 'i'),
      });

      if (!feedback) {
          return res.status(404).send("Feedback not found");
      }
      const technicalRating = convertToNumericRating(feedback.technicalFeedback);
      const domainRating = convertToNumericRating(feedback.domainFeedback);
      const activeParticipationRating = convertToNumericRating(feedback.
        activeParticipationFeedback
      );
      const ResponsivenesstouserRating = convertToNumericRating(feedback.
        ResponsivenesstouserFeedback
      );
      const solutioningQualityRating = convertToNumericRating(feedback.
        solutioningQualityFeedback
      );
      const documentationQualityRating = convertToNumericRating(feedback.
        documentationQualityFeedback
      );
      const testCoverageQualityRating = convertToNumericRating(feedback.
        testCoverageQualityFeedback
      );
      const testingQualityRating = convertToNumericRating(feedback.testingQualityFeedback);
      const postProductionIssuesDefectsRating = convertToNumericRating(feedback.
        postProductionIssuesDefectsFeedback
      );
      const contributionbySquadLeadRating = convertToNumericRating(feedback.
        contributionbySquadLeadFeedback
      );
      const workAsaTeamRating = convertToNumericRating(feedback.workasTeamFeedback);
      const understandingRating = convertToNumericRating(feedback.understandingFeedback);
      const communicationRating = convertToNumericRating(feedback.communicationFeedback);
      const averageRating =
        (technicalRating +
          domainRating +
          activeParticipationRating +
          ResponsivenesstouserRating +
          solutioningQualityRating +
          documentationQualityRating +
          testCoverageQualityRating +
          testingQualityRating +
          postProductionIssuesDefectsRating +
          contributionbySquadLeadRating +
          workAsaTeamRating +
          understandingRating +
          communicationRating) /
        13;
      
      const averagePercentage = ((averageRating / 5) * 100).toFixed(2);
      // Create a new workbook and worksheet
           // Create an HTML table with the feedback data
      const tableData = `
           <table border="1">
               <tr><th>Username</th><td>${feedback.username}</td></tr>
               <tr><th>Technical Feedback</th><td>${feedback.technicalFeedback}</td></tr>
               <tr><th>Technical Feedback Remarks</th><td>${feedback.technicalFeedbackRemarks}</td></tr>
               <tr><th>Domain Feedback</th><td>${feedback.domainFeedback}</td></tr>
               <tr><th>Domain Feedback Remarks</th><td>${feedback.domainFeedbackRemarks}</td></tr>
               <tr><th>Active Participation Feedback</th><td>${feedback.activeParticipationFeedback}</td></tr>
               <tr><th>Active Participation Feedback Remarks</th><td>${feedback.activeParticipationFeedbackRemarks}</td></tr>
               <tr><th>Responsiveness to User Feedback</th><td>${feedback.ResponsivenesstouserFeedback}</td></tr>
               <tr><th>Responsiveness to User Feedback Remarks</th><td>${feedback.ResponsivenesstouserFeedbackRemarks}</td></tr>
               <tr><th>Solutioning Quality Feedback</th><td>${feedback.solutioningQualityFeedback}</td></tr>
               <tr><th>Solutioning Quality Feedback Remarks</th><td>${feedback.solutioningQualityFeedbackRemarks}</td></tr>
               <tr><th>Documentation Quality Feedback</th><td>${feedback.documentationQualityFeedback}</td></tr>
               <tr><th>Documentation Quality Feedback Remarks</th><td>${feedback.documentationQualityFeedbackRemarks}</td></tr>
               <tr><th>Test Coverage Quality Feedback</th><td>${feedback.testCoverageQualityFeedback}</td></tr>
               <tr><th>Test Coverage Quality Feedback Remarks</th><td>${feedback.testCoverageQualityFeedbackRemarks}</td></tr>
               <tr><th>Testing Quality Feedback</th><td>${feedback.testingQualityFeedback}</td></tr>
               <tr><th>Testing Quality Feedback Remarks</th><td>${feedback.testingQualityFeedbackRemarks}</td></tr>
               <tr><th>Post Production Issues Defects Feedback</th><td>${feedback.postProductionIssuesDefectsFeedback}</td></tr>
               <tr><th>Post Production Issues Defects Feedback Remarks</th><td>${feedback.postProductionIssuesDefectsFeedbackRemarks}</td></tr>
               <tr><th>Contribution by Squad Lead Feedback</th><td>${feedback.contributionbySquadLeadFeedback}</td></tr>
               <tr><th>Contribution by Squad Lead Feedback Remarks</th><td>${feedback.contributionbySquadLeadFeedbackRemarks}</td></tr>
               <tr><th>Work as Team Feedback</th><td>${feedback.workasTeamFeedback}</td></tr>
               <tr><th>Work as Team Feedback Remarks</th><td>${feedback.workasTeamFeedbackRemarks}</td></tr>
               <tr><th>Understanding Feedback</th><td>${feedback.understandingFeedback}</td></tr>
               <tr><th>Understanding Feedback Remarks</th><td>${feedback.understandingFeedbackRemarks}</td></tr>
               <tr><th>Communication Feedback</th><td>${feedback.communicationFeedback}</td></tr>
               <tr><th>Communication Feedback Remarks</th><td>${feedback.communicationFeedbackRemarks}</td></tr>
               <tr><th>Any Other Comments Feedback</th><td>${feedback.anyOtherCommentsFeedback}</td></tr>
               <tr><th>Average Percentage</th><td>${averagePercentage}%</td></tr>
           </table>`;
           console.log(feedback);
           res.setHeader('Content-Type', 'text/html');
           res.setHeader('Content-Disposition', 'attachment; filename="feedback.html"');
           res.send(tableData);
       } catch (error) {
           console.error(error);
           res.status(500).send("Internal Server Error");
       }
   };
