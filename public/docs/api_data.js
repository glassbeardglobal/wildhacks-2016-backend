define({ "api": [
  {
    "type": "get",
    "url": "/api",
    "title": "Root",
    "name": "GetAPIRoot",
    "group": "Index",
    "description": "<p>This path gets the root of the API</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true,\n  \"message\":\"API Root\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/index.js",
    "groupTitle": "Index"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Create User",
    "name": "PostUsers",
    "group": "User",
    "description": "<p>This path creates a user from request body data</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "Delete Users by ID",
    "name": "DeleteUsersID",
    "group": "Users",
    "description": "<p>This path Deletes a user by passing in the ID to the url</p>",
    "examples": [
      {
        "title": "Example Path:",
        "content": "/api/users/583003f9284d9222bf802777",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get All Users",
    "name": "GetUsers",
    "group": "Users",
    "description": "<p>This path gets a list of all users</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "[...]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get Users by ID",
    "name": "GetUsersID",
    "group": "Users",
    "description": "<p>This path gets a user by passing in the ID to the url</p>",
    "examples": [
      {
        "title": "Example Path:",
        "content": "/api/users/583003f9284d9222bf802777",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/docs/main.js",
    "group": "_home_jj_Desktop_wildhacks_wildhacks_2016_backend_public_docs_main_js",
    "groupTitle": "_home_jj_Desktop_wildhacks_wildhacks_2016_backend_public_docs_main_js",
    "name": ""
  }
] });