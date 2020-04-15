import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import Ong from '../models/Ong';
import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const ong = await Ong.findOne({ where: { email } });

    if (!ong) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!(await ong.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = ong;

    const token = jwt.sign({ id, name, email }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    return response.json({
      token,
      name,
      expireAt: decoded.exp,
      logout: false,
      expired: false,
    });
  }
}

export default new SessionController();
