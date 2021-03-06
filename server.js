const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log); //Log to the server
    fs.appendFile('server.log',log + "\n",(err) =>{
        if(err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();    
});


// //If you want to stop user from accessing the system
//  app.use((req, res, next) =>{
//    res.render('maintenance.hbs');
//  });


app.use(express.static(__dirname + '/Public'));


hbs.registerHelper('getCurrentyear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
})

app.get('/',(req, res) =>{
  res.render('homepage.hbs',{
      pageTitle: 'Home Page',      
      content: 'Welcome to HMG CRMS System'
  })
});

app.get('/about',(req, res) =>{
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page',        
    });
});

app.get('/project',(req, res) =>{
    res.render('project.hbs',{
        pageTitle: 'Projects Page'
    })
});



app.get('/bad', (req, res) =>{
    res.send({
        Information: 'Error in Loading Page...',
        Type: 'Jason/Bad'
    })    
})


app.listen(port,()=>{
    console.log(`Server is up on Port ${port}`);
});

