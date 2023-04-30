const fs = require("fs");
const path = require("path");

module.exports = (photo, res) => {
  if (photo) {
    if (typeof photo === "object") {
      for (var i = 0; i < photo.length; i++) {
        fs.unlink(
          path.join(__dirname, "../../client/public/uploades/" + photo[i]),
          (err, data) => {
            if (err) {
              return;
            }
            return;
          }
        );
      }
    } else {
      fs.unlink(
        path.join(__dirname, "../../client/public/uploades/" + photo),
        (err, data) => {
          if (err) {
            return;
          }
          return;
        }
      );
    }
  }
};
