
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
mongoose.connect("mongodb://harbir1:harbir@ds241658.mlab.com:41658/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

// var express      = require("express");
// var app          = express();
// var bodyParser   = require("body-parser");
// var mongoose     = require("mongoose");
// var passport = require("passport");
// var LocalStrategy = require("passport-local");
// var methodOverride = require("method-override");
// var User = require("./models/user");
// var Campground =   require("./models/campground");
// var Comment = require("./models/comment");
// var seedDB = require("./seeds.js");

// var commentRoutes = require("./routes/comments");
// var campgroundRoutes = require("./routes/campgrounds");
// var indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp_3");
// app.use(bodyParser.urlencoded({extended: true}));
// app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
// seedDB();

// //passport Configration

// app.use(require("express-session")({
//     secret: "anything goes here",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// });


// app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);
// app.use(methodOverride("_method"));

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("the YelpCamp server has started!");
// });

// Schema Setup


// Campground.create(
//     {
//         name: "Salmon Creek",
//         image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
//         description: "This is the best campground site you can ever see with a lot of breadth-taking scenes and you can find a lot of waterfalls in around",

//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly created campground");
//             console.log(campground);
//         }
//     });


// app.get("/", function(req, res){
    
//     res.render("landing.ejs");
// });

// //  var campgrounds = [
// //         {name: "Joshua Tree", image:"https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/jtb_01"},
// //     {name: "Sequoia", image:"https://huckberry.imgix.net/uploads/Huckberry_Sequoia_Natioanl_park_Sell_8.jpg"},
// // ]


// app.get("/campgrounds", function(req, res){
    
//     Campground.find({}, function(err, allCampgrounds){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
//         }
//         });
//     });
 
// app.post("/campgrounds", function(req, res){
    
//     var name = req.body.nameQuery;
//     var image = req.body.imgQuery;
//     var description = req.body.decQuery;
//     var newCampgrounds = {name: name, image: image, description: description};
    
//     Campground.create(newCampgrounds, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.redirect("/campgrounds.ejs");
//         }
//     });
// });

// app.get("/campgrounds/new", function(req, res){
//     res.render("campgrounds/new.ejs");
// });

// app.get("/campgrounds/:id", function(req, res){
    
    
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground);
//             res.render("campgrounds/show.ejs", {campground: foundCampground});
//         }
//     });

// });

// //------------------
// // COMMENT ROUTES
// //------------------

// // app.get("/campgrounds/:id/comments/new", function(req, res){
    
// //     Campground.findById(req.params.id, function(err, campground){
// //         if(err){
// //             console.log(err)
// //         }else {
// //             res.render("comments/new", {campground: campground});
// //         }
// //     });
// //     res.send("comments/new.ejs");
// // });


// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
//     // find campground by id
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("comments/new", {campground: campground});
//         }
//     });
// });

// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
//   //lookup campground using ID
//   Campground.findById(req.params.id, function(err, campground){
//       if(err){
//           console.log(err);
//           res.redirect("/campgrounds");
//       } else {
//         Comment.create(req.body.comment, function(err, comment){
//           if(err){
//               console.log(err);
//           } else {
//               campground.comments.push(comment);
//               campground.save();
//               res.redirect('/campgrounds/' + campground._id);
//           }
//         });
//       }
//   });

// });

// //show register form
// app.get("/register", function(req, res){
//     res.render("register");
// });

// //handle Sign UP

// app.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/campgrounds");
//         });
//     });
// });

// //show login form
// app.get("/login", function(req, res){
//   res.render("login"); 
// });
// // handling login logic
// app.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login"
//     }), function(req, res){
// });

// //logout route
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("campgrounds");
// }); 

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

