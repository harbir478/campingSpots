var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// var express = require("express");
// var router  = express.Router();
// var Campground = require("../models/campground");
// // var middleware = require("../middleware");
// var methodOverride = require("method-override");
// var mongoose     = require("mongoose");
// var middleware = require("../middleware/");

// router.use(methodOverride("_method"));


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author:author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

// function checkCampgroundOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err){
//                 res.redirect("/campgrounds");
//             } else {
//                 if(foundCampground.author.id.equals(req.user._id)){
//                   next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
// });
// } else {
//     res.redirect("back");
// }
// }

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }



module.exports = router;




// var express = require("express");
// var router = express.Router();
// var Campground = require("../models/campground");
// var Comment = require("../models/comment");
// var methodOverride = require("method-override");

// router.use(methodOverride("_method"));

// router.get("/", function(req, res){
    
//     Campground.find({}, function(err, allCampgrounds){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
//         }
//         });
//     });
 
//  router.post("/", function(req, res){
//     // get data from form and add to campgrounds array
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     }
    
//     var newCampground = {name: name, image: image, description: desc, author: author};
//     // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             res.redirect("/campgrounds");
//         }
//     });
// });
 
// // router.post("/", function(req, res){
    
// //     var name = req.body.nameQuery;
// //     var image = req.body.imgQuery;
// //     var description = req.body.decQuery;
// //     var newCampgrounds = {name: name, image: image, description: description};
    
// //     Campground.create(newCampgrounds, function(err, newlyCreated){
// //         if(err){
// //             console.log(err);
// //         }
// //         else {
// //             res.redirect("/campgrounds");
// //         }
// //     });
// // });

// router.get("/new", isLoggedIn, function(req, res){
//     res.render("campgrounds/new.ejs");
// });

// router.get("/:id", function(req, res){
    
    
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground);
//             res.render("campgrounds/show.ejs", {campground: foundCampground});
//         }
//     });

// });

// //Edit campgraound route
// router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
//     Campground.findById(req.params.id, function(err, foundCampground){
       
//     res.render("campgrounds/edit", {campground: foundCampground});
//     });
// });

// //Destroy Camp Route

// router.delete("/:id", checkCampgroundOwnership, function(req, res){
//   Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds");
//       }
//   });
// });
// //update campgraound route
// router.put("/:id", checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//     if(err){
//         res.redirect("/campgrounds");
//     } else {
//         res.redirect("/campgrounds/"+ req.params.id);
//     }
//     });
// });

// function checkCampgroundOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err){
//                 res.redirect("/campgrounds");
//             } else {
//                 if(foundCampground.author.id.equals(req.user._id)){
//                   next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
// });
// } else {
//     res.redirect("back");
// }
// }

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// module.exports = router;