import { User } from "../model/userdb.js"; // Assuming User model import
 
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
  } else {
    // Handle unexpected case (no squad data)
    console.error("User has no squad data:", user);
  }
} catch (err) {
  console.error(err);
  res.status(500).send("Internal Server Error");
}
};