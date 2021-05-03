// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getUsers(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPLoadUsers")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUser(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('userID',sql.Int, req.params.user_id)
            .query("exec SPLoadUser @user_id = @userID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addUser(req , res){
      try {
        if(req.body.user_name != null && req.body.group_id != null && req.body.user_type_id != null && req.body.created_by != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('userName',sql.VarChar, req.body.user_name)
          .input('password',sql.VarChar, req.body.password)
          .input('groupID',sql.Int, req.body.group_id)
          .input('usertypeID',sql.Int, req.body.user_type_id)
          .input('createdBy',sql.Int, req.body.created_by)
          .query("exec SPAddUser @user_name = @userName, @password = @password, @group_id = @groupID, @user_type_id = @usertypeID, @created_by = @createdBy")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateUser(req, res){
      try {
        if(req.body.user_name != null && req.body.group_id != null && req.body.user_type_id != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('userID',sql.Int, req.params.user_id)
          .input('userName',sql.VarChar, req.body.user_name)
          .input('groupID',sql.Int, req.body.group_id)
          .input('usertypeID',sql.Int, req.body.user_type_id)
          .query("exec SPUpdateUser @user_id = @userID, @user_name = @userName, @group_id = @groupID, @user_type_id = @usertypeID")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateUserPassword(req, res){
      try {
        if(req.body.password != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('userID',sql.Int, req.params.user_id)
          .input('newPassword',sql.VarChar, req.body.password)
          .query("exec SPUpdateUserPassword @user_id = @userID, @password = @newPassword")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateUserLastLogin(req, res){
      try {
        if(req.body.last_login != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('userID',sql.Int, req.params.user_id)
          .input('newLastLogin',sql.DateTime, req.body.last_login)
          .query("exec SPUpdateUserLastLogin @user_id = @userID, @last_login = @newLastLogin")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteUser(req , res){
      try {
        if(req.params.user_id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('userID',sql.Int, req.params.user_id)
            .query("exec SPDeleteUser @user_id = @userID")
            res.json(result)
          } else {
            res.send('Agrega el id del usuario!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getUserbyUserName(req , res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .input('userName',sql.VarChar, req.params.user_name)
          .query("exec SPLoadUserByUserName @user_name = @userName")
          res.json(result.recordset)
      } catch (error) {
          res.status(500)
          res.send(error.message)
      }
  }
}

const userController = new MainController()
module.exports = userController;