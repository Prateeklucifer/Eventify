import ConnectToDB from "@/DB/ConnectToDB";
import About from "@/schema/About";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    ConnectToDB();
    let allEntries = await About.find({});

    // if all entries 0 then create 3 of them

    if (allEntries.length == 0) {
      await About.create({
        mainTitle: "Your Trusted Partner for Event Magic",
        para1:
          "We are a passionate team of event planners dedicated to exceeding your expectations and crafting experiences that leave a lasting impression. From intimate gatherings to large-scale productions, we handle every detail with meticulous care and unwavering commitment.",
        para2:
          "Our passion lies in transforming your vision into a seamless and captivating event.",
        secondaryTitle:
          "Our team of passionate event specialists works tirelessly to achieve this.",
        para3:
          "We combine meticulous planning, creative vision, and unwavering attention to detail to ensure every element of your event exceeds expectations",
        para4:
          "Whether it's an intimate gathering or a large-scale celebration, we are dedicated to making your event truly exceptional.",
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
