db = db.getSiblingDB("logibot");

db.createCollection("orders");

db.createCollection("chats");

db.createCollection("candidateDeals");

// Crea utente amministrativo
adminDb = db.getSiblingDB("admin");
adminDb.createUser({
  user: "admin",
  pwd: "logibot2024",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
});
