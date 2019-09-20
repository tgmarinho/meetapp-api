import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import authMiddleware from './app/middlewares/auth';
import dateMiddleware from './app/middlewares/date';
import multerConfig from './config/multer';
import RegistrationController from './app/controllers/RegistrationController';

const upload = multer(multerConfig);

const routes = new Router();

// No authenticated routes for sign/signup
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// All routes below should be authenticated, and has a token
routes.use(authMiddleware);

// Users
routes.put('/users', UserController.update);

// Meetups
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', dateMiddleware, MeetupController.store);
routes.put('/meetups/:id', dateMiddleware, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

// Registrations
routes.post('/registration', RegistrationController.store);

// Upload File
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
