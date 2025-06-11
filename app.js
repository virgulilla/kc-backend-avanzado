import createError from "http-errors";
import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as sessionManager from "./lib/sessionManager.js";
import flash from "connect-flash";
import { indexRouter } from "./routes/index.js";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { fileURLToPath } from "url";
import { addFlashMessages } from "./lib/flashmessages.js";
import i18n from "./lib/i18nConfigure.js";
import * as apiProductsController from "./controllers/api/apiProductsController.js";
import upload from "./lib/uploadConfigure.js";

const app = express();

app.disable("x-powered-by");

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", (await import("ejs")).__express);
app.locals.appName = "NodePop";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/lib/nouislider", express.static("node_modules/nouislider/dist"));

app.use(sessionManager.sessionMiddleware);
app.use(sessionManager.useSessionInViews);

app.get('/api/products', apiProductsController.list)
app.get('/api/products/:productId', apiProductsController.getOne);
app.post('/api/products',  upload.single("image"), apiProductsController.newProduct)

app.use(i18n.init);

app.use(flash());
app.use(addFlashMessages);
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", {
    message: err.message || "Algo salió mal",
    error: req.app.get("env") === "development" ? err : {},
  });
});

export default app;
