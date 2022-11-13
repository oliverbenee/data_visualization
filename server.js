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
  res.render('vegalitetest', {layout: 'vega'})
})

app.get('/vegalite_with_js_terminal_output', (req, res) => {
  res.render('vegalite_with_js_terminal_output', {layout: 'main'})
})

const bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())

app.post('/clickclick', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  var nodeToFind = JSON.stringify(req.body.node)
  console.log('Backend received value on /clickclick: ' + nodeToFind)
  const valueToReturn = [103.0, 103.6, 103.3, 103.2, 103.1, 103.2, 104.0, 103.6, 103.5, 103.7, 103.6, 103.4, 103.6, 104.2, 104.3]
  res.json(valueToReturn)
})

app.get('/visualization', (req, res) => {
  res.render('visualization', {layout: 'main'})
})

// https://blog.logrocket.com/data-visualization-d3-js-node-js/
app.get('/api/data', (req, res) => {
  const data = [100, 50, 300, 40, 350, 250]; // assuming this is coming from the database
  res.json(data);
});