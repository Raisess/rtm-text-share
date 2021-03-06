import { IUser } from '../interfaces/User';
import { ISession } from '../interfaces/Session';

export function createUser(id: string, user: IUser): IUser {
	const {
		username,
		onSession
	} = user;

	return {
		id,
		username,
		onSession,
		createdAt:            new Date().toLocaleString(),
		lastSessionEnterTime: ''
	};
}

export function deleteUser(id: string, users: Array<IUser>, sessions: Array<ISession>): Array<number> {
	let response: Array<number> = [1, -1, -1, -1];

	// delete user from storage and remove from any party
	for (let i: number = 0; i < users.length; i++) {
		if (users[i]) {
			if (id === users[i].id) response[1] = i;

			if (users[i].onSession && users[i].onSession !== '') {
				for (let j: number = 0; j < sessions.length; j++) {
					if (sessions[j]) {
						for (let y: number = 0; y < sessions[j].party.length; y++) {
							if (sessions[j].party[y] && id === sessions[j].party[y].id) {
								response[2] = j;
								response[3] = y;
							}
						}
					}
				}
			}

			return response;
		}
	}

	return [0, -1, -1, -1];
}

