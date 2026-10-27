import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = ConnectToDB();
    let [allEntries] = await db.query("SELECT * FROM team");

    if (allEntries.length == 0) {
      await db.query("INSERT INTO team (name, imageURL) VALUES ?", [
        [
          ["Harpreet Singh", "images/m1.png"],
          ["Shubham Kumar", "images/m2.png"],
          ["Kunal Mehta", "images/m3.png"],
          ["Rajeev Sharma", "images/m4.png"],
          ["Sunil Yadav", "images/m5.png"],
        ],
      ]);

      let [allData] = await db.query("SELECT * FROM team");

      return NextResponse.json({ data: allData });
    } else {
      return NextResponse.json({ data: allEntries });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
