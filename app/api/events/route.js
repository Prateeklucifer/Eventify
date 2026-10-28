import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = ConnectToDB();

    // bookedSeats is total seats booked by all registrations of that event
    let [allEntries] = await db.query(`
      SELECT e.id, e.title, e.description, e.venue, DATE_FORMAT(e.eventDate, '%Y-%m-%d') AS eventDate,
        e.eventTime, e.imageUrl, e.totalSeats, CAST(COALESCE(SUM(r.seats), 0) AS UNSIGNED) AS bookedSeats
      FROM events e
      LEFT JOIN registrations r ON r.eventId = e.id
      GROUP BY e.id
      ORDER BY e.eventDate
    `);

    return NextResponse.json({ data: allEntries });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
