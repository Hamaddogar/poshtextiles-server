// require('dotenv').config()
const actorSkelton = require("./models/actorModel");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const express = require('express');
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const app = express();

// useage
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.static("./build"));
app.use(express.static("./uploads"));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Model Import for chat and blogs post etc
const CurrentUser = require('./models/CurrentUser');
const User = require('./models/User');
const News = require('./models/News');
const Blog = require('./models/Blog');
const Subscription = require('./models/Subscription');
const Payment = require('./models/Payment');
const Dispute = require('./models/Dispute');
const Confirmation = require('./models/AccountConfirm');
const RegInfo = require('./models/RegInfo');
const ForgotPassword = require('./models/ForgotPassword');



const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}
app.listen(PORT, () => { console.log('server is running'); })


// app.listen(8080 || process.env.PORT)


// ------------------------.ENV CONFIG ------------------//

// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@codehouse.qo5qv.mongodb.net/dappFYP?retryWrites=true&w=majority';
// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.omnjc.mongodb.net/drcode?retryWrites=true&w=majority';
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.prcdr.mongodb.net/fyp?retryWrites=true&w=majority';
// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abdullah:1234@cluster0.nspdg.mongodb.net/fypDB?retryWrites=true&w=majority';



// -------------DB Connection----------------- //
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, connection) => {
    console.log(err || connection);
});


// -------------Multer----------------- //
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.join(__dirname, "/build/images/"));
        cb(null, path.join(__dirname, "../client/public/images"));
    },
    filename: function (req, file, cb) { cb(null, file.originalname); },
});

const storagePdf = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.join(__dirname, "/build/files/"));
        cb(null, path.join(__dirname, "../client/public/files"));
    },
    filename: function (req, file, cb) { cb(null, file.originalname); },
});



const upload = multer({ storage: storage });
const uploadPdf = multer({ storage: storagePdf });




// -------------Server ----------------- //


// -------------Server ----------------- //

// images uploader
app.post("/imageuploader", upload.single('upload_file'), async (req, res) => {
    res.send(req.file.filename);
});

// files uploader
app.post("/fileuploader", uploadPdf.single('upload_file'), async (req, res) => {
    res.send(req.file.filename);
})



// default data
app.get('/defaultData', async (req, res) => {
    try {
        let allData = await actorSkelton.find({}, { actorLoginPassword: 0 });
        res.send({ success: true, message: allData });
    } catch (error) {
        res.send({ success: true, message: error.message });
    }
})

// default data admin
app.get('/defaultadmindata', async (req, res) => {
    try {
        let allData = await actorSkelton.find({}, { actorLoginPassword: 0 });
        res.send({ success: true, message: allData });
    } catch (error) {
        res.send({ success: true, message: error.message });
    }
})




// registration
app.post("/registration", async (req, res) => {
    const { actorLoginId, actorLoginPassword, actorFirstName, actorLastName, actorDP, actorBio, actorRole, actorKYCBlockChain, walletAddress } = req.body;
    try {
        const user = await actorSkelton.findOne({ actorLoginId });
        if (user) {
            res.send({ success: false, message: 'User already exists' });
        } else {
            const newUser = new actorSkelton({
                actorLoginId,
                actorLoginPassword,
                actorFirstName,
                actorLastName,
                actorDP,
                actorBio,
                actorRole,
                walletAddress,
                actorKYCBlockChain,
                // default data
                actorLocation: 'New York',
                actorKYCStatus: 'pending',
                actorKYCData: {},
                actorImage: 'https://source.unsplash.com/random',
                actorSkills: ['HTML', 'CSS', 'JS', 'React', 'Angular', 'Vue', 'Node', 'MongoDB'],
                jobsPosted: [],
                jobsWorkedOn: [],
            });
            await newUser.save();
            res.send({ success: true, message: 'User Registered' });
        }
    } catch (error) {
        res.send({ success: false, message: error.message });
    }

});

