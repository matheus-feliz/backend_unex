const multer = require('multer');
const {extname,resolve} = require('path');


module.exports = {
    fileFilter:(req,file,cb)=>{
        if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg'){
            return cb(new multer.MulterError('Arquivo deve ser png ou jpeg'));
        }
        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null,resolve(__dirname,'..','uploads'));
        },
        filename: function (req, file, cb) {
          const random = Date.now() + '-' + Math.round(Math.random() * 10000 + 10000)
          cb(null,`${random}${extname(file.originalname)}`)
        }
      })
};
  