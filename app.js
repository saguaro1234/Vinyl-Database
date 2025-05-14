// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 6001;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.get('/collectors', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT name, email, address
                        FROM Collectors
                        ORDER BY name ASC;`;
        
        const [collectors] = await db.query(query1);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('collectors', { collectors: collectors });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


app.get('/albums', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT albumID, title
                        FROM Albums
                        ORDER BY title ASC;`;
        
        const [albums] = await db.query(query1);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('albums', { albums: albums });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/collectors-releases', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT releaseID, albumID, recordLabel, releaseDate, price
                        FROM Releases
                        ORDER BY releaseID ASC;`;
        
        const [releases] = await db.query(query1);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('collectors-releases', { releases: releases });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/genres', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT genreID, description
                        FROM Genres
                        ORDER BY genreID ASC;`;
        
        const [genres] = await db.query(query1);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('genres', { genres: genres });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/artists', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT artistID, name, description
                        FROM Artists
                        ORDER BY name ASC;`;
        
        const [artists] = await db.query(query1);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('artists', { artists: artists });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/artist_has_album', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT Artists.name, Albums.title, artistHasAlbumID
                        FROM ArtistHasAlbum
                        INNER JOIN Artists ON ArtistHasAlbum.artistID = Artists.artistID 
                        INNER JOIN Albums ON ArtistHasAlbum.albumID = Albums.albumID
                        ORDER BY Artists.artistID ASC;`;
        
        const [artistAlbum] = await db.query(query1);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('artist_has_album', { artistAlbum: artistAlbum });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/collector_has_release', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT Collectors.name, Releases.recordLabel, Albums.title, collectorHasReleaseID
                        FROM CollectorHasRelease
                        INNER JOIN Collectors ON CollectorHasRelease.collectorID = Collectors.collectorID 
                        INNER JOIN Releases ON CollectorHasRelease.releaseID = Releases.releaseID
                        INNER JOIN Albums ON Releases.albumID = Albums.albumID
                        ;`;
        
        const [collectorsReleases] = await db.query(query1);
        const query2 = `SELECT releaseID, albumID, recordLabel, releaseDate, price
                        FROM Releases
                        ORDER BY releaseID ASC;`;
        
        const [releases] = await db.query(query2);
        const query3 = `SELECT name, email, address, collectorID
                        FROM Collectors
                        ORDER BY name ASC;`;
        
        const [collectors] = await db.query(query3);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('collector_has_release', { collectorsReleases: collectorsReleases, releases: releases, collectors: collectors });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});