const gulp = require("gulp");
const replace = require("gulp-replace");
const dotenv = require("dotenv");

dotenv.config();

gulp.task("inject-env", () => {
  return gulp
    .src("index.html")
    .pipe(replace("G-WR44F2NEMR", process.env["GA_MEASUREMENT_ID"]))
    .pipe(
      replace(
        "https://minimalistic-calculator-granada.vercel.app/",
        process.env["CALCULATOR_STAGING"],
      ),
    )
    .pipe(
      replace(
        "https://minimalistic-shop.vercel.app/",
        process.env["SHOP_STAGING"],
      ),
    )
    .pipe(
      replace(
        "https://minimalistic-shop-api.onrender.com",
        process.env["SHOP_API_STAGING"],
      ),
    )
    .pipe(gulp.dest("."));
});
