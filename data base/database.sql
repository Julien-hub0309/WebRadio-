-- Création de la base de données (si elle n'existe pas)
CREATE DATABASE IF NOT EXISTS `web-radio_db`;
USE `web-radio_db`;

---
-- Table pour les rôles des utilisateurs (ex: Administrateur, Editeur, Membre)
CREATE TABLE `Role` (
    `id_role` INT AUTO_INCREMENT PRIMARY KEY,
    `Droit` BOOL,
    `Acces` BOOL
);

---
-- Table pour les utilisateurs
CREATE TABLE `Utilisateur` (
    `id_utilisateur` INT AUTO_INCREMENT PRIMARY KEY,
    `nom_utilisateur` VARCHAR(100) NOT NULL UNIQUE,
    `prenom_utilisateur` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `mot_de_passe_hash` VARCHAR(255) NOT NULL, -- Stocker des mots de passe hachés est CRUCIAL pour la sécurité
    `date_de_naissance` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `id_role` INT,
    FOREIGN KEY (`id_role`) REFERENCES `Role`(`id_role`) ON DELETE SET NULL -- Si un rôle est supprimé, les utilisateurs n'auront plus de rôle
);

---
-- Table pour les types de podcast (ex: Interview, Fiction, Educatif)
CREATE TABLE `Type` (
    `id_type` INT AUTO_INCREMENT PRIMARY KEY,
    `nom_type` VARCHAR(100) NOT NULL UNIQUE,
    `serie_type` VARCHAR(100) NOT NULL UNIQUE,
);

---
-- Table pour les classes (catégories plus générales pour les podcasts, ex: Culture, Science, Divertissement)
CREATE TABLE `Classe` (
    `id_classe` INT AUTO_INCREMENT PRIMARY KEY,
    `nom_classe` VARCHAR(100) NOT NULL UNIQUE,
    `description_classe` TEXT
);

---
-- Table pour les podcasts
CREATE TABLE `Podcast` (
    `id_podcast` INT AUTO_INCREMENT PRIMARY KEY,
    `titre` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `url_fichier` VARCHAR(255) NOT NULL UNIQUE, -- Chemin ou URL du fichier audio du podcast
    `date_publication` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `duree_secondes` INT,
    `id_utilisateur_createur` INT, -- L'utilisateur qui a créé/uploadé le podcast
    `id_type` INT,
    `id_classe` INT,
    FOREIGN KEY (`id_utilisateur_createur`) REFERENCES `Utilisateur`(`id_utilisateur`) ON DELETE SET NULL, -- Si l'utilisateur est supprimé, ses podcasts restent mais l'association est nulle
    FOREIGN KEY (`id_type`) REFERENCES `Type`(`id_type`) ON DELETE SET NULL,
    FOREIGN KEY (`id_classe`) REFERENCES `Classe`(`id_classe`) ON DELETE SET NULL
);
