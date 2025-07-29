import {DataTypes} from 'sequelize';
import { db } from './db.js';
export const Profile = db.define('Profile',{
    name:           DataTypes.STRING,
    url:          {
    type: DataTypes.STRING,
    unique:true
    } ,
    about:          DataTypes.TEXT,
    bio:            DataTypes.TEXT,
    location:       DataTypes.STRING,
    followerCount:  DataTypes.INTEGER,
    connectionCount: DataTypes.INTEGER,
    bioLine:       DataTypes.STRING,
})
