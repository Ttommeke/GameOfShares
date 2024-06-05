/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fpxba1qts9mcr4r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ov9sreau",
    "name": "totalshares",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fpxba1qts9mcr4r")

  // remove
  collection.schema.removeField("ov9sreau")

  return dao.saveCollection(collection)
})
