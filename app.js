


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import * as path from "path";



// router import koray nibo রাউটার ইমম্পরট করে নিতে হবে
import router from "./routes/blog.js"


//config thika import koray nitay hobay; কনফিক থাইকা ইম্পরট করতে হবে;
import {MONGODB_CONNECTION,PORT,MAX_JSON_SIZE,URL_ENCODED,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME} from "./app/Config/config.js";



//express js akta constant এক্সপ্রেস জেস একটা কন্সটেন্ট
const app = express();



//global application middleware enter ta application kaj korbay; গ্লবোবাল অ্যাপ্লিকেশান মিডেলওয়ারে এন্টার টা অ্যাপ্লিকেশান কাজ করবে;

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended:URL_ENCODED}));
app.use(hpp());
app.use(helmet())
app.use(cookieParser())



//rate limiter..  user application kotobar hit kortay parbay; লিমিটার ইওজার কতবার ইট করতে পারবে তা সেট করা;

const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)


//web caching.

app.set('etag',WEB_CACHE);

//mongoDB connection

/*
you need to connect mongoDB Here
 */




// set api Routers,     oporthika router import kortay hobay; আপিয়াই রউটারস উপর থাইকা ইম্পরট করতে হবে;
app.use("/api",router);


// set application storage..   file upload korar jonno storage toiri kora;অ্যাপ্লিকেশান ইস্টরেজ ফাইল আপলোড করতে হবে;
app.use(express.static("storage"));


//application ta running korar jonno babohar koray hobay;  অ্যাপ্লিকেশন টা রান করার জন্য ব্যবহার করতে হবে;

app.listen(PORT,() => {
    console.log (`app running on port: ${PORT}`);
})
