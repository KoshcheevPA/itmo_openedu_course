import express from 'express';
import bodyParser from 'body-parser';
import {createReadStream} from 'fs';
import crypto from 'crypto';
import http from 'http';
import Zombie from 'zombie';
import mongoose from 'mongoose';
import UserModel from './models/User';

const User = UserModel(mongoose);

import appSrc from './app.js';
const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongoose, User, Zombie);
app.listen(process.env.PORT || 3400);