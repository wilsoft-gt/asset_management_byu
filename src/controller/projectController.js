const { response } = require('express')
const db = require('../model/db')

const project = {}

project.getAll = async (req, res) => {
  try {
    const response = await db.sql`SELECT * FROM project`
    res.status(200).json(response)
  } catch(e) {
    res.status(500).json({error: e})
  }
}


project.get = async (req, res) => {
  try {
    const response = await db.sql`SELECT * FROM project WHERE id = ${req.params.projectId}`
    res.status(200).json(response)
  } catch(e) {
    res.status(500).json({error: e})
  }
}


project.create = async (req, res) => {
  try {
    const {name, shortname} = req.body
    const exists = await db.projectExists(name)
    if (!exists) {
      const response = await db.sql`INSERT INTO project (name, shortName) VALUES (${name}, ${shortname}) returning *`
      if (response[0].id) {
        return res.status(201).json({id: response[0].id, ...req.body})
      }
      return res.status(400).json({error: "user could not be created"})
    }
    return res.status(400).json({error: "project already exists"})
  } catch(e) {
    return res.status(500).json({error: "server error"})
  }
}


project.update = async (req, res) => {
  try {
    const response = await db.sql`UPDATE project SET ${db.sql(req.body)} WHERE id = ${req.params.projectId} returning *`
    return res.status(200).json(response)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


project.delete = async (req, res) => {
  try {
    const response = await db.sql`DELETE FROM project WHERE id = ${req.params.projectId}`
    return res.status(204).json(response)
  } catch(e) {
    return res.status(500).json(response)
  }
}

module.exports = project