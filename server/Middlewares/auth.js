const auth = (req, res, next) => {
    if (req.user.role !== 'manager') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  };