import { Router } from 'express';
import User, { UserDocument } from '../models/user.model';
import verifyCSRFToken from '../middleware/verifyCSRFToken';
import ErrorMessages from '../messages/errorMessages';

const router = Router();

router.post('/auth/login', verifyCSRFToken, async (req, res, next) => {
    try {
        try {
            // Tries to find the user matching the given username
            const user = (await User.findOne({
                email: req.body.email,
            }).populate('roles')) as UserDocument;
            if (!user) {
                return res
                    .status(401)
                    .json({ message: ErrorMessages.wrongEmailOrPassword });
                // Check if the password is valid
            } else if (user && user.comparePasswords(req.body.password)) {
                return res.status(200).json(
                    JSON.stringify({
                        message: 'You are logged in successfully!',
                    }),
                );
            } else {
                // Throws an error if credentials are not valid
                return res
                    .status(401)
                    .json({ message: ErrorMessages.wrongEmailOrPassword });
            }
        } catch (error) {
            return res.status(500).json({ message: ErrorMessages.serverError });
        }
    } catch (error) {
        return next(error);
    }
});

export default router;
