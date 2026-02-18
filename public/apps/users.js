// core/auth.js
let currentUser = null;

const ADMIN_CREDENTIALS = {
  username: "HeyItsHeart",
  password: "Pittsburgh!23",
  role: "admin"
};

const users = [
  { username: "guest", password: "guest", role: "user" }
];

function login(username, password) {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    currentUser = { ...ADMIN_CREDENTIALS };
    return { success: true, role: "admin" };
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    currentUser = user;
    return { success: true, role: user.role };
  }

  return { success: false };
}

function logout() {
  currentUser = null;
}

function getCurrentUser() {
  return currentUser;
}

function isAdmin() {
  return currentUser && currentUser.role === "admin";
}

function addUser(username, password, role) {
  if (!isAdmin()) return false;
  users.push({ username, password, role });
  return true;
}

function changeUserRole(username, newRole) {
  if (!isAdmin()) return false;
  const user = users.find(u => u.username === username);
  if (!user) return false;
  user.role = newRole;
  return true;
}

export {
  login,
  logout,
  getCurrentUser,
  isAdmin,
  addUser,
  changeUserRole
};
