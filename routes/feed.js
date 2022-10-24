const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/post', isAuth, feedController.getPosts);
router.post(
	'/post',
	[
		body('title').trim().isLength({ min: 5 }),
		body('content').trim().isLength({ min: 5 }),
	],
	isAuth,
	feedController.createPost
);

router.get('/post/:postId', isAuth, feedController.getPost);

router.put(
	'/post/:postId',
	[
		body('title').trim().isLength({ min: 5 }),
		body('content').trim().isLength({ min: 5 }),
	],
	isAuth,
	feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

router.get('/status', isAuth, feedController.getStatus);
router.put(
	'/status',
	isAuth,
	[body('status').trim().not().isEmpty()],
	feedController.updateStatus
);
module.exports = router;
