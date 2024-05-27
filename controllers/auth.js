import { User } from "../model/userdb.js"; // Assuming User model import
import { Feedback } from "../model/feedbackdb.js";
import { convertToNumericRating } from "../util/ratingFunction.js";
 
export const login = (req, res) => {
  res.sendFile("login.html", { root: "public" });
};
 
export const handleLogin = async (req, res) => {
  const { username } = req.body;
 
  req.session.username = username;
 
  try {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
 
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
 
    if (user.squadDetails.length === 1) {
      const squad = user.squadDetails[0].squadName;
      return res.redirect(`/feedback-form?squad=${squad}`);
  } else if (user.squadDetails.length > 1) {
      const script = `
          <style>
              .modal {
                  display: block;
                  position: fixed;
                  z-index: 1;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  overflow: auto;
                  background-color: rgba(0,0,0,0.4);
              }
              .modal-content {
                  background-color: #fefefe;
                  margin: 15% auto;
                  padding: 20px;
                  border: 1px solid #888;
                  width: 80%;
                  max-width: 400px;
                  text-align: center;
              }
              .modal-content select {
                  width: 100%;
                  padding: 10px;
                  margin: 10px 0;
              }
              .modal-content button {
                  padding: 10px 20px;
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  cursor: pointer;
              }
          </style>
          <div id="myModal" class="modal">
              <div class="modal-content">
                  <h2>Select your squad</h2>
                  <select id="squadSelect">
                      ${user.squadDetails.map(squad => `<option value="${squad.squadName}">${squad.squadName}</option>`).join('')}
                  </select>
                  <button onclick="submitSquad()">Submit</button>
              </div>
          </div>
          <script>
              function submitSquad() {
                  const squadName = document.getElementById('squadSelect').value;
                  window.location.href = '/feedback-form?squad=' + encodeURIComponent(squadName);
              }
          </script>
      `;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(script);
      res.end();
      
 
  } else  if (username === 'lakshmi') {
                const feedbacks = await Feedback.find({});
 
                // Generate HTML table
                let htmlTable = `
                    <html>
                    <head>
                        <title>Feedback Details</title>
                        <style>
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-bottom: 20px;
                            }
                            table, th, td {
                                border: 1px solid black;
                            }
                            th, td {
                                padding: 8px;
                                text-align: left;
                            }
                            th {
                                background-color: #f2f2f2;
                                width: 30%;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Feedback Details</h2>
                `;
 
                feedbacks.forEach(feedback => {
                    const technicalRating = convertToNumericRating(feedback.technicalFeedback);
                    const domainRating = convertToNumericRating(feedback.domainFeedback);
                    const activeParticipationRating = convertToNumericRating(feedback.activeParticipationFeedback);
                    const ResponsivenesstouserRating = convertToNumericRating(feedback.ResponsivenesstouserFeedback);
                    const solutioningQualityRating = convertToNumericRating(feedback.solutioningQualityFeedback);
                    const documentationQualityRating = convertToNumericRating(feedback.documentationQualityFeedback);
                    const testCoverageQualityRating = convertToNumericRating(feedback.testCoverageQualityFeedback);
                    const testingQualityRating = convertToNumericRating(feedback.testingQualityFeedback);
                    const postProductionIssuesDefectsRating = convertToNumericRating(feedback.postProductionIssuesDefectsFeedback);
                    const contributionbySquadLeadRating = convertToNumericRating(feedback.contributionbySquadLeadFeedback);
                    const workAsaTeamRating = convertToNumericRating(feedback.workasTeamFeedback);
                    const understandingRating = convertToNumericRating(feedback.understandingFeedback);
                    const communicationRating = convertToNumericRating(feedback.communicationFeedback);
 
                    const averageRating = (technicalRating + domainRating + activeParticipationRating + ResponsivenesstouserRating + solutioningQualityRating + documentationQualityRating + testCoverageQualityRating + testingQualityRating + postProductionIssuesDefectsRating + contributionbySquadLeadRating + workAsaTeamRating + understandingRating + communicationRating) / 13;
                    const averagePercentage = (averageRating / 5) * 100;
 
                    htmlTable += `
                        <table>
                            <tr>
                                <th>Username</th>
                                <td>${feedback.username}</td>
                            </tr>
                            <tr>
                                <th>Squad Name</th>
                                <td>${feedback.squadName}</td>
                            </tr>
                            <tr>
                                <th>Technical Feedback</th>
                                <td>${feedback.technicalFeedback}</td>
                            </tr>
                            <tr>
                                <th>Technical Feedback Remarks</th>
                                <td>${feedback.technicalFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Domain Feedback</th>
                                <td>${feedback.domainFeedback}</td>
                            </tr>
                            <tr>
                                <th>Domain Feedback Remarks</th>
                                <td>${feedback.domainFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Active Participation Feedback</th>
                                <td>${feedback.activeParticipationFeedback}</td>
                            </tr>
                            <tr>
                                <th>Active Participation Feedback Remarks</th>
                                <td>${feedback.activeParticipationFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Responsiveness to User Feedback</th>
                                <td>${feedback.ResponsivenesstouserFeedback}</td>
                            </tr>
                            <tr>
                                <th>Responsiveness to User Feedback Remarks</th>
                                <td>${feedback.ResponsivenesstouserFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Solutioning Quality Feedback</th>
                                <td>${feedback.solutioningQualityFeedback}</td>
                            </tr>
                            <tr>
                                <th>Solutioning Quality Feedback Remarks</th>
                                <td>${feedback.solutioningQualityFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Documentation Quality Feedback</th>
                                <td>${feedback.documentationQualityFeedback}</td>
                            </tr>
                            <tr>
                                <th>Documentation Quality Feedback Remarks</th>
                                <td>${feedback.documentationQualityFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Test Coverage Quality Feedback</th>
                                <td>${feedback.testCoverageQualityFeedback}</td>
                            </tr>
                            <tr>
                                <th>Test Coverage Quality Feedback Remarks</th>
                                <td>${feedback.testCoverageQualityFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Testing Quality Feedback</th>
                                <td>${feedback.testingQualityFeedback}</td>
                            </tr>
                            <tr>
                                <th>Testing Quality Feedback Remarks</th>
                                <td>${feedback.testingQualityFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Post Production Issues Defects Feedback</th>
                                <td>${feedback.postProductionIssuesDefectsFeedback}</td>
                            </tr>
                            <tr>
                                <th>Post Production Issues Defects Feedback Remarks</th>
                                <td>${feedback.postProductionIssuesDefectsFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Contribution by Squad Lead Feedback</th>
                                <td>${feedback.contributionbySquadLeadFeedback}</td>
                            </tr>
                            <tr>
                                <th>Contribution by Squad Lead Feedback Remarks</th>
                                <td>${feedback.contributionbySquadLeadFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Work as a Team Feedback</th>
                                <td>${feedback.workasTeamFeedback}</td>
                            </tr>
                            <tr>
                                <th>Work as a Team Feedback Remarks</th>
                                <td>${feedback.workasTeamFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Understanding Feedback</th>
                                <td>${feedback.understandingFeedback}</td>
                            </tr>
                            <tr>
                                <th>Understanding Feedback Remarks</th>
                                <td>${feedback.understandingFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Communication Feedback</th>
                                <td>${feedback.communicationFeedback}</td>
                            </tr>
                            <tr>
                                <th>Communication Feedback Remarks</th>
                                <td>${feedback.communicationFeedbackRemarks}</td>
                            </tr>
                            <tr>
                                <th>Any Other Comments Feedback</th>
                                <td>${feedback.anyOtherCommentsFeedback}</td>
                            </tr>
                            <tr>
                                <th>Average Percentage</th>
                                <td>${averagePercentage.toFixed(2)}%</td>
                            </tr>
                        </table>
                    `;
                });
 
                htmlTable += `
                    </body>
                    </html>
                `;
 
                // Send the HTML response
                res.send(htmlTable);
            }
  else{
    // Handle unexpected case (no squad data)
    console.error("User has no squad data:", user);
  }
} catch (err) {
  console.error(err);
  res.status(500).send("Internal Server Error");
}
};