import { v4 as uuidv4 } from 'uuid';

import { IUser } from './interfaces/User';
import { ISession } from './interfaces/Session';

import { createUser } from './entities/user.entitie';
import { createSession } from './entities/session.entitie';

// data storage
let users:    Array<IUser>    = [];
let sessions: Array<ISession> = [];

export const ws = (io: SocketIO.Server): void => {
	io.on('connection', (socket: any) => {
		console.log(socket.id, 'has been connected to server');

		// create user event
		socket.on('create_user', (userData: IUser) => {
			try {
				const user: IUser = createUser(socket.id, userData);
				users.push(user);

				return socket.emit('create_user_response', {
					log:     'user created',
					success: true,
					userId:  socket.id
				});
			} catch (e) {
				return socket.emit('create_user_response', {
					log:     'user not created',
					success: false,
					error:   e.message
				});
			}
		});

		// create session event
		socket.on('create_session', (sessionData: ISession) => {
			try {
				const sessionId: string   = uuidv4(); 
				const session:   ISession = createSession(socket.id, sessionId, sessionData);
				sessions.push(session);

				return socket.emit('create_session_response', {
					log:        'session created',
					success:    true,
					sessionId:  sessionId
				});
			} catch (e) {
				return socket.emit('create_session_response', {
					log:     'session not created',
					success: false,
					error:   e.message
				});
			}
		});

		// quit event
		socket.on('disconnect', () => {
			// delete user from storage
			for (let i = 0; i < users.length; i++) {
				if (users[i]) {
					if (socket.id === users[i].id) delete users[i];
				}
			}

			console.log(socket.id, 'has been disconnected from server');
			return;
		});
	});
}

// get data functions
export const getSessions = (): Array<ISession> => sessions;
export const getUsers    = (): Array<IUser>    => users;

