import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  return await getAllStudents();
}

export async function POST(req) {
  return await addStudent(req);
}

async function getAllStudents() {
  try {
    const students = await prisma.student.findMany();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({
      statusCode: 400,
      message: 'Failed to fetch the data!',
    });
  }
}

async function addStudent(req) {
  try {
    const body = await req.json();
    const { Nama, Alamat, NoHp } = body;

    const newStudent = await prisma.student.create({
      data: { Nama, Alamat, NoHp },
    });

    return NextResponse.json(
      {
        message: 'Successfully added new student!',
        student: newStudent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { message: 'Failed to add new data' },
      { status: 400 }
    );
  }
}
