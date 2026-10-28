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

          let [[counts]] = await db.query(`
            SELECT
              (SELECT COUNT(*) FROM events WHERE eventDate >= CURDATE()) AS upcomingEvents,
              (SELECT COUNT(*) FROM events) AS totalEvents,
              (SELECT COUNT(*) FROM registrations) AS totalRegistrations,
              (SELECT COUNT(*) FROM contact WHERE actionTaken = false) AS pendingEnquiries,
              (SELECT COUNT(*) FROM blogs) AS totalBlogs,
              (SELECT COUNT(*) FROM team) AS teamMembers
          `);

          let [recent] = await db.query(`
            SELECT r.id, r.name, r.seats, r.createdAt, e.title AS eventTitle
            FROM registrations r
            JOIN events e ON e.id = r.eventId
            ORDER BY r.createdAt DESC
            LIMIT 5
          `);

          return NextResponse.json({ data: counts, recent });
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
