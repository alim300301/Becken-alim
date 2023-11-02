const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/saveData', (req, res) => {
  const newData = {
    nama: req.body.nama,
    alamat: req.body.alamat,
    pekerjaan: req.body.pekerjaan,
  };

  fs.readFile('data.json', (err, data) => {
    if (err) {l
      fs.writeFile('data.json', JSON.stringify([newData]), (err) => {
        if (err) {
          console.error('Gagal menyimpan data ke file JSON');
        }
      });
    } else {
      const existingData = JSON.parse(data);
      const arrayData = Array.from(existingData);
      arrayData.push(newData);

      fs.writeFile('data.json', JSON.stringify(arrayData), (err) => {
        if (err) {
          console.error('Gagal menyimpan data ke file JSON');
        }
      });
    }
  });

  res.redirect('/');
});

app.get('/getData', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) {
      console.error('Gagal membaca data dari file JSON');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

app.listen(3000);