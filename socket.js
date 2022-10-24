let io;

module.exports = {
	init: (httpSever) => {
		io = require('socket.io')(httpSever, {
			cors: '*',
		});
		return io;
	},
	getIO: () => {
		if (!io) {
			throw new Error('Socket.io not initialized');
		}
		return io;
	},
};
