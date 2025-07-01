import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {
    return await updateStudent(req, params.id);
}

export async function DELETE(req, {params}) {
    return await deleteStudent(req, params.id);
}

export async function GET(req, {params}) {
    return await getStudentById(req, params.id);
}

async function updateStudent(req, id) {
    try {
        const body = await req.json();
        const {Nama, Alamat, NoHp} = body;

        const updateData = {
            Nama,
            Alamat,
            NoHp
        }

        await prisma.student.update({
            where: {id: parseInt(id)},
            data: updateData
        });

        return NextResponse.json({
            status: 200,
            message: "Successfully update the data!"
        });

    } catch(error) {
        console.error("Error : ", error);
    }
}

async function getStudentById(req, id) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    });

    if (!student) {
      return NextResponse.json({
        status: 404,
        message: "Data with that ID is not found!"
      }, { status: 404 });
    }

    return NextResponse.json({ student }, { status: 200 });

  } catch (error) {
    console.error("Error : ", error);
    return NextResponse.json({
      status: 500,
      message: "Server error while fetching the data!"
    }, { status: 500 });
  }
}

 
async function deleteStudent(req, id) {
    try {
        await prisma.student.delete({
            where: {id: parseInt(id)}
        });

        return NextResponse.json({
            status: 200,
            message: "Successfully delete the data!"
        });
    } catch(error) {
        console.error("Error : ", error);
        return NextResponse.json({
            status: 200,
            message: "Failed to delete the data!"
        });
    }
}
