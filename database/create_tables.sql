

--Table pierre
CREATE TABLE Stones (
    stoneID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    stoneName VARCHAR(50),
    stonePrice DECIMAL(10, 2)
);


--Table boitier
CREATE TABLE Boitiers (
    boitierID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    boitierForm TEXT,
    boitierPrice DECIMAL(10, 2)
);

--Table bracelet
CREATE TABLE Bracelets (
    braceletID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    braceletTexture TEXT,
    braceletPrice DECIMAL(10, 2)
);

--Table utilisateurs
CREATE TABLE Users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userName VARCHAR(50),
    password VARCHAR(100)
);

--Table panier
CREATE TABLE Carts (
    cartID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID INT,
    watchID INT,
    userWatchID INT,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (userWatchID) REFERENCES UserWatches(userID),
    FOREIGN KEY (watchID) REFERENCES Watches(watchID)
);

--Table montres
CREATE TABLE Watches (
    watchID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID INT,
    stoneID INT,
    braceletID INT,
    boitierID INT,
    watchPrice DECIMAL(10, 2),
    totalPrice DECIMAL(10, 2),
    FOREIGN KEY (userID) REFERENCES Users(UserID),
    FOREIGN KEY (boitierID) REFERENCES Boitiers(boitierID),
    FOREIGN KEY (stoneID) REFERENCES Stones(stoneID),
    FOREIGN KEY (braceletID) REFERENCES Bracelets(braceletID)
);


--Table montre des utilisateurs
CREATE TABLE UserWatches (
    userWatchID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID INT,
    watchID INT,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (watchID) REFERENCES Watches(watchID)
);
