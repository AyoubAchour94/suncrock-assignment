import express, { Request, Response } from 'express'
import path from 'path'
const app = express();
const port = 3000; // default port to listen

app.use(express.static('out'));

// define a route handler for docs home page
app.get( "/", ( req: Request, res: Response ) => {
    res.sendFile(path.join(__dirname, '../out/index.html'));
} );

// start the Express server
app.listen( port, () => {
    console.log( `Docs served at http://localhost:${ port }` );
} );