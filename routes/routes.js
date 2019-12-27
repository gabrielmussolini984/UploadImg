// Imports
const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const {Post}  = require('./../app/models');

// Buscando todos Posts
routes.get('/posts', async(req,res)=>{
  const posts = await Post.findAll();
  return res.json(posts);
});

// Adicionando novos Posts
routes.post('/posts', multer(multerConfig).single('file'), async(req,res)=>{
  const post = await Post.create({ 
    name: req.file.originalname,
    size: req.file.size,
    key:  req.file.key,
    url: req.file.location || ''
  });
  //console.log(req.file);
  return res.json(post);
});
// Deletendo Post
routes.delete('/posts/:id', async(req,res)=>{
  const post = await Post.findByPk(req.params.id);
  await post.destroy();
  return res.send('Removido');
});
// Rota Inicial
routes.get('/', (req, res) => res.json({hello: "Ola Bem Vindo"}));

module.exports = routes; 