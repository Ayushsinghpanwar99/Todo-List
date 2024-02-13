import React, { useEffect } from 'react'
import { addDoc, collection, doc, updateDoc, query, onSnapshot, deleteDoc } from "@firebase/firestore";
import { firestore } from './firebase'
import { useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const App = () => {
  let [tos, updatetos] = useState([]);
  const [data, updatedata] = useState({ name: '', idno: '' });
  useEffect(() => {
    const q = query(collection(firestore, "todata"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let myarray = [];
      querySnapshot.forEach((d) => {
        myarray.push({ ...d.data(), idno: d.id });
      });
      updatetos(myarray);
    });
    return () => unsub();
  }, [])
  const change = (e) => {
    updatedata({ ...data, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div class="container">
        <h2>ToDo List</h2>
        <form onSubmit={(e) => {
          e.preventDefault()

          try {
            if (data.idno === '') {
              addDoc(collection(firestore, "todata"), data);
              alert('added sucessfully');
            }
            else {
              updateDoc(doc(firestore, 'todata', data.idno), { name: data.name, })
              alert('updated sucessfully');
            }
            updatedata({ name: '' })
          } catch (err) {
            console.log(err)
          }
        }}>
          <div class="input-container">
            <input type="text" id="taskInput" name='name' value={data.name} onChange={change} placeholder="Enter Name" />
            {data.idno === '' ? <button>Add Name</button> : <button>Update Name</button>}
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tos.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => { updatedata(v) }}><FaEdit /></button>
                    <button onClick={() => {
                      deleteDoc(doc(firestore, 'todata', v.idno))
                      alert('deleted successfully');
                    }}><MdDelete /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App
