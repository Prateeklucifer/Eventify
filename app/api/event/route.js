import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { id } = await req.json();

  try {
    const db = ConnectToDB();

    let [allEntries] = await db.query(
      `
      SELECT e.id, e.title, e.description, e.venue, DATE_FORMAT(e.eventDate, '%Y-%m-%d') AS eventDate,
        e.eventTime, e.imageUrl, e.totalSeats, CAST(COALESCE(SUM(r.seats), 0) AS UNSIGNED) AS bookedSeats
      FROM events e
      LEFT JOIN registrations r ON r.eventId = e.id
      WHERE e.id = ?
      GROUP BY e.id
    `,
      [id]
    );

    if (allEntries.length > 0) {
      return NextResponse.json({ data: allEntries });
    } else {
      return NextResponse.json({ message: "event not found" }, { status: 404 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
