import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const db = ConnectToDB()

        let [allEntries] = await db.query("SELECT * FROM blogs")
        return NextResponse.json({ data: allEntries })

     } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "something went wrong" })
    }

}
