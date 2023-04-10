This Assignment is divided in to two parts 
1. Backend    2.Frontend

  #Backend: 
 
 
 I have created backend in Express.js,MongoDB(database) and I have followed MVC(Model View Controller) pattern  
 Folder Structure: 
  
  controllers--------
                   
                   1.postControllers.js(contains the logic for handling requests related to the Post model)
                   
                   
                   2. userController.js(contains the logic for handling requests related to the User model)
 
   database ---------
   
                    1.db.js(This file contains the configuration for connecting to the MongoDB database.)
  
   models------------1.Post.model.js(This file contains the definition for the Post model,including its fields and their types.)
                    
                    
                    2.User.model.js(This file contains the definition for the User model, including its fields and their types.)
  
   routes-----------
   
                   1.apiRoute.js(This file contains all the routes related to usr and post)
                   
                   
                   2.postsRoutes.js(This file defines the routes for the Post model)
                   
                   
                   3.userRoutes.js(This file defines the routes for the User model)
   
   
   server.js-------
   
                   (This file is the main entry point for the application, where you initialize the Express app, connect to the database, and register the routes )
    
   #Deployment of backend :
   I have deployed my backend to render.com
 
  1.Deployment Link : https://backend-2k1s.onrender.com
  
  2.routes : 
  
             1. To get All users : /users
  
             2. To get perticular /users/:id
             
             3. To get all posts , create a post  :/posts 
             
             4. To get perticular post , delete , update :/users/:id
             
    
  #Frontend :
  
  For frontend I have used React.js ,React-Bootstrap(css library) 
  
  Folder Structure :
   
   
   AllRoutes--------
   
                   1. AllRoute.jsx (All routes related to my app)
 
   components------
   
                   1.Navbar.jsx(Logic related to Navbar)
                   
                   2.PostList.jsx(To list all the post created)
                   
                   3.userForm.jsx(Form to create user)
                   
                   4.UserList.jsx(To show all the users list)
                   
                   
   pages-----------
   
                   1.AnalyticsPage.jsx(This file contain list of all users with Edit and Delete Functionality)
                   
                   2.CreatePosts.jsx(To create posts)
                   
                   3.HomePage.jsx(To show all posts with like and unlike functionality)
                   
                   4.UserPage.jsx(To create user)
                   
             
   Deployment: For frontend I have used Netlify to deploy my app
   
   Deployment Link: https://adobe-r1-assignment.netlify.app
   
   
   #Flow of the app 
   
   1.Homepage :  Here you can see all the posts with like and unlike functionality ,Time when post created 
   
   2.Create account : Here you will get a form to create user and after creating user you will redirect to posts page 
   
   3.All Posts : Here you will get a form to create post as well as you will see all posts with delete and edit functionality
   
   4.Analytics : Here you will see All the users with edit and delete functionality with toatal number 
   
   
                                                           Homepage
                                                           
   
   ![image (26)](https://user-images.githubusercontent.com/101391587/230818525-3e5bc8d6-dca2-48c2-96c2-215483ce507f.png)

   
                                                          Create Account 
   
   ![image (27)](https://user-images.githubusercontent.com/101391587/230818818-ed7f2406-2615-455d-a90c-591fcaaa89df.png)
   
   
                                                          Posts
                                                          
                                                          
    
  ![image (28)](https://user-images.githubusercontent.com/101391587/230819197-1c728690-675f-473e-8b6d-c855cfb24e6e.png)


                                                          Analytics 
                                                          
  ![image (29)](https://user-images.githubusercontent.com/101391587/230819547-3f7348d1-a98f-425b-9442-c8a797e1250a.png)
