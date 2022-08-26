const isAdmin = (request, response, next) => {
  const { currentUser } = request;
  if (currentUser.idDentist) {
    response.status(401).json({ message: 'Unauthorized' });
  } else next();
};

const authorizations = {
  isAdmin,
};

export default authorizations;
