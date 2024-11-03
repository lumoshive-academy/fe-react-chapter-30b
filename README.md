# Menggunakan Redux Thunk untuk Aksi Asinkron di Redux

Redux Thunk adalah middleware yang memungkinkan kita untuk menulis aksi (actions) asinkron di Redux. Ini sangat berguna saat kita perlu melakukan operasi asinkron seperti pengambilan data dari API.

## 1. Instalasi Redux Thunk

Untuk menggunakan Redux Thunk, instal paket `redux-thunk` dengan perintah berikut:

```bash
npm install redux-thunk
```
## 2. Konfigurasi Redux Store dengan Thunk Middleware
Kita perlu menambahkan middleware thunk ke store untuk menangani aksi asinkron. Berikut adalah kode konfigurasi store.js:

Kode: store.js
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import asyncReducer from './asyncReducer';

// Membuat store dengan middleware Thunk
const store = createStore(
    asyncReducer,
    applyMiddleware(thunk)
);

export default store;
```
Penjelasan
- applyMiddleware(thunk): Menambahkan middleware thunk untuk memungkinkan aksi asinkron di Redux.
- asyncReducer: Reducer yang mengelola state todos dan error.

## 3. Membuat Thunk Action untuk Mengambil Data dari API
Kita akan membuat aksi asinkron fetchTodos untuk mengambil data dari API dan mengirimkannya ke Redux.

Kode: asyncReducer.js
```javascript
// State
const initialState = {
    todos: [],
    error: null
};

// Thunk Action
export const fetchTodos = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
        }
    };
};

// Reducer
const asyncReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            return {
                ...state,
                todos: action.payload,
                error: null
            };
        case 'FETCH_TODOS_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default asyncReducer;
```
Penjelasan
- initialState: Mendefinisikan state awal dengan todos sebagai array kosong dan error sebagai null.
- fetchTodos (Thunk Action): Aksi asinkron yang menggunakan dispatch untuk mengirim aksi setelah data diambil.
    - dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data }): Mengirim aksi FETCH_TODOS_SUCCESS dengan data yang berhasil diambil.
    - dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message }): Mengirim aksi FETCH_TODOS_FAILURE jika terjadi error.
- Reducer: Mengelola state berdasarkan aksi yang diterima (FETCH_TODOS_SUCCESS atau FETCH_TODOS_FAILURE).
## 4. Menggunakan Aksi Asinkron di Komponen React
Komponen App akan menggunakan aksi fetchTodos untuk mengambil data dari API saat komponen pertama kali dimuat.

Kode: App.js
```javascript
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "./redux/asyncReducer";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default App;
```
Penjelasan
- useDispatch: Hook untuk mengirim aksi fetchTodos ke store.
- useSelector: Hook untuk mengambil todos dan error dari state Redux.
- useEffect: Mengirim aksi fetchTodos saat komponen dimuat pertama kali.
- Error Handling: Jika terjadi error, akan ditampilkan pesan error.

## Kesimpulan
Dengan Redux Thunk, kita dapat menangani aksi asinkron seperti pengambilan data API di Redux. Dalam contoh ini:

- Redux Thunk Middleware ditambahkan ke store untuk mengaktifkan aksi asinkron.
- fetchTodos adalah thunk action yang mengambil data dan memperbarui state Redux berdasarkan hasil pengambilan data.
- Komponen React menggunakan fetchTodos untuk mengambil data saat dimuat, dan menampilkan data todos atau pesan error jika ada.