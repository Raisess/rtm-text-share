import { Router, Request, Response } from 'express';

import { IUser } from '../interfaces/User';
import { getUsers } from '../ws';

const infoRoute: Router = Router();

infoRoute.get('/get/users', (req: Request, res: Response) => {
	try {
		const users: Array<IUser> = getUsers();

		return res.status(200).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get users success',
			success:     true,
			totalUsers:  users.length,
			users
		});
	} catch (e) {
		return res.status(404).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get users fail',
			success:     false,
			error:       e.message
		});
	}
});

export default infoRoute; 

