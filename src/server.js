import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger); 
app.use(express.urlencoded({extended:true}));       //express app이 form의 value를 이해할 수 있게 돕는다.

app.use(
    session({
        secret: process.env.COOKIE_SECRET,                      
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
        cookie: {
            maxAge: 18000000,
        }
    })
);
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;