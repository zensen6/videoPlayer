const AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
const path = require('path');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

const S3 = new AWS.S3({
	endpoint: endpoint,
	region: region,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_KEY
	}
});

function setUpload(bucket: any) {
	var upload = multer({
		storage: multerS3({
			s3: S3,
			bucket: bucket,
			acl: 'public-read',
			key: function(req: any, file: any, cb: any) {
				let extension = path.extname(file.originalname);
				cb(null, Date.now().toString() + extension);
			}
		})
	}).single('video');
	return upload;
}

export default setUpload;
