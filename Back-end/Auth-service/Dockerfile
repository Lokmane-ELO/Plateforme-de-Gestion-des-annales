# Utiliser une image Node.js comme base
FROM node:14

# Définir le répertoire de travail dans le conteneur Docker
WORKDIR /usr/src/app

# Copier le fichier package.json dans le répertoire de travail
COPY package*.json ./

# Installer toutes les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exécuter le script de création de la base de données
RUN node create-auth-db.js

# Exposer le port sur lequel le service d'authentification écoute
EXPOSE 5001

# La commande pour démarrer notre application
CMD [ "node", "app.js" ]
