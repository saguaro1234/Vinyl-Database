// ########################################
// ########## SETUP

// Citation for the following code (route handlers):
// Date: 5/29/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

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
        const query1 = `SELECT name, email, address, collectorID
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
        const query1 = `SELECT albumID, title, genreID
                        FROM Albums
                        ORDER BY title ASC;`;
        
        const [albums] = await db.query(query1);
        const query2 = `SELECT genreID, description
                        FROM Genres
                        ORDER BY genreID ASC;`;
        
        const [genres] = await db.query(query2);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('albums', { albums: albums, genres: genres });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/releases', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT releaseID, Releases.albumID, recordLabel, releaseDate, price, Albums.title
                        FROM Releases
                        INNER JOIN Albums on Releases.albumID = Albums.albumID
                        ORDER BY releaseID ASC;`;
        
        const [releases] = await db.query(query1);
        const query2 = `SELECT albumID, title
                        FROM Albums
                        ORDER BY title ASC;`;
        
        const [albums] = await db.query(query2);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('releases', { releases: releases, albums: albums });
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
         const query2 = `SELECT albumID, title
                        FROM Albums
                        ORDER BY title ASC;`;
        
        const [albums] = await db.query(query2);
        const query3 = `SELECT artistID, name, description
                        FROM Artists
                        ORDER BY name ASC;`;
        
        const [artists] = await db.query(query3);
        ;

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('artist_has_album', { artistAlbum: artistAlbum, albums: albums, artists: artists });
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
        const query2 = `SELECT releaseID, Releases.albumID, recordLabel, releaseDate, price, Albums.title
                        FROM Releases
                        INNER JOIN Albums on Releases.albumID = Albums.albumID
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

app.post('/genres/update', async function (req, res) {
    try {
        const genreID = req.body.update_genre_id?.trim();
        const description = req.body.update_description?.trim();

       

        const query1 = 'CALL sp_UpdateGenre(?, ?);';
        await db.query(query1, [genreID, description]);

        console.log(`Genre updated: ID = ${genreID}, Description = ${description}`);
        res.redirect('/genres');
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(500).send('An error occurred.');
    }
});

app.post('/artists/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        
        const name = req.body.update_artist_name?.trim();
        const description = req.body.update_artist_description?.trim();

       
        const query1 = 'CALL sp_UpdateArtist(?, ?, ?);';
        const query2 = 'SELECT name, description FROM Artists WHERE artistID = ?;';
        await db.query(query1, [
            data.update_artist_id,
            name,
            description
        ]);
        const [rows] = await db.query(query2, [data.update_artist_id]);

        console.log(`UPDATE bsg-people. ID: ${data.update_artist_id} ` +
            `Name: `
        );

        
        res.redirect('/artists');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/releases/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.

        const record_label = req.body.update_release_label?.trim();


        const query1 = 'CALL sp_UpdateRelease(?, ?, ?, ?, ?);';
        const query2 = 'SELECT albumID, releaseDate, recordLabel, price FROM Releases WHERE releaseID = ?;';
        await db.query(query1, [
            data.update_release_id,
            data.update_album_id,
            data.update_release_date,
            record_label,
            data.update_release_price
        ]);
        const [rows] = await db.query(query2, [data.update_release_id]);

        console.log(`UPDATE bsg-people. ID: ${data.update_release_id} ` +
            `Name: `
        );


        res.redirect('/releases');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/collectors/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        
        const name = req.body.update_name?.trim();
        const email = req.body.update_email?.trim();
        const address = req.body.update_address?.trim();

       
        const query1 = 'CALL sp_UpdateCollector(?, ?, ?, ?);';
        const query2 = 'SELECT name, email, address FROM Collectors WHERE collectorID = ?;';
        await db.query(query1, [
            data.update_collector_id,
            name,
            email,
            address
        ]);
        const [rows] = await db.query(query2, [data.update_collector_id]);

        console.log(`UPDATE bsg-people. ID: ${data.update_collector_id} ` +
            `Name: `
        );

        
        res.redirect('/collectors');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/artist_has_album/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        
        

       
        const query1 = 'CALL sp_UpdateArtistHasAlbum(?, ?, ?);';
        const query2 = 'SELECT artistID, albumID FROM ArtistHasAlbum WHERE artistHasAlbumID = ?;';
        await db.query(query1, [
            data.update_album_artist_id,
            data.update_album_has_artist_id,
            data.update_artist_has_album_id
           
        ]);
        const [rows] = await db.query(query2, [data.update_album_artist_id]);

        console.log(`UPDATE bsg-people. ID: ${data.update_album_artist_id} ` +
            `Name: `
        );

        res.redirect('/artist_has_album');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/albums/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
      
        const genre = req.body.update_album_genre?.trim();
        const title = req.body.update_album_title?.trim();

       
        const query1 = 'CALL sp_UpdateAlbum(?, ?, ?);';
        const query2 = 'SELECT genreID, title FROM Albums WHERE albumID = ?;';
        await db.query(query1, [
            data.update_album_id,
            title,
            genre
        ]);
        const [rows] = await db.query(query2, [data.update_album_id]);

        console.log(`UPDATE bsg-people. ID: ${data.update_album_id} ` +
            `Name: `
        );
      
        res.redirect('/albums');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/collector_has_release/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        
        

       
        const query1 = 'CALL sp_UpdateCollectorHasRelease(?, ?, ?);';
        const query2 = 'SELECT collectorID, releaseID FROM CollectorHasRelease WHERE collectorHasReleaseID = ?;';
        await db.query(query1, [
            data.update_collector_has_album_id,
            data.update_collector_id,
            data.update_release_id
        ]);
        const [rows] = await db.query(query2, [data.update_collector_has_album_id]);

        console.log(`UPDATE bsg-people. ID: ${data.update_collector_has_album_id} ` +
            `Name: `
        );

        res.redirect('/collector_has_release');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/update', async function (req, res) {
    try {
        // Parse frontend form information
        
        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        
       

       
        const query1 = 'CALL sp_ResetDatabase();';
       
        await db.query(query1);
      

        

        res.redirect('/');
        
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/artists/create', async function (req, res){
    try {
        let data = req.body;

        const query1 = 'CALL sp_CreateArtist(?, ?, @new_id);';
       
        const [[[rows]]] = await db.query(query1, [
            data.create_name,
            data.create_description
            
        ]);
        res.redirect('/artists');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/collectors/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCollector(?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_collector_name,
            data.create_collector_email,
            data.create_collector_address,
        ]);

        console.log(`CREATE Collector. ID: ${rows.new_id} ` +
            `Name: ${data.create_collector_name}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/collectors');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/artist_has_album/create', async function (req, res){
    try {
        let data = req.body;

        const query1 = 'CALL sp_CreateArtistHasAlbum(?, ?, @new_id);';
       
        const [[[rows]]] = await db.query(query1, [
            data.add_album,
            data.add_artist
            
        ]);
        res.redirect('/artist_has_album');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/albums/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateAlbum(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            
            data.create_album_title,
            data.choose_genre
        ]);

        console.log(`CREATE Album. ID: ${rows.new_id} ` +
            `Title: ${data.create_album_title}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/albums');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/genres/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateGenre(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_genre_id,
            data.create_genre_description,
        ]);

        console.log(`CREATE Genre. ID: ${rows.new_id} ` +
            `Name: ${data.create_genre_id}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/genres');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/releases/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateRelease(?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.add_album_to_release_id,
            data.create_release_date,
            data.create_release_label,
            data.create_release_price,
        ]);

        console.log(`CREATE Release. ID: ${rows.new_id} ` +
            `Name: ${data.create_release_label}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/releases');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/collector_has_release/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCollectorHasRelease(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.add_collector_album_id,
            data.add_album_collector_id,
        ]);

        console.log(`CREATE CollectorHasRelease. ID: ${rows.new_id} ` +
            `Name: ${data.add_collector_album_id} ${data.add_album_collector_id}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/collector_has_release');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/collectors/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCollector(?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_collector_name,
            data.create_collector_email,
            data.create_collector_address,
        ]);

        console.log(`CREATE Collector. ID: ${rows.new_id} ` +
            `Name: ${data.create_collector_name}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/collectors');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/albums/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateAlbum(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            
            data.create_album_title,
            data.choose_genre
        ]);

        console.log(`CREATE Album. ID: ${rows.new_id} ` +
            `Title: ${data.create_album_title}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/albums');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/releases/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateRelease(?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.add_album_to_release_id,
            data.create_release_date,
            data.create_release_label,
            data.create_release_price,
        ]);

        console.log(`CREATE Release. ID: ${rows.new_id} ` +
            `Name: ${data.create_release_label}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/releases');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
app.post('/collector_has_release/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCollectorHasRelease(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.add_collector_album_id,
            data.add_album_collector_id,
        ]);

        console.log(`CREATE CollectorHasRelease. ID: ${rows.new_id} ` +
            `Name: ${data.add_collector_album_id} ${data.add_album_collector_id}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/collector_has_release');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/genres/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateGenre(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_genre_id,
            data.create_genre_description,
        ]);

        console.log(`CREATE Genre. ID: ${rows.new_id} ` +
            `Name: ${data.create_genre_id}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/genres');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/artists/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteArtist(?);`;
        await db.query(query1, [data.delete_artist_id]);

        console.log(`DELETE artist. ID: ${data.delete_artist_id} ` +
            `Name: ${data.delete_artist_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/artists');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/genres/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteGenre(?);`;
        await db.query(query1, [data.delete_genre_id]);

        console.log(`DELETE genre. ID: ${data.delete_genre_id} ` +
            `Name: ${data.delete_genre_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/genres');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/albums/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteAlbum(?);`;
        await db.query(query1, [data.delete_album_id]);

        console.log(`DELETE genre. ID: ${data.delete_album_id} ` +
            `Name: ${data.delete_album_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/albums');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


app.post('/collectors/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteCollector(?);`;
        await db.query(query1, [data.delete_collector_id]);

        console.log(`DELETE collector. ID: ${data.delete_collector_id} ` +
            `Name: ${data.delete_collector_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/collectors');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/releases/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteRelease(?);`;
        await db.query(query1, [data.delete_release_id]);

        console.log(`DELETE release. ID: ${data.delete_release_id} ` +
            `Name: ${data.delete_release_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/releases');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/artist_has_album/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteArtistHasAlbum(?);`;
        await db.query(query1, [data.delete_artistAlbum_id]);

        console.log(`DELETE artist_has_album. ID: ${data.delete_artistAlbum_id} ` +
            `Name: ${data.delete_artistAlbum_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/artist_has_album');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/collector_has_release/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteCollectorHasRelease(?);`;
        await db.query(query1, [data.delete_collectorRelease_id]);

        console.log(`DELETE collector_has_release. ID: ${data.delete_collectorRelease_id} ` +
            `Name: ${data.delete_collectorRelease_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/collector_has_release');
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