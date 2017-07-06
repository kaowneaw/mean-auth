const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyPaser.json());

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Hello word')
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});



// พิมพ์ 2 ออกมาทั้งสองครั้ง
for(var i = 0; i < 2; i++) {
  // เนื่องจากในจังหวะที่ console.log ทำงาน loop ได้วนไปจนครบแล้ว
  // ทำให้ในขณะนั้่นค่า i มีค่าเป็น 2
  // อย่าลืมว่า i ประกาศโดยใช้ var มันจึงผลักตัวเองออกจาก for
  // หรือพูดง่ายๆคือ i นั้นเป็นตัวแปรตัวเดียวทุกครั้งที่วนลูปก็เพิ่มค่าใส่ตัวแปรเดิม
  setTimeout(function() { console.log("var "+i) }, 100)
}

// ผลลัพธ์ได้ 0 และ 1
// ใช้ let ประกาศตัวแปรทำให้ตัวแปรเป็น block-scoped
// พูดง่ายๆคือ i จะเกิดขึ้นทุกครั้งที่วนลูป
// และไม่ซ้ำกับ i ก่อนหน้า
// เนื่องจากเป็น block-scoped มันจึงมีช่วงชีวิตอยู่แค่ใน {}
for(let i = 0; i < 2; i++) {
  setTimeout(function() { console.log("let "+i) }, 100)
}