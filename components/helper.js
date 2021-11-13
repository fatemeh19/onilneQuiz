'use strict'
// const _ = require('lodash');
const bcrypt = require('bcrypt');
const fs = require('fs');
// const Op = require('../db/models/index').Sequelize.Op
var path = require("path");
const jwt = require("jsonwebtoken")
// const axios = require('axios');
const phone = require("phone")
const { userKey } = require("../config/params")
const {userModel} = require('../models/user')
class Helper {
    static mobile = (value, helpers) => {
        if (!value.startsWith("+")) value = "+" + value
        let validate = phone(value)
        if (!validate || validate.length < 1) return helpers.error("any.invalidMobile");
        return validate[0];
    }

    static email = (value, helpers) => {
        const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(value))return value
        return helpers.error("any.invalidEmail");
    }
    static FilerLike(s) {
        return {
            [Op.iLike]: `%${s}%`
        }
    }
    static async upload_file(file) {
        let date = new Date();
        let timestamp = date.getTime();
        let name = timestamp + '-' + Math.random().toString().slice(2, 6);
        let file_name = 'public/excel/' + name;
        await file.mv(file_name);
        return name
    }
    static async checkUplaod(photo) {

            let images = []
            if (!Array.isArray(photo)) photo = [photo]
            for (let i = 0; images.length < 10 && i < photo.length; i++) {
                let p = photo[i]
                let check = await Helper.filterFile(p)
                if (check) {
                    p.name = Date.now().toString() + Math.random().toString().slice(2, 6) + check;
                    await p.mv(`./public/images/${p.name}`);
                    images.push(p.name)
                }
            }
            return images

    }
    static async removeImage(photo,folder = 'images') {
        try {
            await fs.unlinkSync(path.join(process.cwd() + `/public/${folder}/${photo}`))
        } catch (e) {
            //it's ok
        }
    }
    static async RandomCode() {
        return (Math.ceil(Math.random() * 8999) + 1000).toString();
    }
    static async filterFile(file) {
        if (file.size > 2000000) {
            return false
        }
        console.log("-=-=",file.mimetype);
        if (file.mimetype === 'image/png') {
            return '.jpg'
        }
        if (file.mimetype === 'image/jpeg') {
            return '.jpg'
        }
        if (file.mimetype === 'image/jpg') {
            return '.jpg'
        }
        if (file.mimetype === 'application/pdf') {
            return '.pdf'
        }
        return false
    }
    static async Hash(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };
    static async Compare(password, Hash) {
        return await bcrypt.compare(password, Hash);
    }
    static async paginate(base, page, args, pageSize) {
        page = Number(page)
        page = (!page || page < 1) ? null : page
        pageSize = pageSize || 20
        let datas = {}
        if (page) {
            const rows = await base.findAll({
                ...args,
                distinct: true,
                limit: pageSize,
                offset: pageSize * (page - 1)
            })
            const count = rows.length
            datas = {
                count: count,
                pages: Math.ceil(count / pageSize),
                data: rows
            }
        } else {
            datas = await base.findAll({
                ...args
            })
        }
        return datas;
    }
    static async GenerateToken(user, type = "user") {
        let token = jwt.sign({ _type: type }, userKey, { subject: user.id + "" /*,expiresIn: "2d"*/ })
        let lastloginToken = jwt.decode(token)
        //set lastlogin to new token iat so other tokens will deactivate
        user.lastLoginAt = new Date(lastloginToken.iat * 1);
        await user.save()
        return token
    }
    static async TokenVerify(token) {
        try {
            let secret = userKey
            let decode = await jwt.verify(
                token,
                secret,
            );
            if (decode._type == "user") {
                userModel.findOne({
                    id:decode.sub
                },(err,user)=>{
                    if (!user) throw false;
                    else return user

                })
               
                
            };
           
            
        } catch (e) {
            throw false;
        }
    }
    static async DuplicateEmail(email) {
       
        let dup = await db.User.findOne({
            where: {
                email, 
                deleted:false
            }
        })
        return dup ? true : false
    }
    static async DuplicateUpdateEmail(base, email, id) {
        console.log(id)
        let dup = await base.findOne({
            where: {
                [Op.not]: {
                    id,
                },
                email, 
                deleted:false

            }
        })
        if (dup) return true
        
        return dup ? true : false
    }

}


module.exports = { Helper }
