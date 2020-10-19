import {Request, Response} from 'express'
import request from 'request'
import { Token } from 'typescript';

const Login = async(req: Request, res: Response) =>{
    try{
        const {username, password} = req.body
        let request = require('request');
    const options = {
    'method': 'POST',
    'url': 'http://sinhvien.tlu.edu.vn:8099/education/oauth/token',
    'headers': {
        Connection: 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': req.headers['user-agent'],
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://sinhvien.tlu.edu.vn',
        'Referer': 'http://sinhvien.tlu.edu.vn/',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
    },
    form: {
        'client_id': 'education_client',
        'grant_type': 'password',
        'username': username,
        'password': password,
        'client_secret': 'password'
    }
    };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        
        return res.json({
            token: JSON.parse(response.body).access_token
        })
        });
    }
    catch (error) {
        console.log(error)
        return res.status(500).jsonp({ message: error })
    }
}

const getCurrentUser = async(req: Request, res: Response)=>{
    try{
        let access_token = req.headers.access_token
        let request = require('request');
        const options = {
            method: 'GET',
            'url': 'http://sinhvien.tlu.edu.vn:8099/education/api/users/getCurrentUser',
            'headers': {
                'Connection': 'keep-alive',
                'Accept': 'application/json, text/plain, */*',
                'Authorization': 'Bearer ' + access_token,
                'User-Agent': req.headers['user-agent'],
                'Origin': 'http://sinhvien.tlu.edu.vn',
                'Referer': 'http://sinhvien.tlu.edu.vn/',
                'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
                'Cookie': req.headers.cookie
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            
            const body = JSON.parse(response.body)
                return res.json({
                    homeTown : body.birthPlace,
                    fullName : body.displayName,
                    email: body.email,
                    studentCode: body.modifiedBy,
                })
            });

        }
    catch(error) {
        console.log(error)
        return res.status(500).jsonp({ message: error })
    }
}
export{Login, getCurrentUser}