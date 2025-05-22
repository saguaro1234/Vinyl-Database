-- Peter Battisti, Gabe Happ-Shine
-- Project Group 95

-- Get all music genres and descriptions to populate the Genre dropdown
SELECT genreID, description
FROM Genres
ORDER BY genreID ASC;

-- Get all single collector's data for association dropdown
SELECT collectorID, name
FROM Collectors
ORDER BY name ASC;

-- Get all album data for association dropdown
SELECT albumID, title
FROM Albums
ORDER BY title ASC;

-- GET all artist data for association dropdown
SELECT artistID, name
FROM Artists
ORDER BY name ASC;

-- Get all release data for association dropdown
SELECT releaseID, albumID, recordLabel, releaseDate, price
FROM Releases
ORDER BY releaseID ASC;

-- Get all collectors for List Collectors page
SELECT collectorID, name, email, address
FROM Collectors
ORDER BY name ASC;

-- Get a single collector's owned releases for the List Owned Releases page
SELECT Collectors.name AS name, Releases.releaseID AS releaseID, Releases.releaseDate AS release_date, Releases.recordLabel AS record_label, Releases.price AS release_price, Albums.title AS album_title, Genres.genreID as genre
FROM Collectors
JOIN CollectorHasRelease ON Collectors.collectorID = CollectorHasRelease.collectorID
JOIN Releases ON CollectorHasRelease.releaseID = Releases.releaseID
JOIN Albums ON Releases.albumID = Albums.albumID
JOIN Genres on Albums.genreID = Genres.genreID
WHERE Collectors.collectorID = :collector_ID_selected_from_list_collectors_page
GROUP BY Releases.releaseID, Albums.albumID, Genres.genreID
ORDER BY Releases.releaseDate DESC;

-- Get single album details for the List Album Details page
SELECT Albums.albumID as albumID, Albums.title AS album_title, Genres.description AS genre_description, GROUP_CONCAT(DISTICT Artists.name SEPARATOR ', ') AS artists
FROM Albums
JOIN ArtistHasAlbum ON Albums.albumID = ArtistHasAlbum.albumID
JOIN Artists ON ArtistHasAlbum.artistID = Artists.artistID
JOIN Genres ON Albums.genreID = Genres.genreID
WHERE Albums.albumID = :album_ID_selected_from_list_owned_releases_page
GROUP BY Albums.albumID, Genres.genreID

-- Add a new collector
INSERT INTO Collectors (name, email, address)
VALUES (:nameInput, :emailInput, :addressInput)

-- Update a collector
UPDATE Collectors
SET name = :nameInput, email = :emailInput, address = :addressInput
WHERE id = :collector_ID_from_the_update_form

-- Delete a collector
DELETE FROM Collectors
WHERE id = :collector_ID_selected_from_list_collectors_page

-- Add a new release
INSERT INTO Releases (albumID, releaseDate, recordLabel, price)
VALUES (:album_ID_from_dropdown_input, :release_date_input, :record_label_input, :priceInput)

-- Update a release
UPDATE Releases
SET ablumID = :album_ID_from_dropdown_input, releaseDate = :release_date_input, recordLabel = :record_label_input, price = :priceInput
WHERE id = :release_ID_selected_from_the_update_form

-- Delete a release
DELETE FROM Releases
WHERE id = :release_ID_selected_from_list_owned_releases_page

-- Add a new album
INSERT INTO Albums (genreID, title)
VALUES (:genre_ID_from_dropdown_input, :titleInput)

-- Update an album
UPDATE Albums
SET genreID = :genre_ID_from_dropdown_input, title = :titleInput
WHERE id = :album_ID_selected_from_the_update_form

-- Delete an album
DELETE FROM Albums
WHERE id = :album_ID_selected_from_list_album_details_page

-- Associate a collector with a release
INSERT INTO CollectorHasRelease (collectorID, releaseID)
VALUES (:collector_ID_from_dropdown_input, :release_ID_from_dropdown_input)

-- Associate an artist to an album
INSERT INTO ArtistHasAlbum (albumID, artistID)
VALUES (:album_ID_from_dropdown_input, :artist_ID_from_dropdown_input)

-- Dis-associate a collector from a release
DELETE FROM CollectorHasRelease
WHERE collectorID = :collector_ID_from_dropdown_input AND releaseID = :release_ID_from_dropdown_input

-- Dis-associate an artist from an album
DELETE FROM ArtistHasAlbum
WHERE artistID = :artist_ID_from_dropdown_input AND albumID = :album_ID_from_dropdown_input