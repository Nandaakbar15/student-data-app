'use client'
import { BtnBack, BtnUpdate } from '@/components/Button';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal';
import Link from 'next/link';

function UpdateStudent() {
  const {id} = useParams();
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getStudentbyId = async() => {
      try {
        const response = await axios.get(`/api/student/${id}`);
        const {Nama, Alamat, NoHp} = response.data.student;
        // console.log(response.data.student);
        setNama(Nama);
        setAlamat(Alamat);
        setNomorHp(NoHp);
      } catch(error) {
        console.error("Error : ", error);
      }
    }

    getStudentbyId();
  }, [id]);

  const updateStudent = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/student/${id}`, {
        Nama: nama,
        Alamat: alamat,
        NoHp: nomorHp
      });

      // console.log(response);
      setShowModal(true);
      setMessage(response.data.message);

      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000);

      // refresh the form
      setNama("");
      setAlamat("");
      setNomorHp("");
    } catch(error) {
      console.error("Error : ", error);
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <h1>Update Siswa</h1>
        <form onSubmit={updateStudent}>
          <div className="mb-3">
            <label htmlFor="Nama" className="form-label">Nama Siswa</label>
            <input type="text" className="form-control" id="Nama" name='Nama' value={nama} onChange={(e) => setNama(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="Alamat" className="form-label">Alamat</label>
            <input type="text" className="form-control" id="Alamat" name='Alamat' value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="NoHp" className="form-label">Nomor Hp</label>
            <input type="text" className="form-control" id="NoHp" name='NoHp' value={nomorHp} onChange={(e) => setNomorHp(e.target.value)}/>
          </div>
          <div className='mb-3'>
            <BtnUpdate/>
          </div>
        </form>
        <Link href={'/'}>
          <BtnBack/>
        </Link>
      </div>
      {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
    </div>
  )
}

export default UpdateStudent
