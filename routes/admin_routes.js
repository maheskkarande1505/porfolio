var express = require("express");
var router = express.Router();
var exe = require("./db");
const { param } = require("./user_routes");

router.get("/", function(req,res){
    res.render("admin/home.ejs");
});

router.get("/introduction", async function(req, res){
    var sql = `SELECT * FROM introduction`;
    var data = await exe(sql);
    var obj = {"intro":data[0]}
    res.render("admin/introduction.ejs", obj);
});

router.post("/save_intro", async function(req, res)
{
    if(req.files)
    {
        if(req.files.user_photo)
        {
            var user_photo = new Date().getTime()+req.files.user_photo.name
            req.files.user_photo.mv("public/"+user_photo);
            var sql = `UPDATE introduction SET user_photo = '${user_photo}'
                        WHERE intro_id = 1`;
            var data = await exe(sql);
        }
        if(req.files.resume)
        {
             var resume = new Date().getTime()+req.files.resume.name
             req.files.resume.mv("public/"+resume)
             var sql = `UPDATE introduction SET resume = '${resume}'
                        WHERE intro_id = 1`;
            var data = await exe(sql);
        }
    }
    var d = req.body;
    var sql = `UPDATE introduction SET 
                    user_name = '${d.user_name}',
                    tag_line = '${d.tag_line}',
                    user_mobile  = '${d.user_mobile}',
                    user_email = '${d.user_email}',
                    linkdin_link = '${d.linkdin_link}',
                    instagram_link = '${d.instagram_link}',
                    facebook_link = '${d.facebook_link}',
                    twitter_link = '${d.twitter_link}',
                    about_details = '${d.about_details}'
                WHERE  intro_id = 1 `;
    var data = await exe(sql);
   // res.send(data);
    res.redirect("/admin/introduction");
});

router.get("/education", async function(req,res){
    var sql = `SELECT * FROM qualification`
    var data = await exe(sql);
    var obj = {"list":data}
    res.render("admin/education.ejs", obj);
})

router.post("/save_education", async function(req, res){
    var d= req.body;
    var sql = `INSERT INTO qualification (qualification_name, university,passing_year,percentage) VALUES
                                        ('${d.qualification_name}','${d.university}','${d.passing_year}','${d.percentage}')`;
    var data = await exe(sql);
   // res.send(data);
   res.redirect("/admin/education");
});

router.get("/edit_education/:id", async function(req,res){
    var id = req.params.id; 
    var sql = `SELECT * FROM qualification WHERE qualification_id = '${id}' `;
    var data = await exe(sql);
    var obj = {"qualification":data[0]};
   // res.send(data);
    res.render("admin/edit_education.ejs", obj);
});

router.post("/update_education",async function(req, res){
    var d = req.body;
     var id = req.params.id; 
    var sql = `UPDATE qualification SET 
                      qualification_name='${d.qualification_name}', 
                      university='${d.university}',
                      passing_year= '${d.passing_year}',
                      percentage= '${d.percentage}'
                WHERE qualification_id = '${d.qualification_id}'    
                       `;
     var data = await exe(sql);
    // res.send(data);
     res.redirect("/admin/education") ;
});

// Delete Education
router.get("/delete_education/:id", async function(req, res){
    var id = req.params.id; 
    var sql = `DELETE FROM qualification WHERE qualification_id = '${id}'`;
    var data = await exe(sql);
    //res.send(data);
    res.redirect("/admin/education");

});

router.get("/skills", async function (req, res){
    var sql = `SELECT * FROM skill`;
    var data = await exe(sql);
    var obj = {"skills":data};
    res.render("admin/skills.ejs", obj);
})

router.post("/save_skills", async function (req, res)
{
    var skill_image = '';
    if(req.files)
    {
        if(req.files.skill_image)
        {
            skill_image = new Date().getTime()+req.files.skill_image.name;
            req.files.skill_image.mv("public/"+skill_image);
        }
    }
    var d= req.body;
    var sql = `INSERT INTO skill (skill_image,skill_title)VALUES
                            ('${skill_image}', '${d.skill_title}') `;
    var data = await exe(sql);
   //  res.send(data);
   res.redirect("/admin/skills");

});

// Delete Skill
router.get("/delete_skill/:id", async function(req, res){
    var id = req.params.id; 
    var sql = `DELETE FROM skill WHERE skill_id = '${id}'`;
    var data = await exe(sql);
    //res.send(data);
    res.redirect("/admin/skills");

});

