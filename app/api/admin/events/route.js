import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import ConnectToDB from "@/DB/ConnectToDB";

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
          // registrations of this event will also get deleted (ON DELETE CASCADE)
          await db.query("DELETE FROM events WHERE id = ?", [id]);
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

export async function POST(req, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    // checks if token is vailed or not
    try {
      let isVailed = jsonwebtoken.verify(token.value, process.env.JWT_SECRET);

      if (isVailed) {
        try {
          const db = ConnectToDB();
          await db.query("INSERT INTO events SET ?", {
            title: "Enter event name",
            description: "description",
            venue: "venue",
            eventDate: new Date().toISOString().split("T")[0],
            eventTime: "10:00 AM",
            imageUrl: "s_featured1.png",
            totalSeats: 50,
          });
          return NextResponse.json(
            { message: "Item Added sucessfully" },
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

export async function PUT(req, res) {
  const { AllRecords } = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    // checks if token is vailed or not
    try {
      let isVailed = jsonwebtoken.verify(token.value, process.env.JWT_SECRET);

      if (isVailed) {
        try {
          const db = ConnectToDB();

          for (const item of AllRecords) {
            await db.query("UPDATE events SET ? WHERE id = ?", [{
              title: item.title,
              description: item.description,
              venue: item.venue,
              eventDate: item.eventDate,
              eventTime: item.eventTime,
              imageUrl: item.imageUrl,
              totalSeats: item.totalSeats,
            }, item.id]);
          }

          return NextResponse.json({ message: "Update Sucessfull" });
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
