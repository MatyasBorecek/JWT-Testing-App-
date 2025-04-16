export const adminDashboard = (req, res) => {
  res.json({ message: 'Welcome, admin!', user: req.user });
};
