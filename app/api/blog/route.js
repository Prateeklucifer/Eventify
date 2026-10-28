import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { id } = await req.json();

  try {
    const db = ConnectToDB();

    let [allEntries] = await db.query("SELECT * FROM blogs WHERE id = ?", [id]);

    if (allEntries.length > 0) {
      return NextResponse.json({ data: allEntries });
    } else {
      return NextResponse.json({ message: "blog not found" }, { status: 404 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
