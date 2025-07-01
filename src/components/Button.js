import React from 'react'

function Button({children}) {
  return (
    <div className='button-body'>
      {children}
    </div>
  )
}

export function BtnAdd() {
    return (
        <div className='button-add'>
            <button className='btn btn-primary'>Tambah</button>
        </div>
    );
}

export function BtnDelete() {
  return (
    <div className='button-delete'>
      <button className='btn btn-danger'>Hapus</button>
    </div>
  );
}

export function BtnUpdate() {
  return (
    <div className='button-update'>
      <button className='btn btn-warning'>Update</button>
    </div>
  );  
}

export default Button
