
--Insertion d'un utilisateur 
INSERT INTO Users (userID, userName, password) VALUES ( 1,'Telmane', 'hello');


-- Insert data into "Bracelets" table
INSERT INTO Bracelets (braceletID, braceletTexture, braceletPrice) VALUES (1,'Métal', '5');
INSERT INTO Bracelets (braceletID, braceletTexture, braceletPrice) VALUES (2,'Tissus', '10');
INSERT INTO Bracelets (braceletID, braceletTexture, braceletPrice) VALUES (3,'Cuir', '15');

-- Insert data into "Stones" table
INSERT INTO Stones (stoneID, stoneName, stonePrice) VALUES ( 1, 'Rubis', '40.20');
INSERT INTO Stones (stoneID, stoneName, stonePrice) VALUES ( 2,'Diamant','19.50');
INSERT INTO Stones (stoneID, stoneName, stonePrice) VALUES ( 3,'Emeraude','20');

-- Insert data into "Boitiers" table
INSERT INTO Boitiers (boitierID, boitierForm, boitierPrice) VALUES ( 1, 'Carre', '4');
INSERT INTO Boitiers (boitierID, boitierForm, boitierPrice) VALUES ( 2,'Rond','8');
INSERT INTO Boitiers (boitierID, boitierForm, boitierPrice) VALUES ( 3,'Bouton','16');

-- Insert data into "Watches" table
INSERT INTO Watches (watchID, userID, stoneID, braceletID, boitierID, watchPrice, totalPrice) VALUES ( 1, 1, 2, 3, 2, '300', '342.5');









