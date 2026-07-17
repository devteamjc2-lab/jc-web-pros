import { NextResponse } from "next/server";
import { createRecord, deleteRecord, readRecords, testConnection, updateRecord } from "../../../lib/db";

export async function GET() {
  try {
    await testConnection();
    const records = await readRecords();

    return NextResponse.json({
      ok: true,
      message: "Database connected successfully.",
      records,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Database connection failed.",
        records: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.name || typeof payload.name !== "string") {
      return NextResponse.json(
        { ok: false, message: "Name is required." },
        { status: 400 }
      );
    }

    const record = await createRecord({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    });

    return NextResponse.json({ ok: true, message: "Record created.", record });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unable to save record." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.id) {
      return NextResponse.json({ ok: false, message: "Record id is required." }, { status: 400 });
    }

    const updated = await updateRecord(Number(payload.id), {
      name: payload.name,
      email: payload.email,
      message: payload.message,
    });

    return NextResponse.json({ ok: true, message: "Record updated.", record: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unable to update record." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, message: "Record id is required." }, { status: 400 });
    }

    await deleteRecord(Number(id));

    return NextResponse.json({ ok: true, message: "Record deleted." });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unable to delete record." },
      { status: 500 }
    );
  }
}
