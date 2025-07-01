'use client';
import { BtnAdd } from '@/components/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function AddStudent() {
  const [nama, setNama] = useState();
  const [alamat, setAlamat] = useState();
  const [nomorHp, setNomorHp] = useState();
  const router = useRouter();


  const addNewStudent = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/student', {
        Nama: nama,
        Alamat: alamat,
        NoHp: nomorHp
      });

      console.log(response);
      alert('Data berhasil di tambahkan!');
      router.push('/');
    } catch(error) {
      console.error("Error : ", error);
      console.error("Detail Error : ", error?.response.data);
    }
  }


  return (
    <div className='container mt-5'>
      <div className='row'>
        <h1>Tambah Siswa</h1>
        <form onSubmit={addNewStudent}>
            <div className="mb-3">
                <label htmlFor="Nama" className="form-label">Nama Siswa</label>
                <input type="text" className="form-control" id="Nama" name='Nama' onChange={(e) => setNama(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Alamat" className="form-label">Alamat</label>
                <input type="text" className="form-control" id="Alamat" name='Alamat' onChange={(e) => setAlamat(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="NoHp" className="form-label">Nomor Hp</label>
                <input type="text" className="form-control" id="NoHp" name='NoHp' onChange={(e) => setNomorHp(e.target.value)}/>
            </div>
            <BtnAdd/>
        </form>
      </div>
    </div>
  )
}

export default AddStudent
