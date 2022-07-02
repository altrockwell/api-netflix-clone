import express, { Application } from 'express';
import bodyParser from 'body-parser';

export default function (app: Application) {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
}