// loginRoute 
app.post('/login', async (req, res) => {
    try {
        let user = await actorSkelton.findOne({ actorLoginId: req.body.email });
        if (user) {
            if (user.actorRole === 'admin') {
                if (user.actorLoginPassword === req.body.password) {
                    // delete user.actorLoginPassword;
                    res.send({ success: true, message: 'Welcone Admin', user });
                } else {
                    res.send({ success: false, message: 'Password is incorrect' });
                }
            } else if (user.actorRole === 'freelancer') {
                if (user.actorLoginPassword === req.body.password) {
                    // delete user.actorLoginPassword;
                    res.send({ success: true, message: 'Login Successful', user });
                } else {
                    res.send({ success: false, message: 'Password is incorrect' });
                }
            } else if (user.actorRole === 'buyer') {
                if (user.actorLoginPassword === req.body.password) {
                    // delete user.actorLoginPassword;
                    res.send({ success: true, message: 'Login Successful', user });
                } else {
                    res.send({ success: false, message: 'Password is incorrect' });
                }
            } else {
                res.send({ success: false, message: 'User not found' });
            }
        } else {
            res.send({ success: false, message: 'Invalid Email!' });
        }
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
})

// kucuk resimleri upload etmek icin
// KYC
app.post("/actorkycapply", async (req, res) => {
    const { selfieWithId, selfie, userName, cnic, dob, email, phone, userMongoId, actorKYCStatus, actorKYCBlockChain } = req.body;
    try {
        const user = await actorSkelton.findOne({ _id: userMongoId });
        if (user) {
            actorSkelton.updateOne({ _id: userMongoId }, {
                actorKYCData: { userName, cnic, dob, email, phone, selfieWithId, selfie },
                actorKYCStatus,
                actorKYCBlockChain,
            }).exec();

            if (actorKYCBlockChain) {
                res.send({ success: true, message: 'KYC Applied and Approved Successfully' });
            } else {
                res.send({ success: true, message: 'KYC applied But Not Approved!' });
            }
        } else {
            res.send({ success: false, message: 'Try Again! Later' });
        }

    } catch (error) {
        res.send({ success: false, message: error.message });
    }

});


// actionKYC
app.post("/actionkyc", async (req, res) => {
    const { userMongoId, action } = req.body;
    try {
        if (action === 'approve') {
            actorSkelton.updateOne({ _id: mongoose.Types.ObjectId(userMongoId) }, { actorKYCStatus: 'approved', actorKYCBlockChain: true }).exec();
            res.send({ success: true, message: 'KYC Approved' });
        } else if (action === 'reject') {
            actorSkelton.updateOne({ _id: mongoose.Types.ObjectId(userMongoId) }, { actorKYCStatus: 'rejected' }).exec();
            res.send({ success: true, message: 'KYC Rejected' });
        } else {
            res.send({ success: false, message: 'Undesired Action' });
        }
    } catch (error) {
        res.send({ success: false, message: error.message });
    }

});


// bidonjob
app.post("/bidonjob", async (req, res) => {
    const { targetedJob, bidAmount, bidDescription, bidDuration, portFolio, attachment, freelancerWhoApplied } = req.body;
    const { actorMongoId, jobId, jobTitle, jobPostedBy, jobDescription, jobSkills, buyerDP, bcListingHash } = targetedJob;
    const { _id, actorDP, actorFirstName, actorLastName, walletAddress } = freelancerWhoApplied;
    try {
        await actorSkelton.updateOne({ "jobsPosted.jobId": mongoose.Types.ObjectId(jobId) }, {
            $push: {
                "jobsPosted.$.appliedByFreelancers": {
                    freelancerBidAmount: bidAmount,
                    freelancerBidDescription: bidDescription,
                    freelancerBidDuration: bidDuration,
                    freelancerID: mongoose.Types.ObjectId(_id),
                    freelancerFullName: actorFirstName + " " + actorLastName,
                    freelancerDP: actorDP,
                    freelancerPortfolio: portFolio,
                    freelancerAttachment: attachment,
                    freelancerLoginId: freelancerWhoApplied.actorLoginId,

                    bcListingHash: bcListingHash,
                    buyerDP: buyerDP,
                    buyerJobId: jobId,
                    buyerActorMongoId: mongoose.Types.ObjectId(actorMongoId),
                    buyerJobTitle: jobTitle,
                    buyerFullName: jobPostedBy,
                    buyerJobDescription: jobDescription,
                    buyerJobSkills: jobSkills,
                    walletAddress,
                }
            }
        }).exec();
        // freelancer Applied Jobs Updating
        await actorSkelton.updateOne({ _id: mongoose.Types.ObjectId(_id) }, {
            $push: {
                "jobsWorkedOn": {
                    freelancerBidAmount: bidAmount,
                    freelancerBidDescription: bidDescription,
                    freelancerBidDuration: bidDuration,
                    freelancerID: mongoose.Types.ObjectId(_id),
                    freelancerFullName: actorFirstName + " " + actorLastName, freelancerDP: actorDP,
                    buyerMonogoId: actorMongoId,
                    buyerJobId: mongoose.Types.ObjectId(jobId),
                    buyerActorMongoId: mongoose.Types.ObjectId(actorMongoId),
                    buyerJobTitle: jobTitle,
                    buyerFullName: jobPostedBy,
                    buyerJobDescription: jobDescription,
                    buyerDP: buyerDP,
                    bcListingHash: bcListingHash,
                    buyerJobSkills: jobSkills,
                    freelancerDP: actorDP,
                    isHired: false,
                    isPaid: false,
                    jobStatus: 'pending',
                }
            }
        }).exec();
        res.send({ success: true, message: 'Bid Placed On Job' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});


// joblist
app.post("/postnewjob", async (req, res) => {
    const { actorMongoId, buyerDP, jobPostedBy, jobTitle, jobPostedTime, jobDescription, jobBudget, jobDuration, jobSkills, } = req.body;
    try {
        const jobObject = {
            jobId: new mongoose.Types.ObjectId(),
            actorMongoId,
            jobTitle,
            jobPostedTime,
            jobPostedBy,
            jobDescription,
            jobBudget,
            ratingByFreelacer: 4.3,
            jobDuration,
            jobSkills,
            buyerDP,
            bcJobDoneHash: '',
            bcListingHash: '',
            jobstatusBlockChain: false,
            jobStatus: 'new',
            awardedToFreelacerStatus: false,
            awardedToFreelacer: {},
            doneByFreelacer: {},
            jobComment: '',
            appliedByFreelancers: [],
        }
        await actorSkelton.updateOne({ _id: actorMongoId },
            {
                $push: {
                    jobsPosted: jobObject
                }
            }).exec();
        res.send({ success: true, message: 'Job Posted', thisJob: { jobId: jobObject.jobId, jobBudget: jobObject.jobBudget } });
    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
});


// approve new job blockchain
app.post("/approvenewjob", async (req, res) => {
    const { actorMongoId, jobMongoId, jobstatusBlockChain, bcListingHash } = req.body;
    try {
        console.log(jobMongoId, jobstatusBlockChain);
        await actorSkelton.updateOne({ "jobsPosted.jobId": mongoose.Types.ObjectId(jobMongoId) },
            {
                $set: {
                    "jobsPosted.$.jobstatusBlockChain": true,
                    "jobsPosted.$.bcListingHash": bcListingHash,
                }
            }).exec();
        res.send({ success: true, message: 'Job Posted BC' });
    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
});


// givemeuser
app.post("/givemeuser", async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const user = await actorSkelton.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
        res.send({ success: true, user });
    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
})




// delete Job 
app.post("/deletejob", async (req, res) => {
    const { jobMongoId } = req.body;
    try {
        // buyer delartion
        await actorSkelton.updateOne({ "jobsPosted.jobId": mongoose.Types.ObjectId(jobMongoId) },
            { $pull: { "jobsPosted": { jobId: mongoose.Types.ObjectId(jobMongoId) } } }
        ).exec();


        // freelancer delartion
        await actorSkelton.updateMany({ "jobsWorkedOn.buyerJobId": mongoose.Types.ObjectId(jobMongoId) },
            { $pull: { "jobsWorkedOn": { buyerJobId: mongoose.Types.ObjectId(jobMongoId) } } }
        ).exec();

        res.send({ success: true, message: 'Job Deleted' });
    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
});

// unassignjob
app.post("/unassignjob", async (req, res) => {
    const { job } = req.body;
    console.log(job);


    try {

        await actorSkelton.updateOne({ "jobsPosted.jobId": mongoose.Types.ObjectId(job.jobId) },
            {
                $set: {
                    "jobsPosted.$.jobStatus": 'cancled',
                }
            }).exec();

        await actorSkelton.updateOne({ "jobsWorkedOn.buyerJobId": mongoose.Types.ObjectId(job.jobId), "jobsWorkedOn.isHired": true },
            {
                $set: {
                    "jobsWorkedOn.$.jobStatus": 'cancled',
                }
            }
        ).exec();

        res.send({ success: true, message: 'Job Unassigned' });

    }
    catch (error) {
        res.send({ success: false, message: error.message });
    }
}
)


// personal profile update
app.post("/actorupdator", async (req, res) => {
    const { actorLocation, actorFirstName, actorLastName, actorDP, actorBio, actorMongoId } = req.body;
    try {
        await actorSkelton.updateOne({ _id: mongoose.Types.ObjectId(actorMongoId) },
            {
                $set: {
                    actorFirstName,
                    actorLastName,
                    actorDP,
                    actorBio,
                    actorLocation,
                }
            }).exec();
        res.send({ success: true, message: 'Profile Updated' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
})


// actor data update
app.post("/updateactordata", async (req, res) => {
    const { actorMongoId } = req.body;
    try {
        const user = await actorSkelton.findOne(
            { _id: mongoose.Types.ObjectId(actorMongoId) }
        ).exec();
        res.send({ success: true, message: 'Actor Data Updated', user });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});




// jobAssigner
app.post("/jobAssigner", async (req, res) => {
    const { job, freelancer, buyerId } = req.body;
    const {
        freelancerId,
        freelancerFullName,
        freelancerBidAmount,
        freelancerBidDuration,
        freelancerWalletAddress,
        freelancerLoginId,
    } = freelancer;
    const { jobId, bcAssignHash } = job;
    try {
        // freelancer settings

        // awarded freelancer
        await actorSkelton.updateMany(
            { "jobsWorkedOn.buyerJobId": mongoose.Types.ObjectId(jobId) },
            { $set: { "jobsWorkedOn.$.jobStatus": "hired", "jobsWorkedOn.$.bcAssignHash": bcAssignHash } }
        ).exec();
        // buyer settings
        await actorSkelton.updateOne(
            { "jobsWorkedOn.buyerJobId": mongoose.Types.ObjectId(jobId) },
            { $set: { "jobsWorkedOn.$.isHired": true, "jobsWorkedOn.$.isPaid": false, "jobsWorkedOn.$.jobStatus": "hired", "jobsWorkedOn.$.bcAssignHash": bcAssignHash } }
        ).exec();


        // buyer settings
        await actorSkelton.updateOne(
            { "jobsPosted.jobId": mongoose.Types.ObjectId(jobId) },
            {
                "jobsPosted.$.awardedToFreelacerStatus": true,
                "jobsPosted.$.jobStatus": "hired",
                "jobsPosted.$.awardedToFreelacer": { bcAssignHash, freelancerLoginId, freelancerId, freelancerFullName, freelancerBidAmount, freelancerBidDuration, freelancerWalletAddress, },
            }).exec();
        res.send({ success: true, message: 'Successfuly Assigned Job' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});




// jobDone
app.post("/jobdone", async (req, res) => {
    const { jobID, bcJobDoneHash, freelancerId } = req.body;
    try {
        // job done update
        await actorSkelton.updateOne(
            { "jobsPosted.jobId": mongoose.Types.ObjectId(jobID) },
            {
                $set: {
                    "jobsPosted.$.jobStatus": "completed",
                    "jobsPosted.$.awardedToFreelacerStatus": true,
                    "jobsPosted.$.bcJobDoneHash": bcJobDoneHash,
                }
            }
        ).exec();

        // freelancer update
        await actorSkelton.updateOne(
            { "jobsWorkedOn.buyerJobId": mongoose.Types.ObjectId(jobID) },
            {
                $set: {
                    "jobsWorkedOn.$.isHired": true,
                    "jobsWorkedOn.$.isPaid": true,
                    "jobsWorkedOn.$.jobStatus": "completed",
                    "jobsWorkedOn.$.bcJobDoneHash": bcJobDoneHash,
                }
            }
        ).exec();
        res.send({ success: true, message: 'Job Completed and Paid' });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});
























// This code is written by Abdullah for blogs posting mailing etc




app.post("/CurrentUser", async (req, res) => {
    try {
        const { username, userpassword } = req.body
        console.log(username, "username")
        console.log(userpassword, "userpassword")
        const newUser = new CurrentUser({
            name: username,
            password: userpassword,
            creationtime: Date.now()
        });
        await newUser.save();
        res.send("Successfully Stored")
    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});

app.get("/GetCurrentUser", async (req, res) => {
    try {
        const data = await CurrentUser.find({}).sort({ creationtime: -1 }).limit(1)
        res.send(data)
    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});


app.post("/CreateUser", async (req, res) => {
    try {
        const { name, username, password } = req.body
        console.log(username, "username")
        console.log(password, "userpassword")
        console.log(name, "name")
        const newUser = new User({
            name: name,
            username: username,
            password: password
        });
        await newUser.save();
        res.send("Successfully Stored")
    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});

// #################################################
// Job Deletion Email Notification
// #################################################


app.post("/JobDeletionmailNotfication", async (req, res) => {
    try {
        const { emailArray, password, jobtitle } = req.body
        if (password == "9281") {

            let dateStamp = new Date(Date.now());

            if (emailArray.lenght > 0) {
                for (let index = 0; index < emailArray.length; index++) {
                    // NodeMailer Code Here

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bloclanceteam@gmail.com',
                            pass: 'udiibdpkvyzupwov'
                        }
                    });

                    send();

                    async function send() {
                        const mailResponse = await transporter.sendMail({
                            from: 'Bloclance Team',
                            to: emailArray[index].email,
                            subject: 'News Letter',
                            text: `Hi This is a Message from Bloclance Team. The following Job ${jobtitle} has been removed by owner on this Data ${dateStamp}. Thanks! <br/> 
              ${heading} <br/>
              ${content} <br/>
              `
                        });

                        console.log(JSON.stringify(mailResponse, null, 4));
                    }

                }
                res.send("success")
            } else {
                res.send("success")
            }



        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});







// #################################################
// Email Notification
// #################################################

app.post("/mailNotfication", async (req, res) => {
    try {
        const { email, password } = req.body
        if (password == "9281") {

            let dateStamp = new Date(Date.now());
            // NodeMailer Code Here

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bloclanceteam@gmail.com',
                    pass: 'udiibdpkvyzupwov'
                }
            });

            send();
            async function send() {
                const result = await transporter.sendMail({
                    from: 'Bloclance Team',
                    to: email,
                    subject: 'KYC Application Alert',
                    text: `Hi This is a Message from Bloclance Team. Please Apply for KYC if you want to use our platform properly This email is sent by Admin. Thanks!`
                });

                console.log(JSON.stringify(result, null, 4));
                res.send("Email Notification has been Sent Successfully.")
            }

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});








// let dateStamp = new Date(creationstamp);
// console.log(dateStamp.toString())

app.post("/DeleteNews", async (req, res) => {
    try {
        const { id, password } = req.body
        if (password == "9281") {

            await News.deleteOne({ _id: id });
            res.send("News Successfully Deleted")

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});




app.post("/PostNews", async (req, res) => {
    try {
        const { heading, content, password } = req.body
        if (password == "9281") {
            console.log(heading, "heading")
            console.log(content, "content")

            let dateStamp = new Date(Date.now());

            const newNews = new News({
                heading: heading,
                content: content
            });
            await newNews.save();

            await Subscription.find({}, async (err, result) => {
                console.log(result, "result")
                if (result.length == 0) {
                    res.send("News Successfully Posted")
                } else {

                    for (let index = 0; index < result.length; index++) {
                        // NodeMailer Code Here

                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'bloclanceteam@gmail.com',
                                pass: 'udiibdpkvyzupwov'
                            }
                        });

                        send();

                        async function send() {
                            const mailResponse = await transporter.sendMail({
                                from: 'Bloclance Team',
                                to: result[index].email,
                                subject: 'News Letter',
                                text: `Hi This is a Message from Bloclance Team. We have our News Letter for you Please Check the following News that is posted on ${dateStamp.toString()} Thanks! <br/> 
                ${heading} <br/>
                ${content} <br/>
                `
                            });

                            console.log(JSON.stringify(mailResponse, null, 4));
                        }

                    }

                    res.send("News Successfully Posted")

                }
            }).clone().catch(function (err) { console.log(err) })


        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});

app.get("/getAdminNews", async (req, res) => {
    try {
        const data = await News.find({}).sort({ creationstamp: -1 })
        res.send(data)
    } catch (e) {
        console.log(e);
        res.send(e.message)

    }
});


app.post("/dynamicNews", async (req, res) => {
    try {
        const { id } = req.body
        await News.find({ _id: id }, (err, result) => {
            res.send(result)
        });
    } catch (e) {
        console.log(e.message);
    }
});



// #################################################
// Blog Section Starts Here
// #################################################

app.post("/PostBlog", async (req, res) => {
    try {
        const { heading, content, password, writername } = req.body
        if (password == "9281") {
            console.log(heading, "heading")
            console.log(content, "content")
            console.log(writername, "writername")
            const newBlog = new Blog({
                writername, writername,
                heading: heading,
                content: content
            });
            await newBlog.save();
            res.send("Blog Successfully Posted")
        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});

app.get("/getBlogs", async (req, res) => {
    try {
        const data = await Blog.find({}).sort({ creationstamp: -1 })
        res.send(data)
    } catch (e) {
        console.log(e);
        res.send(e.message)

    }
});



app.post("/getUserBlogs", async (req, res) => {
    try {
        const { writername, password } = req.body
        if (password == "9281") {
            console.log(writername, "writername")

            Blog.find({ writername: writername }, function (err, result) {
                if (err) {
                    res.send(err.message)
                }
                else {
                    res.send(result)
                }
            }).clone().catch(function (err) { console.log(err) })

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});


app.post("/DeleteBlog", async (req, res) => {
    try {
        const { id, password } = req.body
        if (password == "9281") {

            await Blog.deleteOne({ _id: id });
            res.send("Blog Successfully Deleted")

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});






app.post("/dynamicBlogs", async (req, res) => {
    try {
        const { id } = req.body
        await Blog.find({ _id: id }, (err, result) => {
            console.log(result)
            res.send(result)
        });
    } catch (e) {
        console.log(e.message);
    }
});




// #################################################
// Subscription Feature Implementation
// #################################################


app.post("/Subscribe", async (req, res) => {
    try {
        const { email, password } = req.body
        if (password == "9281") {
            console.log(email, "Email")

            // Program logic here check if user is already Subscribed
            await Subscription.find({ email: email }, async (err, result) => {
                // Logic for checking is user is not available in DB and send response accordingly
                if (result.length == 0) {

                    const newSubscription = new Subscription({
                        email: email,
                    });
                    await newSubscription.save();

                    // NodeMailer Code Here

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bloclanceteam@gmail.com',
                            pass: 'udiibdpkvyzupwov'
                        }
                    });

                    send();

                    async function send() {
                        const result = await transporter.sendMail({
                            from: 'Bloclance Team',
                            to: email,
                            subject: 'Subscription Letter',
                            text: `Hi This is a Message from Bloclance Team upon the Successful Subscription to our News Letter Thanks!`
                        });

                        console.log(JSON.stringify(result, null, 4));
                        res.send("User Successfully Subscribed")
                    }

                } else {
                    res.send("User has Already Subscribed to our News Letters")
                }
            }).clone().catch(function (err) { console.log(err) })
        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});


// #######################################################
// Receipt Email
// #######################################################


app.get("/getTransactions", async (req, res) => {
    try {
        const data = await Payment.find({}).sort({ creationstamp: -1 })
        if (data.length > 0) {
            res.send(data)
        } else {
            res.send("There are no Transactions yet!")
        }
    } catch (e) {
        console.log(e);
        res.send(e.message)

    }
});


app.post("/paymentmail", async (req, res) => {
    try {
        const { fromemail, toemail, amount, fromwalletAddress, towalletAddress, password } = req.body
        if (password == "9281") {

            let dateStamp = new Date(Date.now());

            const newPayment = new Payment({
                fromemail: fromemail,
                amount: amount,
                fromwalletAddress: fromwalletAddress,
                towalletAddress: towalletAddress
            });
            await newPayment.save();

            // NodeMailer Code Here

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bloclanceteam@gmail.com',
                    pass: 'udiibdpkvyzupwov'
                }
            });

            send();

            async function send() {
                const result = await transporter.sendMail({
                    from: 'Bloclance Team',
                    to: toemail,
                    subject: 'Transaction Alert',
                    text: `Hi This is a Message from Bloclance Team upon the Successful Transaction of Amount ${amount} BNB from ${fromemail} to your account as mentioned ${towalletAddress} on this date ${dateStamp.toString()} Thanks!`
                });

                console.log(JSON.stringify(result, null, 4));
                res.send("Transaction Alert Successfully Sent through Email!")
            }

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});





// #######################################################
// Reset Password
// #######################################################

app.post("/ForgotPinVerification", async (req, res) => {
    try {
        const { email, password } = req.body
        if (password == "9281") {
            let dateStamp = new Date(Date.now());
            let generatedPIN = Date.now().toString().slice(-5)
            // testing code
            // const newForgotPassword = new ForgotPassword({
            //   email: email,
            //   pin: generatedPIN
            // });
            // await newForgotPassword.save();
            // res.send("Success")

            // let dateStamp = new Date(Date.now());
            // let generatedPIN = Date.now().toString().slice(-5)

            // Query if Your DB Contains this Data
            await ForgotPassword.find({ email: email }, async (err, result) => {

                if (err) {
                    res.send(err.message)
                } else {
                    const newForgotPassword = new ForgotPassword({
                        email: email,
                        pin: generatedPIN
                    });
                    await newForgotPassword.save();


                    // NodeMailer Code Here

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bloclanceteam@gmail.com',
                            pass: 'udiibdpkvyzupwov'
                        }
                    });

                    send();

                    async function send() {
                        const result = await transporter.sendMail({
                            from: 'Bloclance Team',
                            to: email,
                            subject: 'Account Verification Alert',
                            text: `Hi Please Verify your Email using this PIN ${generatedPIN}  on our platform Thanks!`
                        });

                        console.log(JSON.stringify(result, null, 4));
                        res.send("PIN Successfully Sent through Email!")
                    }

                }

            }).clone().catch(function (err) { console.log(err) })



        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});




app.post("/ForgotPinConfirmation", async (req, res) => {
    try {
        const { email, password, pin } = req.body
        if (password == "9281") {

            // Query if Your DB Contains this Data

            const data = await ForgotPassword.find({ email: email }).sort({ creationstamp: -1 }).limit(1)
            console.log(data, "data")
            if (data.length == 0) {
                res.send("You haven't Applied for Password reset!")
            } else {

                if (data[0].pin == pin) {

                    // NodeMailer Code Here

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bloclanceteam@gmail.com',
                            pass: 'udiibdpkvyzupwov'
                        }
                    });

                    send();

                    async function send() {
                        const result = await transporter.sendMail({
                            from: 'Bloclance Team',
                            to: data[0].email,
                            subject: 'Password PIN Confirmation Alert',
                            text: `Hi You Have successfully Reset Your Password For Bloclance platform Thanks!`
                        });

                        console.log(JSON.stringify(result, null, 4));
                        res.send("success")
                    }

                } else {
                    res.send("You have Entered Incorrect PIN Please Try Again")
                }

            }

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});






// #######################################################
// Registration
// #######################################################


app.post("/registrationVerification", async (req, res) => {
    try {
        const { email, password } = req.body
        if (password == "9281") {
            // This is real Code for Server

            let generatedPIN = Date.now().toString().slice(-5)

            // Query if Your DB Contains this Data
            await RegInfo.find({ email: email }, async (err, result) => {
                if (err) {
                    consoe.log("err mei masla hy")
                    res.send(err.message)
                } else {

                    if (result.length == 0) {

                        const newConfirmation = new Confirmation({
                            email: email,
                            pin: generatedPIN
                        });
                        await newConfirmation.save();


                        // NodeMailer Code Here

                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'bloclanceteam@gmail.com',
                                pass: 'udiibdpkvyzupwov'
                            }
                        });

                        send();

                        async function send() {
                            const result = await transporter.sendMail({
                                from: 'Bloclance Team',
                                to: email,
                                subject: 'Account Verification Alert',
                                text: `Hi Please Verify your Email using this PIN ${generatedPIN}  on our platform Thanks!`
                            });

                            console.log(JSON.stringify(result, null, 4));
                            res.send("PIN Successfully Sent through Email!")

                        }


                    } else {

                        res.send("This Username is Already Registered!")
                    }

                }
            }).clone().catch(function (err) { console.log(err) })



        } else {

            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e, "yh hy masla");
        res.send(e.message)
    }
});




app.post("/regPinConfirmation", async (req, res) => {
    try {
        const { email, password, pin } = req.body
        if (password == "9281") {

            // Query if Your DB Contains this Data

            const data = await Confirmation.find({ email: email }).sort({ creationstamp: -1 }).limit(1)
            if (data.length == 0) {
                res.send("You havn't Applied for Verification!")
            } else {

                if (data[0].pin == pin) {

                    // NodeMailer Code Here

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bloclanceteam@gmail.com',
                            pass: 'udiibdpkvyzupwov'
                        }
                    });

                    send();

                    async function send() {
                        const result = await transporter.sendMail({
                            from: 'Bloclance Team',
                            to: data[0].email,
                            subject: 'Account Registration Alert',
                            text: `Hi You are successfully Registered on our platform Bloclance Thanks!`
                        });

                        console.log(JSON.stringify(result, null, 4));
                        res.send("success")
                    }

                } else {
                    res.send("You have Entered Incorrect PIN Please Try Again")
                }

            }

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});




app.post("/storeReginfo", async (req, res) => {
    try {
        const { email, password } = req.body
        if (password == "9281") {
            const newRegInfo = new RegInfo({
                email: email
            });
            await newRegInfo.save();
            res.send("success")
        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }
    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});






// #######################################################
// Dispute
// #######################################################


app.get("/getResolvedDisputes", async (req, res) => {
    try {
        const data = await Dispute.find({ isResolved: true }).sort({ creationstamp: -1 })
        res.send(data)
    } catch (e) {
        console.log(e);
        res.send(e.message)

    }
});


app.get("/getUnResolvedDisputes", async (req, res) => {
    try {
        const data = await Dispute.find({ isResolved: false }).sort({ creationstamp: -1 })
        res.send(data)
    } catch (e) {
        console.log(e);
        res.send(e.message)

    }
});



app.post("/Dispute", async (req, res) => {
    try {
        const { claimedby, claimedto, disputetopic, description, password } = req.body
        if (password == "9281") {

            let dateStamp = new Date(Date.now());

            const newDispute = new Dispute({
                claimedby: claimedby,
                claimedto: claimedto,
                disputetopic: disputetopic,
                description: description,
                isResolved: false
            });
            await newDispute.save();

            // NodeMailer Code Here

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bloclanceteam@gmail.com',
                    pass: 'udiibdpkvyzupwov'
                }
            });

            send();

            async function send() {
                const result = await transporter.sendMail({
                    from: 'Bloclance Team',
                    to: claimedby,
                    subject: 'Dispute Submission Alert!',
                    text: `Hi This is a Message from Bloclance Team upon the Successful Submission of Dispute to our Support Team on this date ${dateStamp.toString()}. Our Team will contact you ASAP Thanks!`
                });

                console.log(JSON.stringify(result, null, 4));
                res.send("Dispute Alert Successfully Sent")
            }

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});




// Dispute Resolution

app.post("/DisputeResolution", async (req, res) => {
    try {
        const { id, from, to, password } = req.body
        if (password == "9281") {
            let dateStamp = new Date(Date.now());

            await Dispute.findOneAndUpdate({ _id: id }, { isResolved: true }, async function (err, result) {

                if (err) {
                    res.send(err.message)
                }
                else {

                    for (let index = 0; index < 2; index++) {
                        // NodeMailer Code Here

                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'bloclanceteam@gmail.com',
                                pass: 'udiibdpkvyzupwov'
                            }
                        });

                        send();

                        async function send() {
                            const result = await transporter.sendMail({
                                from: 'Bloclance Team',
                                to: index == 0 ? from : to,
                                subject: 'Dispute Resolution Alert!',
                                text: `Hi This is a Message from Bloclance Team upon the Successful Resolution of Dispute from our Support Team on this date ${dateStamp.toString()}. Our Team is Happy for you Thanks!`
                            });

                            console.log(JSON.stringify(result, null, 4));
                        }

                    }

                    res.send("Dispute Resolution Alert Successfully Sent to Both Parties")

                }

            })


        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});






// #######################################################
// Awarded and Not Awarded customers
// #######################################################



app.post("/awardedProjectMail", async (req, res) => {
    try {
        const { fromemail, toemail, projectname, password } = req.body
        if (password == "9281") {

            let dateStamp = new Date(Date.now());

            // NodeMailer Code Here

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bloclanceteam@gmail.com',
                    pass: 'udiibdpkvyzupwov'
                }
            });

            send();

            async function send() {
                const result = await transporter.sendMail({
                    from: 'Bloclance Team',
                    to: toemail,
                    subject: 'Job Acceptance Alert',
                    text: `Hi This is a Message from Bloclance Team upon the Successful Job Acceptance from ${fromemail} on project named ${projectname} on this date ${dateStamp.toString()}. For further details please visit bloclance web application  Thanks!`
                });

                console.log(JSON.stringify(result, null, 4));
                res.send("Job Acceptance Alert Successfully Sent through Email!")
            }

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});




app.post("/rejectionmailsender", async (req, res) => {
    try {
        const { rejectedmails, projectname, password } = req.body
        if (password == "9281") {

            let dateStamp = new Date(Date.now());

            // NodeMailer Code Here

            for (let index = 0; index < rejectedmails.length; index++) {

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'bloclanceteam@gmail.com',
                        pass: 'udiibdpkvyzupwov'
                    }
                });

                send();

                async function send() {
                    const result = await transporter.sendMail({
                        from: 'Bloclance Team',
                        to: rejectedmails[index],
                        subject: 'Job Rejection Alert',
                        text: `Hi This is a Message from Bloclance Team upon the Rejection from ${fromemail} on project named ${projectname} on this date ${dateStamp.toString()}. Better Luck Next time Thanks!`
                    });

                    console.log(JSON.stringify(result, null, 4));
                }

            }

            res.send("Job Rejection Alert Successfully Sent through Email!")

        } else {
            res.send("Alert: This is Secured Route you dont have any rights.")
        }

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }
});




// Reset Pass

app.post("/restpassword", async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);
    try {
        const user = await actorSkelton.findOne({ actorLoginId: email });
        if (user) {
            await actorSkelton.updateOne({ actorLoginId: email }, { actorPassword: password });
            res.send({ success: true, message: "Password Successfully Reset" })
        }
        else {
            res.send({ success: false, message: "Email Not Registered !" })
        }
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message })
    }
});

