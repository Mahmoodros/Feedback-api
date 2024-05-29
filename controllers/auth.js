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
      
 
  } else if (user.username.toLowerCase() === 'lakshmi') {
    const feedbacks = await Feedback.find({});
    res.send(generateFeedbackHTML(feedbacks));
    return;
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

const generateFeedbackHTML = (feedbacks) => {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Feedbacks</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table, th, td {
          border: 1px solid black;
        }
        th, td {
          padding: 10px;
          text-align: left;
        }
        .container {
            display: flex;
            justify-content: space-between;
        }
         
        .left {
            text-align: left;
        }
      
      </style>
    </head>
    <body>
      <h1>All Feedbacks</h1>
      ${feedbacks.map(feedback => `
        <h2>Feedback for ${feedback.squadName}</h2>
        <div class="container">
        <div class="left">
            <p><strong>Squad Name: </strong>${feedback.squadName}</p>
            <p><strong>Offshore Squad Lead: </strong> ${feedback.offshoreSquadLead}</p>
        </div>
        <div class="right">
            <p><strong>Onsite Squad Lead: </strong> ${feedback.onsiteSquadLead}</p>
            <p><strong>Scrum Master: </strong> ${feedback.scrumMaster}</p>
        </div>
        <p><strong>Average Percentage: </strong> ${feedback.averagePercentage}%</p>
    </div>
        <table>
          <tr>
            <th>Attributes</th>
            <th>Feedback</th> 
            <th>Remarks</th>
          </tr>
          <tr>
            <td>Technical Knowledge</td>
            <td>${feedback.technicalFeedback}</td>
            <td>${feedback.technicalFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Domain Knowledge</td>
            <td>${feedback.domainFeedback}</td>
            <td>${feedback.domainFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Active Participation</td>
            <td>${feedback.activeParticipationFeedback}</td>
            <td>${feedback.activeParticipationFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Responsiveness to Queries</td>
            <td>${feedback.ResponsivenesstouserFeedback}</td>
            <td>${feedback.ResponsivenesstouserFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Solutioning Quality</td>
            <td>${feedback.solutioningQualityFeedback}</td>
            <td>${feedback.solutioningQualityFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Documentation Quality</td>
            <td>${feedback.documentationQualityFeedback}</td>
            <td>${feedback.documentationQualityFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Test Coverage Quality</td>
            <td>${feedback.testCoverageQualityFeedback}</td>
            <td>${feedback.testCoverageQualityFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Testing Quality</td>
            <td>${feedback.testingQualityFeedback}</td>
            <td>${feedback.testingQualityFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Post-Production Issues</td>
            <td>${feedback.postProductionIssuesDefectsFeedback}</td>
            <td>${feedback.postProductionIssuesDefectsFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Contribution by Squad Lead</td>
            <td>${feedback.contributionbySquadLeadFeedback}</td>
            <td>${feedback.contributionbySquadLeadFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Work as a Team</td>
            <td>${feedback.workasTeamFeedback}</td>
            <td>${feedback.workasTeamFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Understanding</td>
            <td>${feedback.understandingFeedback}</td>
            <td>${feedback.understandingFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Communication</td>
            <td>${feedback.communicationFeedback}</td>
            <td>${feedback.communicationFeedbackRemarks}</td>
          </tr>
          <tr>
            <td>Any Other Comments</td>
            <td colspan="2">${feedback.anyOtherCommentsFeedback}</td>
          </tr>
        </table>
      `).join('')}
    </body>
    </html>
  `;
 
  return html;
};