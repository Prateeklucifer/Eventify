import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";
import validator from "validator";

export async function POST(req, res) {
  let { eventId, name, email, phone, seats } = await req.json();
  seats = Number(seats);

  try {
    const db = ConnectToDB();

    if (!name || !validator.isEmail(email) || phone.length != 10 || seats < 1) {
      return NextResponse.json({ message: "invailed format" }, { status: 403 });
    }

    // checking if enough seats are left or not
    let [rows] = await db.query(
      `SELECT e.totalSeats, CAST(COALESCE(SUM(r.seats), 0) AS UNSIGNED) AS bookedSeats
      FROM events e
      LEFT JOIN registrations r ON r.eventId = e.id
      WHERE e.id = ?
      GROUP BY e.id`,
      [eventId]
    );

    if (rows.length == 0) {
      return NextResponse.json({ message: "event not found" }, { status: 404 });
    }

    let seatsLeft = rows[0].totalSeats - rows[0].bookedSeats;

    if (seats > seatsLeft) {
      return NextResponse.json(
        { message: `only ${seatsLeft} seats are left` },
        { status: 400 }
      );
    }

    await db.query("INSERT INTO registrations SET ?", {
      eventId: eventId,
      name: name,
      email: email,
      phone: phone,
      seats: seats,
    });

    return NextResponse.json({ message: "registered sucessfully" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
