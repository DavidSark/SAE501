
CREATE TABLE Boitier_Texture (
    boitierTextureID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nom TEXT,
    prix FLOAT
);

--Table boitier
CREATE TABLE Boitier_Forme (
    boitierFormeID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nom TEXT,
    prix FLOAT
);

--Table bracelet
CREATE TABLE Bracelet_Texture(
    braceletTextureID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nom TEXT,
    prix FLOAT
);


--Table pierre
CREATE TABLE Pierre (
    pierreID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nom TEXT,
    prix FLOAT,
    couleur TEXT
);


--Table utilisateurs
CREATE TABLE User (
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    pseudo TEXT UNIQUE,
    mdp TEXT
);


--Table montres
CREATE TABLE Montre (
    montreID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
    nom TEXT UNIQUE,
    pierreID INT,
    braceletTextureID INT,
    boitierTextureID INT,
    boitierFormeID INT,
    main_color TEXT,
    dernier_utilisateur INTEGER,
    FOREIGN KEY (pierreID) REFERENCES Pierre(pierreID),
    FOREIGN KEY (braceletTextureID) REFERENCES Bracelet_Texture(braceletTextureID),
    FOREIGN KEY (boitierTextureID) REFERENCES Boitier_Texture(boitierTextureID),
    FOREIGN KEY (dernier_utilisateur) REFERENCES User(userID),
    FOREIGN KEY (boitierFormeID) REFERENCES Boitier_Forme(boitierFormeID)
);



--Table panier
CREATE TABLE Panier (
    userID INT,
    montreID INT,
    PRIMARY KEY (userID, montreID),
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (montreID) REFERENCES Montre(montreID)
);

