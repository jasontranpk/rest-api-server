const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('feed controller - get user status', function () {
	before(function (done) {
		mongoose
			.connect(
				'mongodb+srv://admin:nodecomplete@cluster0.p0mjcad.mongodb.net/test-messages?retryWrites=true&w=majority'
			)
			.then((result) => {
				const user = new User({
					email: 'test@gmail.com',
					password: '111111',
					name: 'test',
					posts: [],
					_id: '635784784ac9eb77478a5cc6',
				});
				return user.save();
			})
			.then(() => {
				done();
			});
	});

	it('should send a response with a valid user status for an existing user', function (done) {
		const req = { userId: '635784784ac9eb77478a5cc6' };
		const res = {
			statusCode: 500,
			userStatus: null,
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.userStatus = data.status;
			},
		};
		FeedController.getStatus(req, res, () => {}).then((result) => {
			expect(res.statusCode).to.be.equal(200);
			expect(res.userStatus).to.be.equal('I am new!');
			done();
		});
	});

	it('should add a created post to the posts of the creator', function (done) {
		const req = {
			body: {
				title: 'Test Post',
				content: 'A test post',
			},
			file: {
				path: 'abc',
			},
			userId: '635784784ac9eb77478a5cc6',
		};
		const res = {
			status: function () {
				return this;
			},
			json: function () {},
		};
		FeedController.createPost(req, res, () => {}).then((user) => {
			expect(user).to.have.property('posts');
			expect(user.posts).to.have.length(1);
			done();
		});
	});

	after(function (done) {
		User.deleteMany({})
			.then(() => {
				return mongoose.disconnect();
			})
			.then(() => {
				done();
			});
	});
});
