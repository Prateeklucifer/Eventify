import ConnectToDB from "@/DB/ConnectToDB";
import Services from "@/schema/Services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    ConnectToDB();
    let allEntries = await Services.find({});

    // if all entries 0 then create 3 of them

    if (allEntries.length == 0) {
      await Services.create({
        mainTitle: "mainTitle",
        para1: "para1",
        para2: "para2",
        secondaryTitle: "secondaryTitle",
        para3: "para3",
        para4: "para4",
        thirdTitle: "thirdTitle",
        para5: "para5",
        para6: "para6",
        fourthTitle: "fourthTitle",
        para7: "para7",
        para8: "para8",
      });

      let allData = await FAQs.find({});

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
