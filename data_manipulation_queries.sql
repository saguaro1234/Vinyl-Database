-- Peter Battisti, Gabe Happ-Shine
-- Project Group 95

-- Get all music genres and descriptions to populate the Genre dropdown
SELECT genreID, description
FROM Genres
ORDER BY genreID ASC;

-- Get all collectors for List Collectors page
SELECT name, email, address
FROM Collectors
ORDER BY name ASC;

-- Get a single collector's owned releases for the List Owned Releases page
SELECT Collectors.name AS name, Releases.releaseDate AS release_date, Releases.recordLabel AS record_label, Releases.price AS release_price, Albums.title AS album_title, Genres.genreID as genre
FROM Collectors
JOIN CollectorHasRelease ON Collectors.collectorID = CollectorHasRelease.collectorID
JOIN Releases ON CollectorHasRelease.releaseID = Releases.releaseID
JOIN Albums ON Releases.albumID = Albums.albumID
JOIN Genres on Albums.genreID = Genres.genreID
WHERE Collectors.collectorID = :collector_ID_selected_from_list_collectors_page
GROUP BY Releases.releaseID, Albums.albumID, Genres.genreID
ORDER BY Releases.releaseDate DESC;

-- Get single album details for the List Album Details page
SELECT Albums.title AS album_title, Genres.description AS genre_description, GROUP_CONCAT(DISTICT Artists.name SEPARATOR ', ') AS artists
FROM Albums
JOIN ArtistHasAlbum ON Albums.albumID = ArtistHasAlbum.albumID
JOIN Artists ON ArtistHasAlbum.artistID = Artists.artistID
JOIN Genres ON Albums.genreID = Genres.genreID
WHERE Albums.albumID = :album_ID_selected_from_list_owned_releases_page
GROUP BY Albums.albumID, Genres.genreID

-- Add a new collector
INSERT INTO Collectors (name, email, address)
VALUES (:nameInput, :emailInput, :addressInput)