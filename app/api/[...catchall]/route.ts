import { NextResponse } from "next/server";
import { fail } from "../../../packages/api/responses";

export function GET() {
  return NextResponse.json(fail("API route not found"), { status: 404 });
}

export function POST() {
  return NextResponse.json(fail("API route not found"), { status: 404 });
}
