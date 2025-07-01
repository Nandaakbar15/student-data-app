// import Image from "next/image";
// import styles from "./page.module.css";

// import { BtnAdd } from "@/components/Button";
'use client'

import { BtnDelete } from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudent] = useState([]);

  const fetchStudent = async() => {
    try {
      const response = await axios.get('/api/student');
      setStudent(response.data);
    } catch(error) {
      console.error("Error : ", error);
      console.error("Detail Error : ", error.response?.data);
    }
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <h1>Daftar Siswa</h1>
        <Link href={'/add-student'} className="btn btn-primary"><h2>Tambah Siswa</h2></Link>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Nama Siswa</th>
            <th scope="col">Alamat</th>
            <th scope="col">Nomor Hp</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map((data => (
            <tr key={data.id}>
              <td>{data.Nama}</td>
              <td>{data.Alamat}</td>
              <td>{data.NoHp}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
              </td>
              <td>
                <BtnDelete/>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
