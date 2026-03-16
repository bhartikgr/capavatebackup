const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const path = require("path");
//Admin
const AdminloginRoutes = require("./routes/admin/login");
const AdminvideoRoutes = require("./routes/admin/video");
const AdminmoduleRoutes = require("./routes/admin/module");
const AdminmoduleDashboard = require("./routes/admin/dashboard");
const Adminadminall = require("./routes/admin/adminall");
const Adminzoomeet = require("./routes/admin/zoomeet");
const Admincompany = require("./routes/admin/company");
const Admininvestor = require("./routes/admin/investors");
// Admin

//User
const UserRegisterRoutes = require("./routes/user/register");
const UserAifileRoutes = require("./routes/user/aifiles");
const UserpaymentRoutes = require("./routes/user/payment");
const UsercronjobRoutes = require("./routes/user/cronjob");
const UserInvestorReportRoutes = require("./routes/user/investorreport");
const UserInvestorRoutes = require("./routes/user/investor");
const UserCapitalRoundRoutes = require("./routes/user/capitalround");
const UserCapitalInvestmentRoundRoutes = require("./routes/user/capitalroundinvestment");
const UserDashboardRoutes = require("./routes/user/dashboard");
const UserCompanyRoutes = require("./routes/user/company");
const CompanyAccessLogsRoutes = require("./routes/user/accesslogs");
const Userwaitlist = require("./routes/user/waitlist");
const Companydashboard = require("./routes/user/companydashboard");
//User

//Signatory
const SignatoryRoutes = require("./routes/user/signatory");
const SignatorydashboardRoutes = require("./routes/user/signatorydashboard");
//Signatory
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static video files
app.use(
  "/upload/video",
  express.static(path.join(__dirname, "upload", "video")),
);
app.use("/upload/docs", express.static(path.join(__dirname, "upload", "docs")));

// Routes
app.use("/api/admin/", AdminloginRoutes);
app.use("/api/admin/video", AdminvideoRoutes);
app.use("/api/admin/module", AdminmoduleRoutes);
app.use("/api/admin/dashboard", AdminmoduleDashboard);
app.use("/api/admin/adminall", Adminadminall);
app.use("/api/admin/zoomeet", Adminzoomeet);
app.use("/api/admin/company", Admincompany);
app.use("/api/admin/investor", Admininvestor);
//User Routes
app.use("/api/user/", UserRegisterRoutes);
app.use("/api/user/aifile", UserAifileRoutes);
app.use("/api/user/payment", UserpaymentRoutes);
app.use("/api/user/cronjob", UsercronjobRoutes);
app.use("/api/user/investorreport", UserInvestorReportRoutes);
app.use("/api/user/investor", UserInvestorRoutes);
app.use("/api/user/capitalround", UserCapitalRoundRoutes);
app.use("/api/user/capitalroundinvestment", UserCapitalInvestmentRoundRoutes);
app.use("/api/user/dashboard", UserDashboardRoutes);
app.use("/api/user/company", UserCompanyRoutes);
app.use("/api/user/accesslogs", CompanyAccessLogsRoutes);
app.use("/api/user/waitlist", Userwaitlist);
app.use("/api/user/companydashboard", Companydashboard);

//User Routes

//Signatory Routes
app.use("/api/user/signatory", SignatoryRoutes);
app.use("/api/user/signatorydashboard", SignatorydashboardRoutes);
//Signatory Routes

// Start server
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
server.setTimeout(600000);
