-- Script BDD TDM Project : 

CREATE TABLE IF NOT EXISTS `parkings` (
  `parkingId` INT AUTO_INCREMENT PRIMARY KEY,
  `parkingName` VARCHAR(255) NOT NULL,
  `AdresseParking` TEXT,
  `DescriptionParking` TEXT,
  `nombreDePlaces` INT,
  `nombreDePlacesReserve` INT
);


CREATE TABLE IF NOT EXISTS `users` (
    `userId` INT AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `NUmeroTel` INT NOT NULL,
    `motDePasse` VARCHAR(255) NOT NULL,
    `PhotoUser` VARCHAR(255) NOT NULL
);



CREATE TABLE IF NOT EXISTS `reservations` (
  `reservationId` INT AUTO_INCREMENT PRIMARY KEY,
  `DescriptionReservation` TEXT,
  `numero` TEXT,
  `iduser` INT,
  `idparking` INT,
  `dateDebut` DATETIME, 
  `dateFin` DATETIME, 
  FOREIGN KEY (`idparking`) REFERENCES `parkings` (`parkingId`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`iduser`) REFERENCES `users` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO `parkings` (`parkingName`, `AdresseParking`, `DescriptionParking`, `nombreDePlaces`, `nombreDePlacesReserve`) VALUES
('Parking Tipaza', 'Tipaza', 'Parking spacieux situé près de la plage de Tipaza, avec une capacité de 100 véhicules.', 100, 0),
('Parking Alger', 'Oued Semar', 'Parking sécurisé au centre d Alger, près de la place du 1er Mai.', 150, 0),
('Parking Tizi', 'Tedmait', 'Parking moderne dans la zone industrielle de Tedmait, équipé de caméras de surveillance.', 200, 0),
('Parking Bejaia', 'Akfadou', 'Parking bien entretenu à Bejaia, à proximité des zones commerciales et résidentielles.', 120, 0),
('Parking Ain Taya', 'Ain Taya', 'Parking familial à Ain Taya, idéal pour les sorties en famille ou entre amis.', 80, 0),
('Parking Reghaia', 'Reghaia', 'Parking couvert situé dans le centre de Reghaia, offrant une protection contre les intempéries.', 90, 0),
('Parking Blida', 'Blida', 'Grand parking à Blida, avec un accès facile depuis l autoroute.', 180, 0),
('Parking Oran', 'Oran', 'Parking central à Oran, à quelques pas des principaux sites touristiques.', 250, 0),
('Parking Constantine', 'Constantine', 'Parking sécurisé près du centre-ville de Constantine, avec des tarifs abordables.', 130, 0),
('Parking Tlemcen', 'Tlemcen', 'Parking bien éclairé à Tlemcen, ouvert 24h/24 pour répondre à vos besoins de stationnement.', 110, 0);



