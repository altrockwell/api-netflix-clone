import express from 'express';

const router = express.Router();
router.get('/signup', (req, res) => {
	res.sendStatus(400);
});

export default router;
