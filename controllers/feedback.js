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
           const workbook = new ExcelJS.Workbook();
           const worksheet = workbook.addWorksheet('Feedback');
    
           // Define columns
           worksheet.columns = [
               { header: 'Field', key: 'field', width: 40 },
               { header: 'Value', key: 'value', width: 40 },
               { header:"Remarks", key:'remarks', width:40}
           ];
    
           // Add rows
           worksheet.addRows([
               { field: 'Username', value: feedback.username },
               { field: 'Technical Feedback', value: feedback.technicalFeedback, remarks: feedback.technicalFeedbackRemarks},
               { field: 'Domain Feedback', value: feedback.domainFeedback, remarks: feedback.domainFeedbackRemarks },
               { field: 'Active Participation Feedback', value: feedback.activeParticipationFeedback,remarks: feedback.activeParticipationFeedbackRemarks  },
               { field: 'Responsiveness to User Feedback', value: feedback.ResponsivenesstouserFeedback,remarks: feedback.ResponsivenesstouserFeedbackRemarks },
               { field: 'Solutioning Quality Feedback', value: feedback.solutioningQualityFeedback,remarks: feedback.solutioningQualityFeedbackRemarks },
               { field: 'Documentation Quality Feedback', value: feedback.documentationQualityFeedback,remarks: feedback.documentationQualityFeedbackRemarks },
               { field: 'Test Coverage Quality Feedback', value: feedback.testCoverageQualityFeedback,remarks: feedback.testCoverageQualityFeedbackRemarks },
               { field: 'Testing Quality Feedback', value: feedback.testingQualityFeedback,remarks: feedback.testingQualityFeedbackRemarks  },
               { field: 'Post Production Issues Defects Feedback', value: feedback.postProductionIssuesDefectsFeedback, remarks: feedback.postProductionIssuesDefectsFeedbackRemarks},
               { field: 'Contribution by Squad Lead Feedback', value: feedback.contributionbySquadLeadFeedback,remarks: feedback.contributionbySquadLeadFeedbackRemarks },
               { field: 'Work as Team Feedback', value: feedback.workasTeamFeedback,remarks: feedback.workasTeamFeedbackRemarks },
               { field: 'Understanding Feedback', value: feedback.understandingFeedback,remarks: feedback.understandingFeedbackRemarks },
               { field: 'Communication Feedback', value: feedback.communicationFeedback,remarks: feedback.communicationFeedbackRemarks },
               { field: 'Any Other Comments Feedback', value: feedback.anyOtherCommentsFeedback },
               { field: 'Average Percentage', value:averagePercentage },
           ]);
    
           // Write to buffer and send response
           const buffer = await workbook.xlsx.writeBuffer();
           res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
           res.setHeader('Content-Disposition', 'attachment; filename="feedback.xlsx"');
           res.send(buffer);
       } catch (error) {
           console.error(error);
           res.status(500).send("Internal Server Error");
       }
   };