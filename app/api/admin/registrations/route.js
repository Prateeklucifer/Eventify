import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import ConnectToDB from "@/DB/ConnectToDB";

export async function GET(req, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    // checks if token is vailed or not
    try {
      let isVailed = jsonwebtoken.verify(token.value, process.env.JWT_SECRET);

      if (isVailed) {
        try {
          const db = ConnectToDB();

          let [data] = await db.query(`
            SELECT r.id, r.eventId, r.name, r.email, r.phone, r.seats, r.createdAt, e.title AS eventTitle
            FROM registrations r
            JOIN events e ON e.id = r.eventId
            ORDER BY r.createdAt DESC
          `);
          return NextResponse.json({ data });
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          );
        }
      }
    } catch (error) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 302 });
    }
  } else {
    return NextResponse.json({ message: "Not Authorized" }, { status: 302 });
  }
}

export async function DELETE(req, res) {
  const { id } = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    // checks if token is vailed or not
    try {
      let isVailed = jsonwebtoken.verify(token.value, process.env.JWT_SECRET);

      if (isVailed) {
        try {
          const db = ConnectToDB();
          await db.query("DELETE FROM registrations WHERE id = ?", [id]);
          return NextResponse.json(
            { message: "Item removed sucessfully" },
            { status: 200 }
          );
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          );
        }
      }
    } catch (error) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 302 });
    }
  } else {
    return NextResponse.json({ message: "Not Authorized" }, { status: 302 });
  }
}
