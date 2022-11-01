//////////////////////////
// SET UP EXPRESS PAGE. //
//////////////////////////

const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.set('view engine', '.hbs')
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs', // Shorten handlebars file name.
  layoutsDir: `${__dirname}/views/layouts`
}))

app.use(express.static(`${__dirname}/public`)) // serve static webpages. Use content from the public folder.

// Allows us to connect to the web server. 
app.listen(port, () => { console.log(`listening on port ${port}`) })

//////////////////////////////
// END SET UP EXPRESS PAGE. //
// BEGIN EXPRESS ROUTER.    //
//////////////////////////////

app.get('/', (req, res) => {
  res.redirect('/index');
})

app.get('/index', (req, res) => {
  res.render('index', {layout: 'main'});
})

app.get('/index/:subpage', (req, res) => {
  res.send('parameter: ' + req.params.subpage + ' which is of type: ' + typeof(req.params.subpage));
})

app.get('/barchart', (req, res) => {
  res.render('d3barcharttest', {layout: 'main'})
})

app.get('/vegalitetest', (req, res) => {
  res.render('vegalitetest', {layout: 'main'})
})

app.get('/vegalite_with_js_terminal_output', (req, res) => {
  res.render('vegalite_with_js_terminal_output', {layout: 'main'})
})

app.post('/clickclick', (req, res) => {
  var name = req.params.name
  res.send('Backend response to POST request sent to clickclick')
  console.log('log sent post to clickclick')
})

app.get('/visualization', (req, res) => {
  res.render('visualization', {layout: 'main'})
})

// https://blog.logrocket.com/data-visualization-d3-js-node-js/
app.get('/api/data', (req, res) => {
  const data = [100, 50, 300, 40, 350, 250]; // assuming this is coming from the database
  res.json(data);
});