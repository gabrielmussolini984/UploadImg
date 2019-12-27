// Model do Post
const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const path = require('path');
const {promisify}= require('util');
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    name: DataTypes.STRING,
    size: DataTypes.FLOAT,
    key: DataTypes.STRING,
    url: DataTypes.STRING,
  });
  // Depois de enviado, se não tiver url quer dizer que é local, então coloca-se o caminho.
  Post.beforeValidate(function(pre){
    if (!pre.dataValues.url){
      pre.dataValues.url = `${process.env.APP_URL}/files/${pre.dataValues.key}`;
    }
  });
  Post.beforeDestroy(function(pre){
    if (process.env.STORAGE_TYPE === 's3'){
      return s3.deleteObject({
        Bucket: 'uploadarquivosgm',
        Key: pre.dataValues.key,
      }).promise()
    } else{
      return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', pre.dataValues.key));
    }
  });
  return Post;
}  