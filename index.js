import express from 'express';
import bodyParser from 'body-parser';
import {createReadStream} from 'fs';
import crypto from 'crypto';
import http from 'http';
import Zombie from 'zombie';
import mongodb from 'mongodb';
import cors from 'cors';
import path from 'path';

import appSrc from './app.js';
const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongodb, Zombie, cors, path);
app.listen(process.env.PORT || 3400);