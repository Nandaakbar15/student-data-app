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