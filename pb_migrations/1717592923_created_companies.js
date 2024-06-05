/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fpxba1qts9mcr4r",
    "created": "2024-06-05 13:08:43.029Z",
    "updated": "2024-06-05 13:08:43.029Z",
    "name": "companies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "op86rrjp",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3eysbhzc",
        "name": "value",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fpxba1qts9mcr4r");

  return dao.deleteCollection(collection);
})
