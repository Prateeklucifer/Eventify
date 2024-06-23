import ConnectToDB from "@/DB/ConnectToDB";
import Contact from "@/schema/Contact";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { firstName, lastName, email, phone, message } = await req.json();

  try {
    ConnectToDB();

    await Contact.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      message: message,
      actionTaken: false
    });

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { messege: "something went wrong" },
      { status: 500 }
    );
  }
}
