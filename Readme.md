---
runme:
  id: 01HSNHD40PZ3VE11VK7XR4P4Z7
  version: v3
---

Frontend UI Components Link:
    https://even-hydrant-9d5.notion.site/FSD-Documentation-03efb6ff7e684b7387a175262f843dad?pvs=4


 
 File Structure:

/app
├── config/
│   ├── db.conf.js
│   ├── app.conf.js
│   ├── app.keys.js
│   ├── db.keys.js
│   ├── init.js
├── database/
│   ├── Redis.database.js
│   ├── Mongo.database.js
│   ├── init.js
├── routes/
│   ├── App.routes.js
│   ├── Auth.routes.js
│   ├── Dashboard.routes.js
├── utils/
│   ├── Logger.util.js
├── middleware/
│   ├── App.middleware.js
│   ├── ErrorHandler.middleware.js
│   ├── init.js
├── models/
│   ├── User.model.js
├── controllers/
│   ├── App.controller.js
│   ├── User.controller.js
├── helpers/
│   ├── App.helper.js
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── support/
│   │   ├── index.ejs
│   ├── documentation/
│   │   ├── index.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
/public
├── dist/
├── images/
│   ├── dashboard/
│   ├── auth/
│   ├── documentation/      
├── sitemap.xml
/samples
├── .env.sample
├── db.conf.sample
├── app.conf.sample
├── app.keys.sample
/src
├── javascript/
├── css/
/node_modules
/server.js
/package.json
/.env
