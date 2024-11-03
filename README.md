# Menggunakan Middleware Kustom di Redux

Middleware di Redux memungkinkan kita untuk menangkap dan memodifikasi aksi (action) sebelum mencapai reducer. Ini berguna untuk menambahkan logika tambahan, seperti log aktivitas, validasi, atau penanganan asinkron seperti dengan `redux-thunk`.

Dalam panduan ini, kita akan membuat middleware kustom `loggerMiddleware` untuk mencatat setiap aksi yang diproses di store.

## 1. Instalasi Paket Redux dan Redux Middleware

Pastikan Anda sudah menginstal `redux` dan `react-redux`:
```bash
npm install redux react-redux
```
## 2. Membuat Middleware Kustom
Middleware loggerMiddleware akan mencatat informasi tentang aksi (action) yang sedang diproses sebelum meneruskannya ke reducer.

Kode: store.js
```javascript
import { createStore, applyMiddleware } from 'redux';
import counterReducer from './counterReducer';

// Custom Middleware
const loggerMiddleware = store => next => action => {
    console.log('Middleware:', action.type);
    return next(action);
};

// Membuat store Redux dengan middleware
const store = createStore(
    counterReducer,
    applyMiddleware(loggerMiddleware)
);

export default store;
```
### Penjelasan
- loggerMiddleware: Middleware ini menerima tiga argumen:
  - store: Objek store Redux yang memberikan akses ke dispatch dan getState.
  - next: Fungsi yang meneruskan aksi ke middleware berikutnya atau ke reducer.
  - action: Aksi yang sedang diproses.
- console.log('Middleware:', action.type): Middleware ini akan mencatat jenis aksi (action.type) yang sedang diproses ke konsol.
- applyMiddleware: Fungsi applyMiddleware digunakan untuk menambahkan loggerMiddleware ke store Redux.
## 3. Konfigurasi Store dengan Middleware
Gunakan applyMiddleware untuk menambahkan loggerMiddleware ke dalam store. Ini memungkinkan semua aksi yang dikirimkan (dispatch) melewati loggerMiddleware sebelum mencapai reducer.
```javascript
const store = createStore(
    counterReducer,
    applyMiddleware(loggerMiddleware)
);
```
## 4. Contoh Penggunaan Middleware dalam Aplikasi
Dengan middleware ini, setiap kali aksi dikirimkan, Anda akan melihat pesan log di konsol dengan jenis aksi yang diproses, seperti INCREMENT atau DECREMENT.
## Kesimpulan
Middleware di Redux memungkinkan Anda untuk menangani aksi sebelum mencapai reducer. Dalam contoh ini:
- loggerMiddleware mencatat setiap jenis aksi yang dikirim.
- Middleware ditambahkan ke store menggunakan applyMiddleware.

Middleware kustom ini adalah cara yang efektif untuk menambahkan logika tambahan, seperti pencatatan dan penanganan efek samping, dalam alur kerja Redux.