import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
    try {
        const students = await prisma.student.findMany();
        return NextResponse.json(students, {status: 200});
    } catch(error) {
        console.error("Error : ", error);
        return NextResponse.json({
            statusCode: 400,
            message: "Failed to fetch the data!"
        });
    }
}

export async function POST(req) {
  try {
    const body = await req.json(); // must parse manually
    const { Nama, Alamat, NoHp } = body;

    const newStudent = await prisma.student.create({
      data: { Nama, Alamat, NoHp }
    });

    return NextResponse.json({
      message: 'Success add new data!',
      student: newStudent,
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json({
      message: 'Failed to add new data'
    }, { status: 400 });
  }
}

export async function PUT(req, res) {
  try {
    const body = await json();
    const parseId = parseInt(req.params.id);
    const {Nama, Alamat, NoHp} = body;

    const updateData = {
      Nama,
      Alamat,
      NoHp
    }

    await prisma.student.update({
      where: {id: parseId},
      data: updateData
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Successfully update student data"
    });
  } catch(error) {
    console.error("Error : ", error);
    return NextResponse.json({
      statusCode: 404,
      message: "Failed to update the data!"
    });
  }
}

export async function DELETE(req, res) {
  try {
    const parsedId = parseInt(req.params.id);
    await prisma.student.delete({
      where: {id: parsedId}
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Success delete the data!"
    });
  } catch(error) {
    console.error("Error : ", error);
    return NextResponse.json({
      statusCode: 401,
      message: "Failed to delete the data!"
    });
  }
}