// Edit Skill
router.get("/edit_skill/:id", async function (req, res){
    var id = req.params.id; 
   var sql = `SELECT * FROM skill WHERE skill_id = '${id}' `;
   var data = await exe(sql);
   var obj = {"skills":data[0]};
   res.render("admin/edit_skill.ejs", obj);
  // res.send(data);
});

router.post("/update_skills", async function(req,res){
    var d = req.body;  
    
    if(req.files)
    {
        if(req.files.skill_image)
        {
            var new_name = new Date().getTime()+req.files.skill_image.name;
            req.files.skill_image.mv("public/"+new_name);
            var sqlimage = `UPDATE skill SET skill_image = '${new_name}' 
                            WHERE skill_id = '${d.skill_id}'`;
            var dataiamge = await exe(sqlimage);
        }
    }

    var sql = `UPDATE skill SET 
                      skill_title = '${d.skill_title}'
                WHERE skill_id = '${d.skill_id}'    
                       `;
     var data = await exe(sql);
    // res.send(data);
     res.redirect("/admin/skills") ;
    
})

router.get("/project", async function(req, res){
    var sql = `SELECT * FROM projetct`
    var data = await exe(sql);
    var obj = {"projects":data};
    res.render("admin/project.ejs",obj);
})

router.post("/save_project", async function(req,res){
    var d = req.body;
    var project_photo = '';
    if(req.files)
    {
        if(req.files.project_photo)
        {
            project_photo = new Date().getTime()+req.files.project_photo.name;
            req.files.project_photo.mv("public/"+project_photo);
        }

    }
    var sql = `INSERT INTO projetct (project_photo,project_name,project_github_link,project_details)VALUES
                ('${project_photo}','${d.project_name}','${d.project_github_link}','${d.project_details}')`;
    var data = await exe (sql);                       
   // res.send(data);
   res.redirect("/admin/project");
});

router.get("/edit_project/:id", async function (req, res){
     var id = req.params.id; 
    var sql = `SELECT * FROM projetct WHERE project_id = '${id}' `;
    var data = await exe(sql);
    var obj = {"projects":data[0]};
    res.render("admin/edit_project.ejs", obj);
   // res.send(data);
});


router.post("/update_project", async function(req,res){
    var d = req.body;  
    
    if(req.files)
    {
        if(req.files.project_photo)
        {
            var new_name = new Date().getTime()+req.files.project_photo.name;
            req.files.project_photo.mv("public/"+new_name);
            var sqlimage = `UPDATE projetct SET project_photo = '${new_name}' 
                            WHERE project_id = '${d.project_id}'`;
            var dataiamge = await exe(sqlimage);
        }
    }

    var sql = `UPDATE projetct SET 
                      project_name='${d.project_name}', 
                      project_github_link='${d.project_github_link}',
                      project_details= '${d.project_details}'
                WHERE project_id = '${d.project_id}'    
                       `;
     var data = await exe(sql);
    // res.send(data);
     res.redirect("/admin/project") ;
    
})



router.get("/delete_project/:id", async function(req, res){
    var id = req.params.id; 
    var sql = `DELETE FROM projetct WHERE project_id = '${id}'`;
    var data = await exe(sql);
    //res.send(data);
    res.redirect("/admin/project");

});


// router.post("/save_project", async function (req, res) {
//     var d = req.body;
//     var project_photo = '';
//     if (req.files && req.files.project_photo) {
//       project_photo = new Date().getTime() + req.files.project_photo.name;
//       req.files.project_photo.mv("public/" + project_photo);
//     }
  
//     var sql = '';
//     if (d.project_id) {
//       // Update existing project
//       sql = `UPDATE projetct SET 
//               project_photo = '${project_photo}', 
//               project_name = '${d.project_name}', 
//               project_github_link = '${d.project_github_link}', 
//               project_details = '${d.project_details}' 
//             WHERE project_id = '${d.project_id}'`;
//     } else {
//       // Insert new project
//       sql = `INSERT INTO projetct (project_photo,project_name,project_github_link,project_details) 
//              VALUES ('${project_photo}','${d.project_name}','${d.project_github_link}','${d.project_details}')`;
//     }
  
//     var data = await exe(sql);
//     res.redirect("/admin/project");
//   });
  

module.exports = router;
