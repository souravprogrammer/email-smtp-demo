
import { EmailValidator } from "email-smtp-validator";
import { NextRequest, NextResponse } from "next/server";
const config = { validateRegex: true, validateMx: true, validateDisposable: true, validateSMTP: true, timeout: 9000 };
export async function POST(req: NextRequest) {
    console.log()
    const body = await req.formData();
    const email = body.get("email");
    if (!email) return NextResponse.json({ message: "field is missing email" })
    const validator = new EmailValidator(config)
    const res = await validator.verify(email as string)
    return NextResponse.json(res);
}