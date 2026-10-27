import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";
import validator from "validator";

export async function POST(req, res) {
  const { firstName, lastName, email, phone, message } = await req.json();

  try {
    const db = ConnectToDB();

    if (validator.isEmail(email) && phone.length == 10) {
      await db.query("INSERT INTO contact SET ?", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        actionTaken: false,
      });

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ message: "invailed format" }, { status: 403 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { messege: "something went wrong" },
      { status: 500 }
    );
  }
}
